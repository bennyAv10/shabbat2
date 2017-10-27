const service = require ('./index.js');
const GetParashaIntentName = 'GetParashaIntent';
const GetShabbatTimeIntentName = 'GetShabbatTimeIntent'
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
            "value": "Toronto"
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

if (!module.parent) {
  var testMethods = [testGetParasha, testGetShabbatTime];
  var summary ={};
  for (test in testMethods) {
    testMethods[test]();
  }
  console.log("hi");
  //testGetShabbatTime();
}