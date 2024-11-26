const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "NoiseDataByOpenAPI";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const monitors = [
  "10.1.1.1",
  "01749",
  "01508",
  "10118",
  "01548",
  "10115",
  "10.1.1.7",
  "01870",
  "01575",
  "01737",
  "10.1.1.11",
  "10.1.1.12",
  "01550",
  "01534",
  "01535",
  "01509",
  "01529",
  "01530",
  "01528",
];

const getLatestData = async (monitor) => {
  const start = Math.floor(Date.now() / 1000) - 60 * 20;
  const end = Math.floor(Date.now() / 1000);
  try {
    const res = await fetch(
      `https://data.smartdublin.ie/sonitus-api/api/data?username=dublincityapi&password=Xpa5vAQ9ki&monitor=${monitor}&start=${start}&end=${end}`,
      {
        method: "POST",
      }
    );
    const json = await res.json();
    console.log("getLatestData", JSON.stringify(json))
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const insert = async (item) => {
  let putItemParams = {
    TableName: tableName,
    Item: item,
    ConditionExpression:
      "attribute_not_exists(monitor) AND attribute_not_exists(#datetime)",
    ExpressionAttributeNames: {
      "#datetime": "datetime",
    },
  };
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    console.log({ success: "insert succeed!", data: data, item: JSON.stringify(item) });
  } catch (err) {
    console.log({ error: err });
  }
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context) => {
  console.log("Call handler");
  console.log(`monitors: ${monitors}`);
  for (const monitor of monitors) {
    const insertLatestData = async (monitor) => {
      try {
        const res = await getLatestData(monitor);
        console.log(`res: ${res}`);
        res.forEach(async (item) => {
          const itemWithMonitor = {
            monitor,
            ...item,
          };
          const insertRes = await insert(itemWithMonitor);
          console.log(`insertRes: ${insertRes}`);
        });
      } catch (error) {
        throw new Error(error);
      }
    };
    insertLatestData(monitor);
  }
  // monitors.forEach(async (monitor) => {
  //   try {
  //     const res = await getLatestData(monitor);
  //     console.log(`res: ${res}`);
  //     res.forEach(async (item) => {
  //       const itemWithMonitor = {
  //         monitor,
  //         ...item,
  //       };
  //       const insertRes = await insert(itemWithMonitor);
  //       console.log(`insertRes: ${insertRes}`);
  //     });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // });
};
