jest.mock('request');
const reqMock = require('request');

reqMock.mockImplementation((url, b, handler) => handler(null, null, URL_BODY));

const urlGetter = require('./UrlGetter.js');
const cacher = require('./LocalCacher.js');

const URL_STR = "https://google.com";
const URL_BODY = "htttp-response_body";

test('First time not in cache then it is in cache', () => {
    var res = '';
    
    urlGetter.getFromUrl(URL_STR, (body) => {
        res=body;
    });
    
    expect(reqMock.mock.calls.length).toBe(1);
    expect(res).toBe(URL_BODY);

    urlGetter.getFromUrl(URL_STR, (body) => {
        res=body;
    });
    expect(reqMock.mock.calls.length).toBe(1);

});