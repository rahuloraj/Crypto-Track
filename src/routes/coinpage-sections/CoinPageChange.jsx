import "./../../css/coinpage-css/CoinPageChange.css";

export default function CoinPageChange({
  currency,
  hour,
  day,
  week,
  halfMonth,
  month
}) {

  const renderPriceChange = (value) => {
    if (value === undefined || value === null) return <p>No data</p>;

    const formattedValue = value.toFixed(2);
    const isNegative = parseFloat(formattedValue) < 0;
    const className = isNegative ? "priceChangePerRed" : "priceChangePerGreen";

    return (
      <p className={className}>
        {isNegative ? formattedValue : `+${formattedValue}`}%
      </p>
    );
  };

  const currencyKey = currency.toLowerCase() || "usd"; 

  const hourV = renderPriceChange(hour?.[currencyKey]);
  const dayV = renderPriceChange(day?.[currencyKey]);
  const weekV = renderPriceChange(week?.[currencyKey]);
  const halfMonthV = renderPriceChange(halfMonth?.[currencyKey]);
  const monthV = renderPriceChange(month?.[currencyKey]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>14d</th>
            <th>30d</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>{hourV}</td>
            <td>{dayV}</td>
            <td>{weekV}</td>
            <td>{halfMonthV}</td>
            <td>{monthV}</td>
          </tr>
        </thead>
      </table>
    </>
  );
}
