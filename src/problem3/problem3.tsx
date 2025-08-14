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

interface Props extends BoxProps {}

export default function WalletPage(props: Props) {
  const { ...rest } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

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

  const sortedBalances = useMemo(() => {
    const temp = balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });

    const result = temp.map((balance: WalletBalance) => {
      return {
        formatted: balance.amount.toFixed(),
        amount: balance.amount,
        usdValue: prices[balance.currency] * balance.amount,
      } as FormattedWalletBalance;
    });

    return result;
  }, [balances, prices]);

  return (
    <div {...rest}>
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
