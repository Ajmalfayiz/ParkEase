const serverless = require("serverless-http");

const connectDB = require("../../Parkease-Backend/config/dbConnection");
const app = require("../../Parkease-Backend/app");

const serverlessHandler = serverless(app);

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectDB();
  return serverlessHandler(event, context);
};
