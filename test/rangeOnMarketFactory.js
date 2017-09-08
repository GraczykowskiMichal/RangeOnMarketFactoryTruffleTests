var RangeOnMarketFactory = artifacts.require("./RangeOnMarketFactory.sol");
var BigNumber = require('bignumber.js');
var Web3Utils = require('web3-utils');

contract('RangeOnMarketFactory', function(accounts) {

    var contract;

    beforeEach(function(done) {
        RangeOnMarketFactory.new().then(function(instance) {
            contract = instance;
            done();
        })
    });

    it("should return 0 for a not set key", function(done) {
        var notSetKey = 555;

        contract.get(notSetKey).then(function(value) {
            assert(new BigNumber(value).equals(0));
            done();
        });
    });

    it("should return value previously set for key", function(done) {
        var key = 'key';
        var value = 'value';

        contract.set(key, value).then(function() {
            return contract.get(key);
        }).then(function (returnedValue) {
            assert.equal(Web3Utils.hexToUtf8(returnedValue), value);
            done();
        });
    });

    it("should return all key-value pairs", function(done) {
        var key1 = 'key1';
        var value1 = 'value1';
        var key2 = 'key2';
        var value2 = 'value2';

        contract.set(key1, value1).then(function() {
            return contract.set(key2, value2);
        }).then(function() {
            return contract.getAll();
        }).then(function(all) {
            assert.equal(Web3Utils.hexToUtf8(all[0]), key1);
            assert.equal(Web3Utils.hexToUtf8(all[1]), value1);
            assert.equal(Web3Utils.hexToUtf8(all[2]), key2);
            assert.equal(Web3Utils.hexToUtf8(all[3]), value2);
            done();
        });
    });
});
