import style from '../styles/PotCard.module.css';
import truncateEthAddress from 'truncate-eth-address';
import { useAppContext } from '../context/context';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const LotteryCard = () => {
  const { lastWinner, lotteryPot, enterLottery, pickWinner } =
    useAppContext();
  const [web3, setWeb3] = useState(null);
  const [ players, setPlayers] = useState([]);
  const [ getPlayers] = useState([]);
  const [latestWinner, setLatestWinner] = useState(null); // To store the latest winner's address
  const [lotteryId, setLotteryId] = useState(0); // To store the current lottery ID
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

  // Function to handle the "Enter" button click
  const handleEnterLottery = async () => {
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
      const accounts = await web3.eth.getAccounts();

      try {
        await lotteryContract.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei('100', 'ether'), // Sending 100 PWR, adjust as needed
        });
        console.log('Entered the lottery successfully');
      } catch (error) {
        console.error('Error entering the lottery', error);
      }
    } else {
      console.error('Web3 is not initialized. Make sure you have a compatible wallet and network connected.');
    }
  };

    // Function to fetch and display the current lottery ID
    const fetchLotteryId = async () => {
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
          const currentLotteryId = await lotteryContract.methods.lotteryId().call();
          setLotteryId(currentLotteryId);
        } catch (error) {
          console.error('Error fetching current lottery ID', error);
        }
      }
    };

    useEffect(() => {
      fetchLotteryId(); // Fetch current lottery ID when the component mounts
    }, [web3]);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        SYSTEM7
      </div>
        <div className={style.title}>
          PWR-Ball 100 Draw{' '}
          <span className={style.textAccent}>#{lotteryId ? lotteryId : '0'}</span>
        </div>
      <div className={style.paragragh}>
        Welcome to the System 7 PWR-Ball To enter, youll need 100 PWR tokens. Drawn daily. If youre feeling lucky, you could be the next winner of the PWR-Ball jackpot
      </div>
      <div className={style.recentWinnerTitle}>
        Winner takes the Pot!
      </div>
      <div className={style.paragragh}>
        100PWR per Entry
      </div>
      <div className={style.btn} onClick={handleEnterLottery}>
        Enter
      </div>
    </div>
  );
};

export default LotteryCard;
