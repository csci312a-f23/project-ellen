/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable("TestRooms", (table) => {
    table.increments("id").primary();
    table.string("dorm");
    table.string("type");
    table.integer("beds");
    table.integer("dimensions");
    table.text("reviews");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("TestRooms");
};
