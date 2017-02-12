/*jshint esversion: 6 */
/*jslint node: true */
/*global describe, it*/

const expect = require('chai').expect;
const validJSONFixture = require('./lambda-mocks/event.json');
const endpoint1 = require('./index.js');

describe( 'consumes SNS message', function() {
  it('on success, returns body', function(done) {
    const context = {
      succeed: function( result ) {
        const parsedResult = JSON.parse(result.messageReceived);
        expect(parsedResult).to.eql(true);
        done();
      },
      fail: function( result ) {
        done(new Error(result));
      }
    };

    endpoint1.handler(validJSONFixture, context);
  });
});
