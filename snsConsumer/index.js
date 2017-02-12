/*jshint esversion: 6 */
/*jslint node: true */
"use strict";

const mysql = require('promise-mysql');

let connection;
const connectionConfig = {
  host: process.env.RDS_HOST,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: 'lambda',
  port: '3306'
};

const insertQuery = 'INSERT INTO messages SET ?';

/* SNS -> Lambda -> RDS */
function handler( event, context ) {
  const message = event.Records[0].Sns.Message;
  const body = { body: message };

  mysql.createConnection(connectionConfig).then(function(conn) {
    connection = conn;
    return connection.query(insertQuery, body);
  }).then(function(result) {
    connection.end();
    console.log(result);

    return context.succeed(
      {
        messageReceived: true
      }
    );
  }).catch(function(err) {
    context.fail(err);
  });
}
module.exports = { handler };
