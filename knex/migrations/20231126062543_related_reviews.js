/* eslint-disable func-names */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("RelatedReview", (table) => {
    table
      .integer("roomId")
      .references("id")
      .inTable("TestRoom")
      .onDelete("CASCADE");
    table
      .integer("userId")
      .references("id")
      .inTable("Reviews")
      .onDelete("CASCADE");
    table.primary(["roomId", "userId"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("RelatedReview");
};
