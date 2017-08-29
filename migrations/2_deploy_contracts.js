var RangeOnMarketFactory = artifacts.require("./RangeOnMarketFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(RangeOnMarketFactory);
};
