const request = require('request');
const cacher = require('./LocalCacher');

var cacheHitCount=0;
var cacheMissCount=0;

var cacheGetter = cacher.cacheGetter;
var cacheSetter = cacher.cacheSetter;
/**
 * Get static data from URL. 
 * if data exists in the cache, retrieves it from cache
 * Otherwise, retrieves from the network and cache it. 
 * Note this function is good for static data
 * Don't use it in dynamic data as the cached information
 * may obe obsolete
 * @param {string} url - The request address.
 * @param {Function} handler called with the body from the response
 */ 
function getFromUrl(url, handler) {
    console.log("in getFromURL: ", typeof handler);

    var cacheRes = cacheGetter(url);
    if (cacheRes) {
        cacheHitCount++;
        handler(cacheRes);
    } else {
        request(url, { json : true}, 
            (err, res, body) => {
                if (err) {
                    console.log("Error while requesting ", url, ": ", err);
                } else {
                    cacheSetter(url, body);
                    handler(body);
                }
            });
    }
}

function SetCacher(cacheGetterArg, cacheSetterArg) {
    cacheGetter = cacheGetterArg;
    cacheSetter = cacheSetterArg;
};

module.exports = {
    getFromUrl: getFromUrl,
    SetCacher: SetCacher,
    cacheHitCount: cacheHitCount,
    cacheMissCount: cacheMissCount    
};
