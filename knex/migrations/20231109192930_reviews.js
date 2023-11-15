/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line func-names
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
// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Review");
};
