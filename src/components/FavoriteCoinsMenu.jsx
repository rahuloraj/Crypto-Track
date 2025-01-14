import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg"; 
import Close from "./../assets/icon-close.svg"; 
import ThreeDots from "./../assets/icon-threeDots.svg"; 
import "./../css/components-css/FavoriteCoinsMenu.css";

export default function FavoriteCoinsMenu({ close, favoriteCoins, setFavoriteCoins }) {
  const [isOpen, setIsOpen ] = useState(null);

  useEffect(() => {
    let handler = (e) => {
      if (!e.target.closest(".favMenu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen]);

  const toggleMenu = (coinId) => {
    setIsOpen((prev) => (prev === coinId ? null : coinId)); 
  };

  const deleteFavCoin = (favCoinId) => {
    setFavoriteCoins(
      favoriteCoins.filter((favCoin) => favCoin.coinId !== favCoinId)
    );
  };

  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="window portfolio"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <div className="closeIcon__section">
            <SVG className="closeIcon" src={Close} onClick={close} />
          </div>
          {favoriteCoins.length === 0 ? (
            <div className="portfolioNone">
              <p>Start by selecting your favorite coins to view them here.</p>
            </div>
          ) : (
            <ul className="portfolioList">
              {favoriteCoins.map((favoriteCoin) => {
                return (
                  <li className="favCoin">
                    <div className="favCoinDetails">
                      <p>{favoriteCoin.marketCapRank}</p>
                      <img
                        className="favImg"
                        src={favoriteCoin.icon}
                        alt={`${favoriteCoin.coinName} icon`}
                      />
                      <p className="favName">{favoriteCoin.coinName}</p>
                    </div>
                    <div className="favCoinStats">
                      <p className="favPrice">${favoriteCoin.price}</p>
                      <SVG
                        className="threeDotsIcon"
                        src={ThreeDots}
                        onClick={() => toggleMenu(favoriteCoin.coinId)}
                      />
                      {isOpen === favoriteCoin.coinId && (
                        <AnimatePresence>
                          <motion.div
                            key="modal"
                            className="favMenu"
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: { opacity: 1, y: 0 },
                            }}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              className="favLinkBtn"
                              to={`/CoinPage/${favoriteCoin.coinId}`}
                            >
                              More Info
                            </Link>
                            <hr className="favHr"/>
                            <button
                              className="favDeleteBtn"
                              onClick={() => deleteFavCoin(favoriteCoin.coinId)}
                            >
                              Delete coin
                            </button>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
