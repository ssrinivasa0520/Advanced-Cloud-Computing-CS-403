const knex = require('./cknex');

knex.migrate.latest()
    .then(function () {
        return knex.seed.run();
    })
    .then(function () {
        console.log('Migrations and seeding complete');
    });