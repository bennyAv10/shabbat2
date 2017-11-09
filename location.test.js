const t = require('./location');

jest.mock('request');
var requestMock = require('request');
requestMock.mockImplementation((options, callback) => callback('', '', '{"city": "tel aviv"}'));


const URL_PATTERN = 'https://api.amazonalexa.com/v1/devices/???/settings/address';


test('Options object look as expected and callback called with expected city', () => {
    var urlStr = URL_PATTERN.replace('???', 'DEVICE_ID');
    var expectedOptions = {
        url: urlStr,
        headers: {
            Authorization: 'Bearer ' + 'CONSENT'
        }
        
    };

    var city = '';
    t.getUserLocation('DEVICE_ID', 'CONSENT', (res) => {
        city = res;
    });

    expect(requestMock.mock.calls.length).toBe(1);
    expect(requestMock.mock.calls[0][0]).toEqual(expectedOptions);
    
    expect(city).toEqual('tel aviv');
});


// Test when returns with location object, call teh callback with the city
