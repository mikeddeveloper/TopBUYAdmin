export function Sparkline({
  data,
  width = 140,
  height = 40,
  stroke = "#ffffff",
  fill,
}: {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - 4) - 2]);
  const linePoints = points.map(([x, y]) => `${x},${y}`).join(" ");
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      {fill && <polygon points={areaPoints} fill={fill} />}
      <polyline
        points={linePoints}
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r={3} fill={stroke} />
    </svg>
  );
}
