/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("Review", (table) => {
    table.increments("id").primary();
    table.integer("roomId").unsigned();
    table.foreign("roomId").references("Room.id").onDelete("CASCADE");
    table.text("review");
    table.integer("rating");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Review");
};
