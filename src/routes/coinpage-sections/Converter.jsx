import { useState, useEffect } from "react";
import "./../../css/coinpage-css/Converter.css";

export default function Converter({currency, currencySymbol, current_price, image, symbol_coin}) {
  const [money, setMoney] = useState("1");
  const [converted, setConverted] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if(price && money){
    const converting = money * price;
    setConverted(converting);
    }
  }, [money, price]);

  useEffect(() => {
    switch (currency) {
      case "USD":
        setPrice(current_price.usd);
        break;
      case "EUR":
        setPrice(current_price.eur);
        break;
      case "CNY":
        setPrice(current_price.cny);
        break;
      case "JPY":
        setPrice(current_price.jpy);
        break;
      case "GBP":
        setPrice(current_price.gbp);
        break;
      case "AUD":
        setPrice(current_price.aud);
        break;
      case "CAD":
        setPrice(current_price.cad);
        break;
      case "CHF":
        setPrice(current_price.chf);
        break;
      case "KRW":
        setPrice(current_price.krw);
        break;
      case "SGD":
        setPrice(current_price.sgd);
        break;
      case "PLN":
        setPrice(current_price.pln);
        break;
      default:
        setPrice(0);
        break;
    }
  }, [currency, current_price]);


  return (
    <div className="converter__section">
      <h4 className="converterTitle">Crypto Converter</h4>
      <div className="converter">
        <div>
          <div className="infoConverter">
            <img
              className="imgConverter"
              src={image}
              alt={`${symbol_coin} image`}
            />
            <p className="nameConverter">{symbol_coin}</p>
          </div>
          <input
            className="inputConverter"
            type="number"
            value={money}
            min="1"
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <div className="convertedCoinSection">
          <p className="priceConverted">{converted.toLocaleString()}</p>
          <p className="symbolConverted">{currencySymbol}</p>
        </div>
      </div>
    </div>
  );
}
