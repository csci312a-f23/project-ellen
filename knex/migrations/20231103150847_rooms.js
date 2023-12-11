/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable("Room", (table) => {
    table.increments("id").primary();
    table.string("dorm");
    table.string("type");
    table.integer("beds");
    table.integer("dormDimensions");
    table.text("dormReview");
    table.integer("dormRating");
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
