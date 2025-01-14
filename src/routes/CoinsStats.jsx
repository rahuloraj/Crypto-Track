import { useState, useEffect } from "react";
import { useLocalStorage } from "./../logic/useLocalStorage.jsx";
import Coin from "./coinsstats-sections/Coin.jsx";
import CoinStatsMenu from "./coinsstats-sections/CoinStatsMenu.jsx";
import Error from "./../components/Error.jsx";
import Loading from "./../components/Loading.jsx";
import "./../css/coinsstats-css/CoinsStats.css";

export default function CoinsStats({ theme, setTheme }) {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteCoins, setFavoriteCoins] = useLocalStorage("favoriteCoins", []);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true",
      {
        signal: controller.signal,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setCoins(data);
        setError(null); 
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.log("Error:", error);
          setError(true);
        }
      });
    document.title =
      "Real-Time Cryptocurrency Tracking & Insights | CryptoCheck";
    return () => controller.abort();
  }, []);

  const searchCoin = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterCoins = coins.filter((coin) =>
    coin.name.toUpperCase().includes(searchTerm.toUpperCase())
  );

  if(isLoading){
    return <Loading/>
  }

  if (error) {
    return <Error/>;
  }

  return (
    <>
      <div className="bckgr"></div>
      <div className="secondTitle__section">
        <div className="mobilePage">
          <h2 className="secondTitle">
            Real-Time Cryptocurrency <br />{" "}
            <span className="trackingText">Tracking</span> &{" "}
            <span className="insightsText">Insights</span>
          </h2>
          <p className="subTitle">
            CryptoCheck delivers live cryptocurrency tracking, market analysis,
            and expert insights in one convenient platform. Whether you're a
            seasoned trader or a crypto enthusiast, stay informed with real-time
            data, price updates, and trends to make smarter decisions in the
            fast-evolving world of digital currencies. You can also switch to
            your preferred currency and access a converter for your chosen coin
            by simply clicking the 'more info' button. Enjoy!
          </p>
          <div className="scrollNext__section">
            <button
              className="scrollNext"
              onClick={() => {
                const element = document.getElementById("nextPart");
                element?.scrollIntoView({
                  behavior: "smooth",
                  margin: "1em",
                });
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="coinsStatsSection">
        <div className="inputSearch__section" id="nextPart">
          <input
            className="inputSearch"
            type="text"
            placeholder="Search the coin..."
            onChange={searchCoin}
          />
        </div>
        <CoinStatsMenu
          coins={coins}
          favoriteCoins={favoriteCoins}
          setFavoriteCoins={setFavoriteCoins}
          setTheme={setTheme}
          theme={theme}
        />
        <div className="cryptoSection">
          <div className="legendRow__section">
            <div className="legendRow">
              <p className="legendFirst">#</p>
              <p className="legendSecond">Name</p>
              <p className="legendThird">Price</p>
              <p className="legendFourth">24h Change</p>
              <p className="legendGraph">Price Graph(7d)</p>
            </div>
          </div>
          {isLoading && <Loading />}
          {filterCoins.map((coins) => {
            return (
              <Coin
                coinId={coins.id}
                coinName={coins.name}
                coinSymbol={coins.symbol}
                favoriteCoins={favoriteCoins}
                icon={coins.image}
                setFavoriteCoins={setFavoriteCoins}
                key={coins.name}
                marketCapRank={coins.market_cap_rank}
                price={coins.current_price}
                priceChange={coins.price_change_percentage_24h}
                sparkline={coins.sparkline_in_7d.price}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
