const request = require('request');

const futureDate = new Date(new Date().getFullYear()+5,0,0,0,0,0,0);

function getParasha(cb) {
    request('http://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=now&ss=on&mf=on&c=on&geo=city&city=CA-Vancouver&m=50&s=on', { json : true}, (err, res, body) => {
        if (err) {return console.log(err); }
        //console.log(body);
        //console.log(body.url);
        //console.log(body.explanasion);
        var items = body.items;
        var selectedParasha="";
        var selectedDate=futureDate;
        var today=new Date();
    
        for (var item of items) {
            
            if (item.category == 'parashat') {
                console.log("p:", item.title, "d:", item.date);
                var parasha=item.title;
                var parashaDate=new Date(item.date);
                
            if (parashaDate>today && parashaDate<selectedDate) {
                selectedParasha=parasha;
                selectedDate=parashaDate;    
            }
                console.log(parashaDate);		
                
                
            }
        }
    
        console.log("Selected Parasha:", selectedParasha, "SelectedDate:", selectedDate);
    
        var location = body.location.title;
        var response = "In " + location + "." + selectedParasha;

        cb(':tell', response);
    });
}


function getCalLuach(title, emitHandler) {
    request('http://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=now&ss=on&mf=on&c=on&geo=city&city=CA-Vancouver&m=50&s=on', { json : true}, (err, res, body) => {
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
    
        var location = body.location.title;
        var response = "In " + location + "." + selectedTitle;

        emitHandler(':tell', response);
    });
}

function getShabbatTime(emitCb, city='') {
    getCalLuach('candles', emitCb);
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