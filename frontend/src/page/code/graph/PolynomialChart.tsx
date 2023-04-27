import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

type PolynomialChartProps = {
  title?: string;
  xMin?: number;
  xMax?: number;
};

const PolynomialChart = ({ title = 'O(N^2)', xMin =1, xMax = 65 }: PolynomialChartProps) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        const xValues = [];
        const yValues = [];
        for (let x = xMin; x <= xMax; x *=2) {
          xValues.push(x);
          yValues.push(x ** 2);
        }
        new Chart(ctx, {
          
          type: 'line',
          data: {
            labels: xValues,
            datasets: [{
              //label: 'y = x^2',
              data: yValues,
              pointBackgroundColor: "#A6CEE3",
              fill: false,
              // 그래프 선 색
              borderColor: '#A6CEE3',
              //borderWidth: 800,
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: title,
                color: "#FFFFFF",
                align: 'start',
                padding: {bottom: 30},
                font:{
                  size: 20,

                }
              },
              legend: {
                display: false,
                }
            },
            scales: {
              x: {
                ticks: {
                  color: '#A3A3A3'
                },
                grid:{
                  color: "#F0F0F0"
                }
              },
              y: {
                max: 5000,
                ticks: {
                  color: '#A3A3A3'
                },
                grid:{
                  color: "#F0F0F0"
                }
              }
            }
          }
        });
      }
    }
  }, [chartContainer, title, xMin, xMax]);

  return (
    <div style={{height:"270px", width: "420px", padding: '1rem', borderRadius: 20, backgroundColor:  "#28292C"}}>
      <canvas ref={chartContainer} style={{
          width: '100%', // Set the width to 100% to fill the container
          height: '100%' // Set the height to 100% to fill the container
        }}></canvas>
    </div>
  );
};

export default PolynomialChart;
