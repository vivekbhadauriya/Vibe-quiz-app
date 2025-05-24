import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface Props {
  vibes: { [vibe: string]: number };
  highlightVibe?: string;
}

const COLORS = [
  '#6366f1', // indigo
  '#f472b6', // pink
  '#60a5fa', // blue
  '#34d399', // green
  '#fbbf24', // yellow
  '#f87171', // red
  '#a78bfa', // purple
  '#38bdf8', // cyan
];

export default function ResultPieBar({ vibes, highlightVibe }: Props) {
  const labels = Object.keys(vibes);
  const dataArr = labels.map((v) => vibes[v]);
  const bgColors = labels.map((v, i) =>
    v === highlightVibe ? '#a21caf' : COLORS[i % COLORS.length]
  );

  const data = {
    labels,
    datasets: [
      {
        data: dataArr,
        backgroundColor: bgColors,
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 16,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                color: '#4b5563',
                font: { size: 16, weight: 'bold' },
                padding: 20,
              },
            },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `${ctx.label}: ${ctx.parsed} (${(
                    (ctx.parsed / dataArr.reduce((a, b) => a + b, 0)) *
                    100
                  ).toFixed(1)}%)`,
              },
            },
          },
          animation: {
            animateRotate: true,
            animateScale: true,
          },
        }}
      />
    </div>
  );
}