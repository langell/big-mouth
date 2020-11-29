"use strict";

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient;

let defaultResultCount = process.env.DEFAULT_RESULT_COUNT || 8;
const tableName = process.env.RESTAURANTS_TABLE || 'restaurants';

async function getRestaurants(count) {
  let req = {
    TableName: tableName,
    Limit: count
  };

  let resp = await dynamodb.scan(req).promise();
  return resp.Items;
}

module.exports.handler = async (event) => {
  let restaurants = await getRestaurants(defaultResultCount);

  return {
    statusCode: 200,
    body: JSON.stringify(
     restaurants,
      null,
      2
    ),
  };
};
