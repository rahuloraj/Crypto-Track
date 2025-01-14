import { useState } from "react";
import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import Star from "./../../assets/star.svg";
import "./../../css/coinsstats-css/Coin.css";

export default function Coin({
  favoriteCoins,
  setFavoriteCoins,
  coinId,
  marketCapRank,
  icon,
  coinName,
  coinSymbol,
  price,
  priceChange,
  sparkline,
}) {
  const isFavorite = favoriteCoins.some((coin) => coin.coinId === coinId);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavoriteCoins(favoriteCoins.filter((id) => id !== coinId));
    } else {
      setFavoriteCoins([
        ...favoriteCoins,
        { coinId, icon, coinName, price, marketCapRank },
      ]);
    }
  };

  return (
    <div className="coin__section" key={coinName}>
      <div className="coin">
        <div className="starSection">
          <button className="starBtn" onClick={toggleFavorite}>
            <SVG
              className={`starIcon ${isFavorite ? "favorite" : ""}`}
              src={Star}
              width={20}
              height={20}
              alt="menu icon"
              aria-label="Open the menu"
              title="Open the menu"
            />
          </button>
        </div>
        <div className="firstSection">
          <p>{marketCapRank}</p>
        </div>
        <div className="secondSection">
          <div className="coinImg__section">
            <img className="coinImg" src={icon} alt="Crypto icon" />
          </div>
          <div className="coinTitle">
            <h2 className="coinSymbol">{coinSymbol}</h2>
            <small>•</small>
            <div className="coinName__section" title={coinName}>
              <p className="coinName" title={coinName}>
                {coinName}
              </p>
              <p className="mobilePrice">${price.toFixed(0)}</p>
            </div>
          </div>
        </div>
        <div className="thirdSection">
          <p className="coinPrice">${price.toFixed(0)}</p>
        </div>
        <div className="fourthSection">
          {priceChange < 0 ? (
            <p className="priceChange red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="priceChange green">+{priceChange.toFixed(2)}%</p>
          )}
        </div>
        <div className="fifthSection">
          {priceChange < 0 ? (
            <Sparklines data={sparkline} margin={5}>
              <SparklinesLine color="#df8653" />
            </Sparklines>
          ) : (
            <Sparklines data={sparkline} margin={5}>
              <SparklinesLine color="#5353e4" />
            </Sparklines>
          )}
        </div>
        <div className="sixthSection">
          <Link className="coinBtn__section" to={`/CoinPage/${coinId}`}>
            <button className="coinBtn">More Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
}