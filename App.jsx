import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./logic/useLocalStorage";
import CoinPage from "./routes/CoinPage";
import CoinsStats from "./routes/CoinsStats.jsx";
import Error from "./components/Error.jsx";
import Footer from "./components/Footer.jsx";
import Title from "./components/Title.jsx";

export default function App() {
   const [theme, setTheme] = useLocalStorage("theme", "dark"); 

  useEffect(() => {
    const timer = console.log.apply(console, [
      "%c Designed and Coded by Laura Głąb",
      "color: white" +
        "; background: padding:5px 0; border-radius: 5px; font-weight: bold; background-color: #df8653;",
    ]);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Router>
        <Title />
        <Routes>
          <Route path="/CoinPage/:id" element={<CoinPage />} />
          <Route path="/" element={<CoinsStats theme={theme} setTheme={setTheme} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}
