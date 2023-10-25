// TableRow.js
import React from 'react';
import style from '../styles/TableRow.module.css';

const TableRow = ({ player }) => {
  return (
    <div className={style.row}>
      <div className={style.addressCell}>{player.address}</div>
      <div className={style.amountCell}>{player.amount} ETH</div>
    </div>
  );
};

export default TableRow;
