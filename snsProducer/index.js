/*jshint esversion: 6 */
/*jslint node: true */

require('./lib/arrayIncludes.js');
const awsConstants = require('../awsConstants.js');

const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

const SNS = new AWS.SNS();

/* APIGateway -> Lambda -> SNS */
function handler( event, context ) {
  const eventBody = event.body ? JSON.parse(event.body) : {};
  if(!Object.keys(eventBody).includes('message')) {
    context.fail(new Error('lacked message key'));
  }

  const messageBody = JSON.stringify(eventBody.message);
  var snsParams = {
    Message: messageBody,
    Subject: "Test SNS From Lambda",
    TopicArn: awsConstants.SNS_TOPIC
  };

  SNS.publish(snsParams, function(err, data) {
    if(err) {
      console.error('error publishing to SNS');
      context.fail(err);
    } else {
      console.info('message published to SNS');
      const response = {
        "statusCode": 200,
        "headers": {},
        "body": JSON.stringify({ messageSent: true })
      };
      context.succeed(response, data);
    }
  });
}
module.exports = { handler };
