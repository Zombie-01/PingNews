import React from 'react';

interface BalanceSectionProps {
  balance: number;
}

const BalanceSection: React.FC<BalanceSectionProps> = ({ balance }) => {
  // Format the balance with MNT symbol
  const formattedBalance = new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(balance);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Your Balance</h2>
      
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
        <span className="text-gray-700">Current Balance</span>
        <span className="text-2xl font-bold text-blue-600">{formattedBalance}</span>
      </div>
    </div>
  );
};

export default BalanceSection;