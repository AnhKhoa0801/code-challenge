export interface CurrencyPrice {
  currency: string;
  price: number;
  date: string;
}
export async function fetchTankStackPrices(): Promise<CurrencyPrice[]> {
  const response = await fetch("https://interview.switcheo.com/prices.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch prices: ${response.statusText}`);
  }
  return response.json();
}
