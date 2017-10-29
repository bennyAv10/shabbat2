const request = require('request');

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

    request(urlStr, { json : true}, 
        (err, res, body) => calLuachResponseCallback(err, res, body, title, emitHandler, month, city));
}

function calLuachResponseCallback(err, res, body, title, emitHandler, month, city) {
    if (err) {return console.log(err); }
    //console.log(body);
    //console.log(body.url);
    //console.log(body.explanasion);
    var items = body.items;
    var selectedTitle="";
    var selectedDate=futureDate;
    var today=new Date();

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

    console.log("Category:", title, "Selected:", selectedTitle, "SelectedDate:", selectedDate);
    
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
    tester: tester
};

if (require.main == module) {
    tester();
}