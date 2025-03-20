"use client";
import { useEffect, useRef } from "react";

const TradingViewChart = ({ ticker }: { ticker: string }) => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current && !container.current.innerHTML && ticker) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": `${ticker}`,
        "width": "100%",
        "height": 400,
        "interval": "D",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": true
      });
      container.current.appendChild(script);
    }
  }, [ticker]);

  return <div ref={container} />;
};

export default TradingViewChart;