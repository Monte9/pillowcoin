pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Pillowcoin.sol";

contract TestPillowcoin {
  function testInitialBalanceUsingDeployedContract() public {
    Pillowcoin coins = Pillowcoin(DeployedAddresses.Pillowcoin());
    uint expected = 7598;

    Assert.equal(coins.balanceOf(tx.origin), expected, "Owner should have 7598 Pillowcoins initially");
  }
}
