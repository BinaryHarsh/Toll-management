import typography from "assets/theme/base/typography";

function configs(labels, datasets) {
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1:{
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: true,
          },
        }
      },
    }
  };
}

export default configs;
