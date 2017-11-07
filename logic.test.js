jest.mock('./utils/UrlGetter');
const urlGetterMock = require('./utils/UrlGetter');

urlGetterMock.getFromUrl.mockImplementation((url, handler) => {
    console.log("getFromUrlMock called");
    handler('sample response');
});


const logic = require('./logic');

//no items in response - expect another call
test('empty reponse', () => {
    logic.calLuachResponseCallback('', 'city', () => {}, new Date().getMonth()+1, 'vacouver');
    expect(urlGetterMock.getFromUrl.mock.calls.length).toBe(1);
});

//items in response don't match category - expect another call

// items in response match category matches but none after today - expect another call


// items in response match category, emit is called with the first after today