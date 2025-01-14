import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CoinPageMenu from "./CoinPageMenu.jsx";
import ArrowDownIcon from "./../../assets/icon-arrow-down.svg";
import ArrowRight from "./../../assets/arrow-point-to-right.svg";
import ArrowUpIcon from "./../../assets/icon-arrow-up.svg";
import "./../../css/coinpage-css/CoinPageBtn.css";

export default function CoinPageBtn({name, currency, setCurrency}) {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  }

  return (
    <div className="coinPageBtnSection">
      <div className="coinPageBackBtn__section">
        <Link className="backBtn" to="/">
          <div>Cryptocurrencies</div>
        </Link>
        <img
          className="arrowRightIcon"
          src={ArrowRight}
          alt="arrow right icon"
        />
        <p>{name} Price</p>
      </div>
      <button className="currencyBtn" onClick={handleToggle}>
        {currency}
        {showMenu ? (
          <img
            className="arrowBtn"
            src={ArrowUpIcon}
            aria-label="open side-menu"
            alt="arrowUp icon"
          />
        ) : (
          <img
            className="arrowBtn"
            src={ArrowDownIcon}
            aria-label="close side-menu"
            alt="arrowDown icon"
          />
        )}
        {showMenu && (
          <div className="backgroundBlur">
            <CoinPageMenu setCurrency={setCurrency} />
          </div>
        )}
      </button>
    </div>
  );
}
