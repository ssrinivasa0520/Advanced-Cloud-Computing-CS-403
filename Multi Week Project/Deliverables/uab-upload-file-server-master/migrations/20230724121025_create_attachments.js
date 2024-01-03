/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('attachment', table => {
        table.increments('id').primary()
        table.integer('userid').notNullable().unsigned()
        table.string('filename').notNullable()
        table.string('link').notNullable()
        table.timestamp('createdat').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('attachment')
};
