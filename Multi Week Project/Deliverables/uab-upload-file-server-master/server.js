if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
const session = require('express-session');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cors = require('cors');

const knex = require('./cknex');


const { jsonStrategy, jwtStrategy } = require('./passport/strategies');

const { uploadFile, generatePresignedLink } = require('./utils/aws');


const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
    credentials: true,
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization", "Content-Length", "Accept", "X-Requested-With"],
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}

app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: 'none', //add
        secure: true,  //add
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // 1 hour
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(jsonStrategy);
passport.use(jwtStrategy);


passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (_id, done) {
    done(null, true);
});

app.post('/login', passport.authenticate('json', { session: false }), function (req, res) {
    req.login(req.user, { session: false }, (err) => {
        if (err) {
            res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(req.user, process.env.JWT_SECRET);
        return res.json({ user: req.user, token });
    });
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user, req.isAuthenticated());
    return res.send("Hello");
});

app.post('/upload', passport.authenticate('jwt', { session: false }), upload.single('file'), (req, res) => {
    const file = req.file;
    const emails = JSON.parse(req.body.emails);

    //console.log(file, emails);

    const { originalname, path } = file;

    const metadata = { emails: req.body.emails };

    uploadFile(path, originalname, metadata, async (err, data) => {
        if (err) {
            res.status(500).send('S3 File upload failed');
        }

        try {
            const [attachmentId] = await knex
                .insert({ userid: req.user.id, filename: originalname, link: data.Location }, ['id'])
                .into('attachment');

            if (emails.length) {
                await knex.insert(emails.map(email => ({ attachmentid: attachmentId, email }))).into('email');
            }


            res.send(data.Location);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

});

app.get('/attachments', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const userId = req.user.id;

        const attachments = await knex('attachment').where({ userid: userId }).orderBy('createdat', 'desc');

        res.json(attachments);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/presign/:attachmentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const attachmentId = req.params.attachmentId;

        const { filename } = await knex.first('filename').from('attachment').where({ id: attachmentId });

        const presignedLink = generatePresignedLink(filename);

        res.send(presignedLink);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/logout', function (req, res) {
    req.logout(() => {
        res.sendStatus(200);
    });

});

app.get('/test', function (_req, res) {
    res.sendStatus(200);
});

const port = process.env.PORT || 3001;
app.listen(port, async () => {
    console.log(`This app is listening on port ${port}`);
});