const config = {
    client: 'mysql2',
    version: '8.0',
    connection: {
        host: process.env.AWS_RDS_ENDPOINT,
        port: 3306,
        user: process.env.AWS_RDS_USER,
        password: process.env.AWS_RDS_PASSWORD,
        database: 'file_upload',
        timezone: '+00:00'
    }, migrations: {
        tableName: 'knex_migrations'
    }, useNullAsDefault: true
};

module.exports = {
    development: config,
    test: config,
    production: config

}