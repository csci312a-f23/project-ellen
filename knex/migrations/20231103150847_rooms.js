/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable("Room", (table) => {
    table.string("id").primary();
    table.string("dormDimensions");
    table.text("dormReview");
    table.string("dormRating");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Room");
};
