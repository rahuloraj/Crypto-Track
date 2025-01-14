import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SVG from "react-inlinesvg"; 
import ArrowDown from "./../assets/icon-arrow-down.svg"; 
import ArrowUp from "./../assets/icon-arrow-up.svg"; 
import Close from "./../assets/icon-close.svg"; 
import Compare from "./../assets/icon-compare.svg"; 
import "./../css/components-css/CompareCoinsMenu.css";

export default function CompareCoinsMenu({ close, coins }) {
  const [searchTerm1, setSearchTerm1] = useState(""); 
  const [searchTerm2, setSearchTerm2] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [openInput, setOpenInput] = useState(null);

  useEffect(() => {
    let handler = (e) => {
      if (!e.target.closest(".optionsSection")) {
        setOpenInput(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [openInput]);

  const filterCoins1 = coins.filter((coin) =>
    coin.name.toUpperCase().includes(searchTerm1.toUpperCase())
  );
  const filterCoins2 = coins.filter((coin) =>
    coin.name.toUpperCase().includes(searchTerm2.toUpperCase())
  );

  const handleInputChange1 = (e) => {
    setSearchTerm1(e.target.value);
    setOpenInput(1);
  };

  const handleInputChange2 = (e) => {
    setSearchTerm2(e.target.value);
    setOpenInput(2);
  };

  const handleSelectCoin1 = (coin) => {
    setSelectedCoin1(coin);
    setInputValue1(`${coin.name} - ${coin.current_price}$`);
    setSearchTerm1("");
    setOpenInput(null);
  };

  const handleSelectCoin2 = (coin) => {
    setSelectedCoin2(coin);
    setInputValue2(`${coin.name} - ${coin.current_price}$`);
    setSearchTerm2("");
    setOpenInput(null);
  };

  const calculateHypotheticalPriceCoin = () => {
    if (!selectedCoin1 || !selectedCoin2) return null;
    const { market_cap: marketCap2, circulating_supply: supply2 } =
      selectedCoin2;
    const { circulating_supply: supply1 } = selectedCoin1;

    if (isNaN(supply1) || isNaN(supply2) || supply1 === 0) {
      return null;
    }

    const hypotheticalPriceCoin = marketCap2 / supply1;
    return hypotheticalPriceCoin;
  };

  const calculateComparisonRatio = () => {
    if (!selectedCoin1 || !selectedCoin2) return null;

    const hypotheticalPriceBTC =
      selectedCoin2.market_cap / selectedCoin1.circulating_supply;

    const ratio = hypotheticalPriceBTC / selectedCoin1.current_price;

    return ratio;
  };

  const hypotheticalPrice = calculateHypotheticalPriceCoin();
  const ratio = calculateComparisonRatio();

  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="window"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <div className="compareModal">
            <div className="closeIcon__section">
              <SVG className="closeIcon" src={Close} onClick={close} />
            </div>
            <div className="compareTitle__section">
              <h2 className="compareTitle">
                Calculate the price of A with the <span>market cap</span> of B
              </h2>
            </div>
            <div>
              <div className="compareInput__section">
                <p className="selectText">Select A</p>
                <input
                  className="compareInput"
                  value={searchTerm1 || inputValue1}
                  onChange={handleInputChange1}
                  onClick={() => setOpenInput(1)}
                  placeholder="Search or select a coin"
                />
                <div className="arrowIcon__section">
                  {openInput === 1 ? (
                    <SVG src={ArrowUp} className="arrowIcon" />
                  ) : (
                    <SVG src={ArrowDown} className="arrowIcon" />
                  )}
                </div>
                {openInput === 1 && (
                  <div className="optionsSection">
                    {filterCoins1.length > 0 ? (
                      filterCoins1.map((coin) => (
                        <button
                          className="optionCoin"
                          key={coin.id}
                          onClick={() => handleSelectCoin1(coin)}
                        >
                          <img
                            className="optCoinImg"
                            src={coin.image}
                            alt={coin.image}
                          />
                          {coin.name} ({coin.symbol}) - {coin.current_price}$
                        </button>
                      ))
                    ) : (
                      <div className="noResults">No results found</div>
                    )}
                  </div>
                )}
              </div>
              <div className="compareIcon__section">
                <SVG className="compareIcon" src={Compare} />
              </div>
              <div className="compareInput__section">
                <p className="selectText">Select B</p>
                <input
                  className="compareInput"
                  value={searchTerm2 || inputValue2}
                  onChange={handleInputChange2}
                  onClick={() => setOpenInput(2)}
                  placeholder="Search or select a coin"
                />
                <div className="arrowIcon__section">
                  {openInput === 2 ? (
                    <SVG src={ArrowUp} className="arrowIcon" />
                  ) : (
                    <SVG src={ArrowDown} className="arrowIcon" />
                  )}
                </div>
                {openInput === 2 && (
                  <div className="optionsSection">
                    {filterCoins2.length > 0 ? (
                      filterCoins2.map((coin) => (
                        <button
                          className="optionCoin"
                          key={coin.id}
                          onClick={() => handleSelectCoin2(coin)}
                        >
                          <img
                            className="optCoinImg"
                            src={coin.image}
                            alt={coin.name}
                          />
                          {coin.name} ({coin.symbol})
                        </button>
                      ))
                    ) : (
                      <div className="noResults">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {hypotheticalPrice !== null && (
              <div className="comparisonResult">
                <p>
                  <span style={{ fontWeight: "700" }}>
                    {selectedCoin1?.name}{" "}
                  </span>
                  price with the market cap of
                  <span style={{ fontWeight: "700" }}>
                    {" "}
                    {selectedCoin2?.name}
                  </span>
                  :
                </p>
                <p className="resultFormula">
                  <strong>${hypotheticalPrice.toFixed(2)}</strong>
                  {ratio.toFixed(2) >= 1 ? (
                    <span style={{ color: "var(--blue)" }}>
                      {""}({ratio.toFixed(2)})x
                    </span>
                  ) : (
                    <span style={{ color: "var(--orange)" }}>
                      {""}({ratio.toFixed(2)})x
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}