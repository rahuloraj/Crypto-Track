import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoinPageBtn from "./coinpage-sections/CoinPageBtn.jsx";
import CoinPageChange from "./coinpage-sections/CoinPageChange.jsx";
import CoinPageInfo from "./coinpage-sections/CoinPageInfo.jsx";
import CoinPagePrice from "./coinpage-sections/CoinPagePrice.jsx";
import CoinPageSparkline from "./coinpage-sections/CoinPageSparkline.jsx";
import CoinPageTitle from "./coinpage-sections/CoinPageTitle.jsx";
import Converter from "./coinpage-sections/Converter.jsx";
import Error from "./../components/Error.jsx";
import Loading from "./../components/Loading.jsx";
import "./../css/coinpage-css/CoinPage.css";

export default function CoinPage() {
  let { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${id}?sparkline=true`, {
      signal: controller.signal,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setCoin(data);
        setError(null); 
      })
      .catch(error => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.log("Error:", error);
          setError(true);
        }
      })
      document.title = `${
        id.charAt(0).toUpperCase() + id.slice(1)
      } Coin | CryptoCheck`;
      return () => controller.abort();
  }, [id]);

  useEffect(() => {
    switch (currency.toLowerCase()) {
      case "usd":
        setCurrencySymbol("$");
        break;
      case "eur":
        setCurrencySymbol("€");
        break;
      case "cny":
        setCurrencySymbol("¥");
        break;
      case "jpy":
        setCurrencySymbol("¥");
        break;
      case "gbp":
        setCurrencySymbol("£");
        break;
      case "aud":
        setCurrencySymbol("A$");
        break;
      case "cad":
        setCurrencySymbol("C$");
        break;
      case "chf":
        setCurrencySymbol("CHF");
        break;
      case "krw":
        setCurrencySymbol("₩");
        break;
      case "sgd":
        setCurrencySymbol("S$");
        break;
      case "pln":
        setCurrencySymbol("zł");
        break;
      default:
        setCurrencySymbol(currency); 
    }
  }, [currency]);

  if (isLoading || !coin) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  
    return (
      <div className="coinPage">
        <div className="coinPageFirstSection">
          <CoinPageBtn
            currency={currency}
            name={coin.name}
            setCurrency={setCurrency}
          />
          <div className="infoWrapper">
            <CoinPageTitle
              imageLarge={coin.image.large}
              imageSmall={coin.image.small}
              market_cap_rank={coin.market_cap_rank}
              name={coin.name}
              symbol_coin={coin.symbol}
            />
            <CoinPagePrice
              currency={currency}
              currencySymbol={currencySymbol}
              current_price={coin.market_data.current_price}
              high_24h={coin.market_data.high_24h}
              low_24h={coin.market_data.low_24h}
              price_change_percentage_24h_in_currency={
                coin.market_data.price_change_percentage_24h_in_currency
              }
            />
          </div>
        </div>
        <div className="coinPageSecondSection">
          <CoinPageSparkline
            day={coin.market_data.price_change_percentage_24h_in_currency.usd}
            name={coin.name}
            sparkline={coin.market_data.sparkline_7d.price}
          />
          <CoinPageInfo
            currency={currency}
            currencySymbol={currencySymbol}
            ath={coin.market_data.ath}
            ath_change_percentage={coin.market_data.ath_change_percentage}
            ath_date={coin.market_data.ath_date}
            atl={coin.market_data.atl}
            atl_change_percentage={coin.market_data.atl_change_percentage}
            atl_date={coin.market_data.atl_date}
            circulating_supply={coin.market_data.circulating_supply}
            fully_diluted_valuation={coin.market_data.fully_diluted_valuation}
            market_cap={coin.market_data.market_cap}
            max_supply={coin.market_data.max_supply}
            total_supply={coin.market_data.total_supply}
          />
        </div>
        <div className="coinPagePriceChangePerSection">
          <CoinPageChange
            currency={currency}
            day={coin.market_data.price_change_percentage_24h_in_currency}
            halfMonth={coin.market_data.price_change_percentage_14d_in_currency}
            hour={coin.market_data.price_change_percentage_1h_in_currency}
            month={coin.market_data.price_change_percentage_30d_in_currency}
            week={coin.market_data.price_change_percentage_7d_in_currency}
            year={coin.market_data.price_change_percentage_1y_in_currency}
          />
        </div>
        <div className="coinPageThirdSection">
          <Converter
            currency={currency}
            currencySymbol={currencySymbol}
            current_price={coin.market_data.current_price}
            image={coin.image.small}
            symbol_coin={coin.symbol}
          />
        </div>
      </div>
    );
  } 


