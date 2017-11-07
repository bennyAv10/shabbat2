const urlGetter = require('./utils/UrlGetter');

const futureDate = new Date(new Date().getFullYear()+5,0,0,0,0,0,0);

function getParasha(cb, city='') {
    getCalLuach('parashat', cb, city);
}

function encodeQueryParams(baseUrl, params) {
    var paramsStr = Object.keys(params).map(function(key) {
        return [key, params[key]].map(encodeURIComponent).join('=');
    });

    return [baseUrl, paramsStr.join('&')].join("&");
}

/**
 * 
 * @param {string} title What category in the response we are after
 * @param {Function} emitHandler emit fucntion to return to Alexa
 * @param {string} city What is our city of interest
 */
function getCalLuach(title, emitHandler, city) {
    return getCalLuachEx(title, emitHandler, city, new Date().getMonth()+1);
}

function getCalLuachEx(title, emitHandler, city, month) {
    var params = {
        'city': 'CA-Vancouver',
        'month': month
    };

    var baseUrlStr='http://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&nx=on&year=now&ss=on&mf=on&c=on&geo=city&m=50&s=on';
    if (city) {
        params.city = city;
    }
    var urlStr = encodeQueryParams(baseUrlStr, params);

    console.log("Calling URL: ", urlStr);

    urlGetter.getFromUrl(urlStr, 
        (body) => calLuachResponseCallback(body, title, emitHandler, month, city));
}

/**
 * Get the body from the response togethre with the title, month and city
 * Find the right answer to emit by:
 * First, filter the response by city and title
 * from the filtered results choose the first one which is after today
 * If there's no results after the above logic, it means
 * we're in the end of teh month and we should try with the next one
 * @param {Object} body response body
 * @param {string} title category of items we're into
 * @param {Function} emitHandler emit skill reponse to Alexa
 * @param {number} month - month of the year we're trying to get
 * @param {string} city - city
 */
function calLuachResponseCallback(body, title, emitHandler, month, city) {
    
    var items = body.items;
    var selectedTitle="";
    var selectedDate=futureDate;
    var today=new Date();

    if (items) {
        for (var item of items) {
            
            if (item.category == title) {
                console.log("p:", item.title, "d:", item.date);
                var parasha=item.title;
                var parashaDate=new Date(item.date);
                console.log("pDate: ", parashaDate);
            if (parashaDate>today && parashaDate<selectedDate) {
                selectedTitle=parasha;
                selectedDate=parashaDate;    
            }
                console.log(parashaDate);                
            }
        }
    }

    console.log("month type: ", typeof month, "Category:", title, "Selected:", selectedTitle, "SelectedDate:", selectedDate);
    
    if (!selectedTitle) {
        if (new Date().getMonth()+1<month) {
            console.log("Couldn't find return value");            
        } else{ 
            getCalLuachEx(title, emitHandler, city, month+1);
        }
        return;
    }

    var location = body.location.title;
    var response = "In " + location + ". " + selectedTitle;

    emitHandler(':tell', response);
}

function getShabbatTime(emitCb, city='') {
    getCalLuach('candles', emitCb, city);
}

function testerCb(cmd, title) {
    console.log("TesterCB called with: cmd=", cmd, ", title=", title);
}

function tester() {
    console.log("hi", process.argv, process.argv[2]);
    eval(process.argv[2]+"(testerCb)");
}

module.exports = {
    getParasha: getParasha,
    getShabbatTime: getShabbatTime,
    tester: tester,
    calLuachResponseCallback: calLuachResponseCallback // only here to enable unit test
};

if (require.main == module) {
    tester();
}