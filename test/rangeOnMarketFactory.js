var RangeOnMarketFactory = artifacts.require("./RangeOnMarketFactory.sol");

contract('RangeOnMarketFactory', function(accounts) {

    it("return 0 for a not set key", function() {
        const notSetKey = 0x1000000000000000000000000000000000000000000000000000000000000000;
        const zero = 0x0000000000000000000000000000000000000000000000000000000000000000;
        return RangeOnMarketFactory.deployed().then(function(instance) {
            return instance.get(notSetKey);
        }).then(function(value) {
            assert.equal(value, zero, "get(notSetKey) did not equal zero");
        });
    });

    it("return value previously set for key", function() {
        const key = 0x1000000000000000000000000000000000000000000000000000000000000000;
        const value = 0x2000000000000000000000000000000000000000000000000000000000000000;
        return RangeOnMarketFactory.deployed().then(function(instance) {
            instance.set(key, value);
            return instance;
        }).then(function(instance) {
            return instance.get(key);
        }).then(function(returnedValue) {
            assert.equal(returnedValue, value, "returned value did not equal value set to key");
        });
    });

    it("return all key-value pairs", function() {
        const key1 = 0x1000000000000000000000000000000000000000000000000000000000000000;
        const value1 = 0x2000000000000000000000000000000000000000000000000000000000000000;
        const key2 = 0x3000000000000000000000000000000000000000000000000000000000000000;
        const value2 = 0x4000000000000000000000000000000000000000000000000000000000000000;
        return RangeOnMarketFactory.deployed().then(function(instance) {
            instance.set(key1, value1);
            return instance;
        }).then(function(instance) {
            instance.set(key2, value2);
            return instance;
        }).then(function(instance) {
            return instance.getAll();
        }).then(function(all) {
            console.log(all);
            assert.equal(all[0], key1, "all[0] != key1");
            assert.equal(all[1], value1, "all[1] != value1");
            assert.equal(all[2], key2, "all[2] != key2");
            assert.equal(all[3], value2, "all[3] != value2");
        });
    });
});
