/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const fs = require("fs");

// eslint-disable-next-line func-names
exports.seed = async function (knex) {
  const contents = fs.readFileSync("./data/RoomImport.json");
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  return knex("Room")
    .del()
    .then(() => knex.batchInsert("Room", data, 100));
};
