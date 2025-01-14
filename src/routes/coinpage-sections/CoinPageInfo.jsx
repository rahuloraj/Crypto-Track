import InfoIcon from "./../../assets/info-circle.svg";
import "./../../css/coinpage-css/CoinPageInfo.css";

export default function CoinPageInfo({
  currency,
  currencySymbol,
  market_cap,
  fully_diluted_valuation,
  circulating_supply,
  total_supply,
  max_supply,
  ath,
  ath_change_percentage,
  ath_date,
  atl,
  atl_change_percentage,
  atl_date,
}) {
 
  const currencyKey = currency.toLowerCase() || "usd"; 

  const marketCap = market_cap?.[currencyKey];
  const fdv = fully_diluted_valuation?.[currencyKey];
  const athV = ath?.[currencyKey];
  const athPerc = ath_change_percentage?.[currencyKey];
  const athDate = ath_date?.[currencyKey];
  const atlV = atl?.[currencyKey];
  const atlPerc = atl_change_percentage?.[currencyKey];
  const atlDate = atl_date?.[currencyKey];

  return (
    <div className="coinPageInfoSection" id="nextPart">
      <div className="lineInfo">
        <div className="lineInfoTitle">
          <p>Market Cap</p>
        </div>
        <div>
          <p>
            {marketCap
              ? `${currencySymbol} ${marketCap.toLocaleString()}`
              : "N/A"}
          </p>
        </div>
      </div>
      <div className="lineInfo">
        <div className="lineInfoTitle">
          <p>Fully Diluted Valuation</p>
        </div>
        <div>
          <p>{fdv ? `${currencySymbol} ${fdv.toLocaleString()}` : "N/A"}</p>
        </div>
      </div>
      <div className="lineInfo">
        <div className="lineInfoTitle">
          <p>Circulating Supply</p>
        </div>
        <div>{circulating_supply}</div>
      </div>
      <div className="lineInfo">
        <div className="lineInfoTitle">
          <p>Total Supply</p>
        </div>
        <div>{total_supply}</div>
      </div>
      <div className="lineInfo">
        <div className="lineInfoTitle">
          <p>Max Supply</p>
        </div>
        <div>{max_supply}</div>
      </div>
      <div className="lineInfo">
        <div className="lineInfoTitle">
          <p>All-Time High</p>
        </div>
        <div>
          <div className="allTimeSection">
            <p>{athV ? `${currencySymbol} ${athV.toLocaleString()}` : "N/A"}</p>
            <p className="coinPagePriceRed">
              {athPerc ? `${athPerc.toFixed(2)}%` : "N/A"}
            </p>
          </div>
          <div className="allTimeDate">
            <p>{athDate ? athDate.slice(0, 10) : "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="lineInfo">
        <div className="lineInfoTitle">
          <p>All-Time Low</p>
        </div>
        <div>
          <div className="allTimeSection">
            <p>{atlV ? `${currencySymbol} ${atlV.toLocaleString()}` : "N/A"}</p>
            <p className="coinPagePriceGreen">
              {atlPerc ? `+${atlPerc.toFixed(2)}%` : "N/A"}
            </p>
          </div>
          <div className="allTimeDate">
            <p>{atlDate ? atlDate.slice(0, 10) : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
