import style from '../styles/PotCard.module.css';
import truncateEthAddress from 'truncate-eth-address';
import { useAppContext } from '../context/context';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const LatestWinners = () => {
  const { lotteryId, lastWinner, lotteryPot, enterLottery, pickWinner } =
    useAppContext();
  const [web3, setWeb3] = useState(null);
  const [ players, setPlayers] = useState([]);
  const [latestWinner, setLatestWinner] = useState(null); // To store the latest winner's address

  // Initialize Web3 and set it to state
  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission
        setWeb3(web3Instance);
      }
    }
    initWeb3();
  }, []);
  // Function to fetch the latest winner's address
    const fetchLatestWinner = async () => {
      if (web3) {
        const contractAddress = '0xd7EA92A63371cC9324E9Fde3F69c7aDfBd77BAEc'; // Replace with your contract address
        const contractABI = [
  	{
  		"inputs": [
  			{
  				"internalType": "address payable",
  				"name": "_treasury",
  				"type": "address"
  			},
  			{
  				"internalType": "uint256",
  				"name": "_initialMinimumEntryFee",
  				"type": "uint256"
  			}
  		],
  		"stateMutability": "nonpayable",
  		"type": "constructor"
  	},
  	{
  		"inputs": [],
  		"name": "enter",
  		"outputs": [],
  		"stateMutability": "payable",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "getBalance",
  		"outputs": [
  			{
  				"internalType": "uint256",
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "getLotteryId",
  		"outputs": [
  			{
  				"internalType": "uint256",
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "getPlayers",
  		"outputs": [
  			{
  				"internalType": "address payable[]",
  				"name": "",
  				"type": "address[]"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "getRandomNumber",
  		"outputs": [
  			{
  				"internalType": "uint256",
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "getWinners",
  		"outputs": [
  			{
  				"internalType": "address[]",
  				"name": "",
  				"type": "address[]"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "lotteryId",
  		"outputs": [
  			{
  				"internalType": "uint256",
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "minimumEntryFee",
  		"outputs": [
  			{
  				"internalType": "uint256",
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "owner",
  		"outputs": [
  			{
  				"internalType": "address",
  				"name": "",
  				"type": "address"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "pickWinner",
  		"outputs": [],
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"inputs": [
  			{
  				"internalType": "uint256",
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"name": "players",
  		"outputs": [
  			{
  				"internalType": "address payable",
  				"name": "",
  				"type": "address"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [],
  		"name": "treasury",
  		"outputs": [
  			{
  				"internalType": "address payable",
  				"name": "",
  				"type": "address"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"inputs": [
  			{
  				"internalType": "uint256",
  				"name": "newFee",
  				"type": "uint256"
  			}
  		],
  		"name": "updateMinimumEntryFee",
  		"outputs": [],
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"inputs": [
  			{
  				"internalType": "uint256",
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"name": "winners",
  		"outputs": [
  			{
  				"internalType": "address",
  				"name": "",
  				"type": "address"
  			}
  		],
  		"stateMutability": "view",
  		"type": "function"
  	}
  ];

        const lotteryContract = new web3.eth.Contract(contractABI, contractAddress);

        try {
          const latestWinners = await lotteryContract.methods.getWinners().call();
          if (latestWinners && latestWinners.length > 0) {
            const latestWinnerAddress = latestWinners[latestWinners.length - 1]; // Get the last winner
            setLatestWinner(latestWinnerAddress);
          }
        } catch (error) {
          console.error('Error fetching latest winner:', error);
        }
      }
    };

    // Fetch the latest winner when the component mounts
    useEffect(() => {
      fetchLatestWinner();
    }, [web3]);


  return (
    <div className={style.wrapper}>
    <div className={style.winner}>
      {latestWinner ? (
        <p>
          Latest Winner: {truncateEthAddress(latestWinner)}
        </p>
      ) : (
        <p>No winner yet.</p>
      )}
    </div>
    <div className={style.paragragh}>
      Congratulations. You are the latest System 7 PWRBall winner!
    </div>
    </div>
  );
};

export default LatestWinners;
