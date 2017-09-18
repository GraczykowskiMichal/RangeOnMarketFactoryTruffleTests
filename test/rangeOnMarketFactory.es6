var RangeOnMarketFactory = artifacts.require("./RangeOnMarketFactory.sol");
var BigNumber = require('bignumber.js');
var Web3Utils = require('web3-utils');

contract('RangeOnMarketFactory', function(accounts) {

    var contract;

    beforeEach(async function() {
        contract = await RangeOnMarketFactory.new();
    });

    it('returns 0 when key not set', async function() {
        var notSetKey = 555;

        let value = await contract.get(notSetKey);

        assert(new BigNumber(value).equals(0));
    });

    it('gets value', async function() {
        var key = 'key';
        var value = 'value';

        await contract.set(key, value);

        let returnedValue = await contract.get(key);

        assert.equal(Web3Utils.hexToUtf8(returnedValue), value);
    });

    it('gets entry set', async function() {
        var key1 = 'key1';
        var value1 = 'value1';
        var key2 = 'key2';
        var value2 = 'value2';

        await contract.set(key1, value1);
        await contract.set(key2, value2);

        let all = await contract.getAll();

        assert.equal(Web3Utils.hexToUtf8(all[0]), key1);
        assert.equal(Web3Utils.hexToUtf8(all[1]), value1);
        assert.equal(Web3Utils.hexToUtf8(all[2]), key2);
        assert.equal(Web3Utils.hexToUtf8(all[3]), value2);
    });
});
