import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface SelectCurrencyProps {
  currencies: string[];
  currency: string;
  amount: number;
  onCurrencyChange: (currency: string, amount: number) => void;
}

export default function SelectCurrency({
  currency,
  amount,
  onCurrencyChange,
  currencies,
}: SelectCurrencyProps) {
  const getSvgIcon = (currencyName: string) => (
    <img
      src={`/tokens/${currencyName}.svg`}
      alt={currencyName}
      style={{ width: 24, height: 24, verticalAlign: "middle", marginRight: 8 }}
    />
  );
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={currency}
          label="Currency"
          onChange={(e) => onCurrencyChange(e.target.value, amount)}
        >
          {currencies.map((item, idx) => (
            <MenuItem key={idx} value={item}>
              {getSvgIcon(item)}
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <TextField
          value={amount}
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          type="number"
          onChange={(e) => onCurrencyChange(currency, Number(e.target.value))}
        />
      </FormControl>
    </>
  );
}
