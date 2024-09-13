import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import TitleCard from '../../../components/Cards/TitleCard';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function DoughnutChart() {
  const statistics = useSelector((state) => state.dashboard.stats);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          }
        },
        bodyFont: {
          size: 14,
          weight: 'bold'
        },
        titleFont: {
          size: 14,
          weight: 'bold'
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 14,
          weight: 'bold'
        },
        formatter: (value, context) => {
          return value;
        }
      }
    }
  };

  const {
    emptyRoomTotal,
    beEmptyRoomTotal,
    depositedRoomTotal,
    roomRentedTotal
  } = statistics;

  const data = {
    datasets: [
      {
        data: [1200, 1000, 2122, 700 ,922,636,700,300],
        backgroundColor: [
          '#0ad2ff',
          '#ff0059',
          '#2962ff',
          '#9500ff',
          '#ff8c00',
          '#b4e600',
          '#0fffdb',
          '#f20089',

          
        ],
        borderColor: [
         '#0ad2ff',
          '#ff0059',
          '#2962ff',
          '#9500ff',
          '#ff8c00',
          '#b4e600',
          '#0fffdb',
          '#f20089',
        ],
        borderWidth: 1,
      }
    ],
  };

  return (
    <TitleCard topMargin="mt-0" title={"Tổng quan chi phí "}>
      <Doughnut options={options} data={data} />
    </TitleCard>
  )
}

export default DoughnutChart;
