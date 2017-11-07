var t = require('./LocalCacher.js');

const TEST_KEY_1 = 'key1';
const TEST_KEY_2 = 'key2';
const TEST_VAL_1 = 'val1';
const TEST_VAL_2 = 'val2';

test('If entry not exist returns undefined', () => {
    expect(t.cacheGetter(TEST_KEY_1)).toBeUndefined();
});

test('if entry was added before get correct value', () => {
    t.cacheSetter(TEST_KEY_1, TEST_VAL_1);
    expect(t.cacheGetter(TEST_KEY_1)).toBe(TEST_VAL_1);
    expect(t.cacheGetter(TEST_KEY_2)).toBeUndefined();
});

test('when cache has two entries, we still get the correct', () => {
    t.cacheSetter(TEST_KEY_1, TEST_VAL_1);
    t.cacheSetter(TEST_KEY_2, TEST_VAL_2);

    expect(t.cacheGetter(TEST_KEY_1)).toBe(TEST_VAL_1);
    expect(t.cacheGetter(TEST_KEY_2)).toBe(TEST_VAL_2);
});