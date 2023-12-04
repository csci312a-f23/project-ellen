/* eslint-disable func-names */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Reviews", (table) => {
    table.increments("id").primary();
    table.string("userId");
    table.string("roomId");
    table.text("dormReview");
    table.text("dormRating");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Reviews");
};
