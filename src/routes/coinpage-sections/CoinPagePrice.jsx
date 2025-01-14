import InfoIcon from "./../../assets/info-circle.svg";
import "./../../css/coinpage-css/CoinPagePrice.css";

export default function CurrencyInfo({
  currency,
  currencySymbol,
  current_price,
  high_24h,
  low_24h,
  price_change_percentage_24h_in_currency,
}) {
  
  const renderPrice = (value) => {
    const formattedValue = value.toFixed(2);
    const isNegative = parseFloat(formattedValue) < 0;
    const className = isNegative ? "coinPagePriceRed" : "coinPagePriceGreen";

    return (
      <p className={className}>
        {isNegative ? formattedValue : `+${formattedValue}`}%
      </p>
    );
  };

  const getValue = (key) => {
    return {
      price: current_price[key],
      priceChange: price_change_percentage_24h_in_currency[key],
      dayHigh: high_24h[key],
      dayLow: low_24h[key],
    };
  };

  const { price, priceChange, dayHigh, dayLow } = getValue(
    currency.toLowerCase()
  );

  const formattedPrice = price
    ? `${currencySymbol}${price.toLocaleString()}`
    : "No data";
  const highFormatted = dayHigh
    ? `${currencySymbol}${dayHigh.toLocaleString()}`
    : "No data";
  const lowFormatted = dayLow
    ? `${currencySymbol}${dayLow.toLocaleString()}`
    : "No data";


  return (
    <>
      <div className="coinPagePrice__section">
        <div className="coinPagePriceWrapper">
        <h3 className="coinPagePrice">{formattedPrice}</h3>
        {renderPrice(priceChange)}
        </div>
        <div className="coinPagePriceChangeSection">
          <div className="priceChangeGreen">
            <h3 className="priceChangeTitle">24hr High:</h3>
            <h3 className="greenPrice">{highFormatted}</h3>
          </div>
          <div className="priceChangeRed">
            <h3 className="priceChangeTitle">24hr Low:</h3>
            <h3 className="redPrice">{lowFormatted}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
