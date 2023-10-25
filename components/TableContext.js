// TableContext.js
import { createContext, useContext, useState } from 'react';

const TableContext = createContext();

export const useTableContext = () => useContext(TableContext);

export const TableProvider = ({ children }) => {
  const [players, setPlayers] = useState([
    { address: '0x1234567890123456789012345678901234567890', amount: 100 },
    { address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef', amount: 200 },
    // Add more player data here
  ]);

  const currentLotteryId = 0; // Replace with your actual lotteryId

  return (
    <TableContext.Provider value={{ players, currentLotteryId }}>
      {children}
    </TableContext.Provider>
  );
};
