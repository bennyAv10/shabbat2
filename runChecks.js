const service = require ('./index.js');
const GetParashaIntentName = 'GetParashaIntent';
const GetShabbatTimeIntentName = 'GetShabbatTimeIntent'
const CITY_NAME = 'Seattle';
var event = {
    "session": {
      "new": false,
      "sessionId": "SessionId.a4a5b794-78a7-45fe-b2e4-6e6113e1aa67",
      "application": {
        "applicationId": "amzn1.ask.skill.dbd1a0a4-b958-4a67-891f-5a8d5eccd1e3"
      },
      "attributes": {},
      "user": {
        "userId": "amzn1.ask.account.AELRHZITZHNJE5ZPDIK5IU3DAMHBOPNS22KAMFZOFF7IJCUDQSAV4KT374SCYJS3B35UTJ4YROUTB4FCHAJHO6DC6OEUPPBYNZRFAWVLFQJI7IT7ERFRUU7TIEJ7VM3BAZVVW2UMWIBDPB3HRL4YTAZVQMTJWFTOT2FOCGDZXJHGS7Y4JKOLTKLIJ27ANKMMU2SODGPDEYU5LMI"
      }
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "EdwRequestId.23b405a7-b9fc-40f7-9941-7e4427b8ac6d",
      "intent": {
        "name": "GetShabbatTimeIntent",
        "slots": {
          "city": {
            "name": "city",
            "value": CITY_NAME
          }
        }
      },
      "locale": "en-US",
      "timestamp": "2017-10-23T17:33:16Z"
    },
    "context": {
      "AudioPlayer": {
        "playerActivity": "IDLE"
      },
      "System": {
        "application": {
          "applicationId": "amzn1.ask.skill.dbd1a0a4-b958-4a67-891f-5a8d5eccd1e3"
        },
        "user": {
          "userId": "amzn1.ask.account.AELRHZITZHNJE5ZPDIK5IU3DAMHBOPNS22KAMFZOFF7IJCUDQSAV4KT374SCYJS3B35UTJ4YROUTB4FCHAJHO6DC6OEUPPBYNZRFAWVLFQJI7IT7ERFRUU7TIEJ7VM3BAZVVW2UMWIBDPB3HRL4YTAZVQMTJWFTOT2FOCGDZXJHGS7Y4JKOLTKLIJ27ANKMMU2SODGPDEYU5LMI"
        },
        "device": {
          "supportedInterfaces": {}
        }
      }
    },
    "version": "1.0"
  };

   // Workaround I don't know how to assign function directly to a json element
   var succeedFunc=succeed;
   function succeed(res) {
     console.log("succeed function: ", res);
     console.log(summary);
     console.log(test);
   }

   var gailFunc = fail;
   function fail(res) {
     console.log("Fail: ", res);
   }
 
  var context = { 'callbackWaitsForEmptyEventLoop': ['Getter/Setter'],
    'done': ['Function: done'],
    'succeed': succeedFunc,
    'fail': fail,
    'logGroupName': '/aws/lambda/awscodestar-shabbat2-lambda-AlexaSkillFunction-1JW73OYCGD8ZY',
    'logStreamName': '2017/10/26/[$LATEST]75f8ea269e7845c9a4d2531f7a85e762',
    'functionName': 'awscodestar-shabbat2-lambda-AlexaSkillFunction-1JW73OYCGD8ZY',
    'memoryLimitInMB': '128',
    'functionVersion': '$LATEST',
    'getRemainingTimeInMillis': ['Function: getRemainingTimeInMillis'],
    'invokeid': '8468b2d6-ba85-11e7-b6eb-e54ed5897536',
    'awsRequestId': '8468b2d6-ba85-11e7-b6eb-e54ed5897536',
    'invokedFunctionArn': 'arn:aws:lambda:us-east-1:889750780820:function:awscodestar-shabbat2-lambda-AlexaSkillFunction-1JW73OYCGD8ZY' 
  };

 
  function testGetParasha() {
    console.log("===========================================Starting=====================================");
    console.log(context);
      event.request.intent.name = GetParashaIntentName;
      var response = service.handler(event, context);

      //console.log("Response: ", util.inspect(event, false, null));
  }

  function testGetShabbatTime() {
    console.log("===============================Starting======================");
    event.request.intent.name = GetShabbatTimeIntentName;
    var response = service.handler(event, context);
  }

  exports.testGetParasha = testGetParasha;
  exports.testGetShabbatTime = testGetShabbatTime;
/**
 * even though these tests suppose to be end2end tests,
 * sometimes it's nos possible to call something out of the lambda
 * Alexa context. For example, to get the device location, you need the device id and 
 * the consent token.
 * 
 */
function setupMocks() {

  // Setup request mock for device location service
  const location=require('./location');
  const request = require('request');
  var x = (uri, options, callback) => {
      
    /* we call requests in two methods 
     * 1. (uri, callback)
     * 2. (options, callback)
     * the mock case is in case 2 where we sapply the token as http header
    */
    console.log("request mock has been called. uri: ", uri, " options: ", options, " callback: ", callback);

    if (typeof uri == 'object' && uri.headers.Authorization) {
      console.log('this is a device location call. using mock');
      options('', 200, {city: 'Tel Aviv'});
    } else {
      console.log('this isnt a device location call. using the real function');
      request(uri, options, callback);
    }
  };

  location.setupMockRequest(x);
}

if (!module.parent) {

  setupMocks();

  var testMethods = [testGetParasha, testGetShabbatTime];
  var summary ={};
  var operationStarted = false;

  // The 3rd argument is the test case
  if (process.argv.length > 2) {
    var testName = process.argv[2];
    if (!testMethods.some(function(val){
      return val.name == testName;
    })) {
      console.log("3rd argument should be one of: ", testMethods);
      process.exit(-1);
    } else {
      testMethods = [eval(testName)];
    }
  }

  if (process.argv.length > 3) {
    event.request.intent.slots.city.value = process.argv[3];
  }

  for (test in testMethods) {
    operationStarted = true;
    testMethods[test]();
  }
  console.log("hi", process.argv.length);
  //testGetShabbatTime();
}