//SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Lottery {
    address public owner;
    address payable[] public players;
    address[] public winners;
    uint256 public lotteryId;

    //runs only once contract is deployed
    constructor() {
        owner = msg.sender;
        lotteryId = 0;
    }

    //enter

    function enter() public payable {
        require(msg.value >= 0.01 ether);
        players.push(payable(msg.sender));
    }

    //get all players in pool
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    //get balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getLotteryId() public view returns (uint256) {
        return lotteryId;
    }

    //get a random number
    function getRandomNumber() public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    //pick a winner from pool
    function pickWinner() public {
        require(msg.sender == owner);
        uint256 randomIndex = getRandomNumber() % players.length;
        players[randomIndex].transfer(address(this).balance);
        winners.push(players[randomIndex]);
        lotteryId++;
        //clear players array

        players = new address payable[](0);
    }

    //get winners of lottery
    function getWinners() public view returns (address[] memory) {
        return winners;
    }
}
