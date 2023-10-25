import style from '../styles/PotCard.module.css';
import { useAppContext } from '../context/context'
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const PlayerList = () => {
  const [web3, setWeb3] = useState(null);
  const [players, setPlayers] = useState([]);
  const [walletCount, setWalletCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setIsConnected(accounts.length > 0);
      }
    }
    initWeb3();
  }, []);

  const connectWallet = async () => {
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      setIsConnected(accounts.length > 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getPlayersList() {
      if (web3 && isConnected) {
        const currentWallet = (await web3.eth.getAccounts())[0];
        const contractABI = [
          // Replace with your actual contract ABI
          {
            constant: true,
            inputs: [],
            name: 'getPlayers',
            outputs: [{ name: '', type: 'address[]' }],
            type: 'function',
          },
        ];

        const contractAddress = '0xd7EA92A63371cC9324E9Fde3F69c7aDfBd77BAEc'; // Replace with your actual contract address
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const playerAddresses = await contract.methods.getPlayers().call();
        setPlayers(playerAddresses);

        const count = playerAddresses.filter(address => address.toLowerCase() === currentWallet.toLowerCase()).length;
        setWalletCount(count);
      }
    }

    if (web3 && isConnected) {
      getPlayersList();
    }
  }, [web3, isConnected]);

  return (
    <div className={style.wrapper}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h2 style={{ color: 'white' }}>Your Tickets</h2>
      {isConnected ? (
        <div>
          <p style={{ color: 'white' }}>You have {walletCount} tickets in the draw.</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  </div>
  );
};

export default PlayerList;
