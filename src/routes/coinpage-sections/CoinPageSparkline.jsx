import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import "./../../css/coinpage-css/CoinPageSparkline.css";

export default function CoinPageSparkline({ day, name, sparkline }) {
  const chartData = sparkline.map((price, index) => ({
    x: index,
    y: price,
  }));

  console.log(sparkline);

  const isPriceUp = sparkline[sparkline.length - 1] > sparkline[0];
  const lineColor = isPriceUp ? "#5353e4" : "#df8653";

  const customTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { y } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{`Price: $${y.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  const groupDataByDay = (data) => {
    const days = [];
    for (let i = 0; i < data.length; i += 24) {
      const dailyData = data.slice(i, i + 24); 
      const averagePrice =
        dailyData.reduce((acc, point) => acc + point.y, 0) / dailyData.length;
      days.push({
        x: i / 24, 
        y: averagePrice,
      });
    }
    return days;
  };

  const dailyData = groupDataByDay(chartData);

  return (
    <div className="coinPageSparklineSection">
      <div className="sparklineTitle">
        <h4>{name} Price Chart (7d)</h4>
        <p>Chart only for USD price.</p>
      </div>
      <div style={{ height: "250px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              ticks={[0, 1, 2, 3, 4, 5, 6]}
              tickFormatter={(tick) => `Day ${tick + 1}`}
            />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip content={customTooltip} />
            <Line
              type="monotone"
              dataKey="y"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
