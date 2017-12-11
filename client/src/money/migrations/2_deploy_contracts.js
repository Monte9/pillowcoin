var Pillowcoin = artifacts.require("./Pillowcoin.sol");

module.exports = function(deployer) {
  deployer.deploy(Pillowcoin);
};
