var cacheData = {};

//TODO: add timeout ability

function cacheGetter(key) {
    return cacheData[key];
}

function cacheSetter(key, val) {
    cacheData[key]=val;
}

module.exports = {
    cacheGetter: cacheGetter,
    cacheSetter: cacheSetter
};