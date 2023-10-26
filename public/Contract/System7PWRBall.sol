// SPDX-License-Identifier: MIT
// Cheyne Notes
// 0x74556d3dd00567327cB7959E9694BaAb7e2CE537 777
// 0xd7EA92A63371cC9324E9Fde3F69c7aDfBd77BAEc 100
// Treasury is 0x00fffdcA5B69E69204326147E383FD7D67e2ba37
pragma solidity ^0.8.15;

contract System7PWRBall {
    address public owner;
    address payable public treasury;
    address payable[] public players;
    address[] public winners;
    uint256 public lotteryId;
    uint256 public minimumEntryFee; // New variable to store the minimum entry fee

    constructor(address payable _treasury, uint256 _initialMinimumEntryFee) {
        owner = msg.sender;
        treasury = _treasury;
        lotteryId = 0;
        minimumEntryFee = _initialMinimumEntryFee;
    }

    // Enter the lottery
    function enter() public payable {
        require(msg.value >= minimumEntryFee, "Minimum entry fee not met");
        players.push(payable(msg.sender));

        // Calculate the amount for the treasury (20% of the entry fee)
        uint256 treasuryFee = (msg.value * 20) / 100;
        treasury.transfer(treasuryFee);
    }

    // Function to update the minimum entry fee, callable only by the owner
    function updateMinimumEntryFee(uint256 newFee) public {
        require(msg.sender == owner, "Only the owner can update the minimum entry fee");
        minimumEntryFee = newFee;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getLotteryId() public view returns (uint256) {
        return lotteryId;
    }

    function getRandomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(owner, block.timestamp, players.length)));
    }

    function pickWinner() public {
        require(msg.sender == owner, "Only the owner can pick a winner");
        uint256 randomIndex = getRandomNumber() % players.length;
        players[randomIndex].transfer(address(this).balance);
        winners.push(players[randomIndex]);
        lotteryId++;
        // Clear the players array
        delete players;
    }

    function getWinners() public view returns (address[] memory) {
        return winners;
    }
}
