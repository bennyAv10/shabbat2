var request = require('request');

const URL_PATTERN = 'https://api.amazonalexa.com/v1/devices/???/settings/address';
/**
 * Get the location of the user asynchronously and returns
 * the city from the response
 * 
 * @param {string} deviceId  As received on the call from Alexa
 * @param {string} consentToke As received on the call from Alexa
 * @param {Function} callback The function to call with the response 
 * 
 */
function getUserLocation(deviceId, consentToken, callBack) {
    var urlStr = URL_PATTERN.replace('???', deviceId);

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
            console.log("Response: ", response, " Body: ", body);
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