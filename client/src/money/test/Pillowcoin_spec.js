var Pillowcoin = artifacts.require("./Pillowcoin.sol");

contract('Pillowcoin', function(accounts) {
  it("should have a total supply of 7598 Pillowcoins", function () {
    return Pillowcoin.deployed().then(function (instance) {
      return instance.totalSupply();
    }).then(function (totalSupply) {
      assert.equal(totalSupply.valueOf(), 7598, "the total supply wasn't 7598 Pillowcoins");
    })
  });

  it("should put 7598 Pillowcoin in the first account (owner)", function() {
    return Pillowcoin.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 7598, "7598 wasn't in the owner's account");
    });
  });

  it("should send 32 coins from owner to another account", function() {
    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 32;

    return Pillowcoin.deployed().then(function (instance) {
      coin = instance
      return coin.balanceOf(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return coin.balanceOf(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return coin.transfer(account_two, amount);
    }).then(function() {
      return coin.balanceOf(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return coin.balanceOf(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
