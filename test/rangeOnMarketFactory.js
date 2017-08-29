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
});
