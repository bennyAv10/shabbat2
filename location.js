var request = require('request');

const URL_PATTERN = 'https://api.amazonalexa.com/v1/devices/???/settings/address';
/**
 * Get the location of the user asynchronously and returns
 * the city from the response
 * 
 * @param {string} deviceId  As received on the call from Alexa
 * @param {string} consentToke As received on the call from Alexa
 * @param {Function} callback The function to call with the response 
 */
function getUserLocation(deviceId, consentToken, callBack) {
    var urlStr = URL_PATTERN.replace('???', deviceId);

    console.log("getUserLocation: url: ", urlStr, " token: ", consentToken);
    var options = {
        url: urlStr,
        headers: {
            Authorization: 'Bearer ' + consentToken
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.log("An error occurred: ", error);
        } else {
            console.log("Body: ", body, " city type: ", typeof body.city, " city: ", body.city);
            var city = body.city.charAt(0)+body.city.substring(1).toLowerCase();
            callBack(body.city);
        }
    });

}

function setupMockRequest(request_mock) {
    request = request_mock;
}

module.exports = {
    getUserLocation: getUserLocation,
    setupMockRequest: setupMockRequest
};