import { AnimatePresence, motion } from "framer-motion";
import USD from "./../../assets/flags/united-states.svg";
import EUR from "./../../assets/flags/european-union-europe.svg";
import CNY from "./../../assets/flags/china.svg";
import JPY from "./../../assets/flags/japan.svg";
import GBP from "./../../assets/flags/united-kingdom-uk.svg";
import AUD from "./../../assets/flags/australia.svg";
import CAD from "./../../assets/flags/canada.svg";
import CHF from "./../../assets/flags/switzerland.svg";
import KRW from "./../../assets/flags/south-korea.svg";
import SGD from "./../../assets/flags/singapore.svg";
import ZŁ from "./../../assets/flags/poland.svg";
import "./../../css/coinpage-css/CoinPageMenu.css";

export default function CoinPageMenu({setCurrency}) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          key="modal"
          className="currencyMenu"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <ul>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("USD")}
              >
                <img className="flagIcon" src={USD} alt="US flag icon" />
                USD
              </button>
            </li>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("EUR")}
              >
                <img className="flagIcon" src={EUR} alt="EU flag icon" />
                EUR
              </button>
            </li>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("CNY")}
              >
                <img className="flagIcon" src={CNY} alt="China flag icon" />
                CNY
              </button>
            </li>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("JPY")}
              >
                <img className="flagIcon" src={JPY} alt="Japan flag icon" />
                JPY
              </button>
            </li>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("GBP")}
              >
                <img className="flagIcon" src={GBP} alt="UK flag icon" />
                GBP
              </button>
            </li>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("AUD")}
              >
                <img className="flagIcon" src={AUD} alt="Australia flag icon" />
                AUD
              </button>
            </li>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("CAD")}
              >
                <img className="flagIcon" src={CAD} alt="Canada flag icon" />
                CAD
              </button>
            </li>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("CHF")}
              >
                <img
                  className="flagIcon"
                  src={CHF}
                  alt="Switzerland flag icon"
                />
                CHF
              </button>
            </li>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("KRW")}
              >
                <img
                  className="flagIcon"
                  src={KRW}
                  alt="South Korea flag icon"
                />
                KRW
              </button>
            </li>
            <li>
              <button
                className="currenceBtn"
                onClick={() => setCurrency("SGD")}
              >
                <img className="flagIcon" src={SGD} alt="Singapore flag icon" />
                SGD
              </button>
            </li>
            <li>
              <button className="currenceBtn" onClick={() => setCurrency("PLN")}>
                <img className="flagIcon" src={ZŁ} alt="Poland flag icon" />
                ZŁ
              </button>
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
