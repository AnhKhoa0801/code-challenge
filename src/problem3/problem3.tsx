interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance {
  amount: number;
  formatted: string;
  usdValue: number;
}

interface Props {
  balances: WalletBalance[];
  prices: Record<string, number>;
}

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

export default function WalletPage({ balances, prices }: Props) {
  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    const filteredBalances = balances
      .filter(
        (item: WalletBalance) =>
          getPriority(item.blockchain) > -99 && item.amount <= 0
      )
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );

    const result = filteredBalances.map((item: WalletBalance) => {
      return {
        formatted: item.amount.toFixed(),
        amount: item.amount,
        usdValue: prices[item.currency] * item.amount,
      } as FormattedWalletBalance;
    });

    return result;
  }, [balances, prices]);

  return (
    <div>
      {sortedBalances.map((item: FormattedWalletBalance, index: number) => {
        return (
          <WalletRow
            key={index}
            amount={item.amount}
            usdValue={item.usdValue}
            formattedAmount={item.formatted}
          />
        );
      })}
    </div>
  );
}
