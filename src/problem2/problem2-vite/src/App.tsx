import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTankStackPrices, type CurrencyPrice } from "./api";
import SelectCurrency from "./SelectCurrency";

function App() {
  const [prices, setPrices] = useState<CurrencyPrice[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toCurrency, setToCurrency] = useState<string>("");
  const [toAmount, setToAmount] = useState<number>(0);

  useEffect(() => {
    // Fetch tank stack prices here
    const fetchPrices = async () => {
      const data = await fetchTankStackPrices();
      setPrices(data);
    };
    fetchPrices();
  }, []);

  const onFromCurrencyChange = (currency: string, amount: number) => {
    setFromCurrency(currency);
    setFromAmount(amount);

    setToAmount(convertCurrency(amount, currency, toCurrency));
  };

  const onToCurrencyChange = (currency: string, amount: number) => {
    setToCurrency(currency);
    setToAmount(amount);

    setFromAmount(convertCurrency(amount, currency, fromCurrency));
  };

  const convertCurrency = (amount: number, from: string, to: string) => {
    if (from === to) return amount;

    const fromPrice = prices.find((item) => item.currency === from)?.price;
    const toPrice = prices.find((item) => item.currency === to)?.price;

    if (!fromPrice || !toPrice) return 0;

    return (amount * fromPrice) / toPrice;
  };

  if (!prices) return <CircularProgress />;

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        marginTop: "20px",
        border: "1px solid #ccc",
        padding: "20px",
      }}
    >
      <h1>Currency Converter</h1>
      <Stack spacing={2}>
        <>
          <Typography variant="h6">From</Typography>
          <SelectCurrency
            currencies={prices.map((item) => item.currency)}
            currency={fromCurrency}
            amount={fromAmount}
            onCurrencyChange={onFromCurrencyChange}
          />
        </>
        <>
          <Typography variant="h6">To</Typography>
          <SelectCurrency
            currencies={prices.map((item) => item.currency)}
            currency={toCurrency}
            amount={toAmount}
            onCurrencyChange={onToCurrencyChange}
          />
        </>
      </Stack>
    </Container>
  );
}

export default App;
