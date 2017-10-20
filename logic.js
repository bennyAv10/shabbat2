const request = require('request');

const futureDate = new Date(new Date().getFullYear()+5,0,0,0,0,0,0);

function getParasha() {
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
    
        this.emit(':tell', selectedParasha);
    });
}

module.exports = {
    getParasha: getParasha
}