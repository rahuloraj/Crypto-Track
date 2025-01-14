import "./../../css/coinpage-css/CoinPageTitle.css";

export default function CoinPageTitle({
  imageLarge,
  imageSmall,
  market_cap_rank,
  name,
  symbol_coin,
}) {
  return (
    <div className="coinPageTitle__section">
      <img className="coinImage" src={imageSmall} alt={`${name} image`} />
      <img className="mobileImage" src={imageLarge} alt="coin image" />
      <div className="coinPageTitle">
        <div className="coinPageName__section">
          <h2 className="coinPageName">{name}</h2>
        </div>
        <small>•</small>
        <div className="titleInfo">
          <p className="coinPageSymbol">{symbol_coin}</p>
          <p className="capRank">#{market_cap_rank}</p>
        </div>
      </div>
    </div>
  );
}
