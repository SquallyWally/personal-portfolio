import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  const params = {
    TableName: "visitorCount",
    Key: {
      count: "totalVisitors",
    },
    UpdateExpression: "SET visitors = if_not_exists(visitors, :initial) + :inc",
    ExpressionAttributeValues: {
      ":initial": 0,
      ":inc": 1,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await dynamoDb.update(params).promise();

    const headers = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "https://www.milokastablank.com",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(`Unable to update Item ${error}`);
    return {
      statusCode: 403,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "https://www.milokastablank.com",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      },
      body: `Unable to update Item ${error}`,
    };
  }
};
