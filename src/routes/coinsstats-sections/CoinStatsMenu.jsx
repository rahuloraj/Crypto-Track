import { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import CompareCoinsMenu from "../../components/CompareCoinsMenu.jsx";
import FavoriteCoinsMenu from "../../components/FavoriteCoinsMenu.jsx";
import Compare from "./../../assets/icon-compare.svg";
import Moon from "./../../assets/icon-moon.svg";
import Sun from "./../../assets/icon-sun.svg";
import Star from "./../../assets/star.svg";
import "./../../css/coinsstats-css/CoinStatsMenu.css";

export default function CoinStatsMenu({
  coins,
  favoriteCoins,
  setFavoriteCoins,
  theme,
  setTheme,
}) {
  const [menuState, setMenuState] = useState({
    compare: false,
    favorite: false,
  });

  const openMenu = (menu) => {
    setMenuState((prev) => ({ ...prev, [menu]: true }));
  };

  const closeMenu = (menu) => {
    setMenuState((prev) => ({ ...prev, [menu]: false }));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="menusBtnSection">
      <button className="favoriteMenuBtn" onClick={() => openMenu("favorite")}>
        <SVG className="menuIcon" src={Star} />
        <p className="favoriteMenuBtnTitle">Portfolio</p>
      </button>
      <button className="compareMenuBtn" onClick={() => openMenu("compare")}>
        <SVG className="menuIcon" src={Compare} />
        <p className="favoriteMenuBtnTitle">Compare</p>
      </button>
      <button className="darkModeBtn" onClick={toggleTheme}>
        {theme === "light" ? (
          <>
            <SVG className="menuIcon" src={Moon} />
          </>
        ) : (
          <>
            <SVG className="menuIcon" src={Sun} />
          </>
        )}
        <p className="favoriteMenuBtnTitle">
          {theme === "light" ? "Dark" : "Light"} Mode
        </p>
      </button>
      {menuState.favorite && (
        <FavoriteCoinsMenu
          close={() => closeMenu("favorite")}
          favoriteCoins={favoriteCoins}
          setFavoriteCoins={setFavoriteCoins}
        />
      )}
      {menuState.compare && (
        <CompareCoinsMenu coins={coins} close={() => closeMenu("compare")} />
      )}
    </div>
  );
}
