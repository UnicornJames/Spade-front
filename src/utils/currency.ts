export const currency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
};

export const currencyAbbr = (value: number) => {
  return Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
    style: "currency",
    currency: "USD",
  }).format(value);
};
