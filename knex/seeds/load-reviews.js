/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const fs = require("fs");

const contents = fs.readFileSync("./data/BattelRoomInfo.json");
const data = JSON.parse(contents);

// eslint-disable-next-line func-names
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("Review")
    .del()
    .then(() => knex.batchInsert("Review", data, 100));
};
