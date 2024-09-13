import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import { useSelector } from 'react-redux';
import BtnFillterChart from '../../../components/button/BtnFillterChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const barChartData = useSelector((state) => state.dashboard.barChartData) || [];

  // Kiểm tra nếu barChartData trống và cung cấp dữ liệu mặc định
  const hasData = Array.isArray(barChartData) && barChartData.length > 0;

  const defaultData = [
    { month: 1, depositTotal: 0, contractTotal: 0 },
    { month: 2, depositTotal: 0, contractTotal: 0 },
    { month: 3, depositTotal: 0, contractTotal: 0 },
    { month: 4, depositTotal: 0, contractTotal: 0 },
    { month: 5, depositTotal: 0, contractTotal: 0 },
    { month: 6, depositTotal: 0, contractTotal: 0 },
    { month: 7, depositTotal: 0, contractTotal: 0 },
    { month: 8, depositTotal: 0, contractTotal: 0 },
    { month: 9, depositTotal: 0, contractTotal: 0 },
    { month: 10, depositTotal: 0, contractTotal: 0 },
    { month: 11, depositTotal: 0, contractTotal: 0 },
    { month: 12, depositTotal: 0, contractTotal: 0 },
  ];

  const chartData = hasData ? barChartData : defaultData;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        beginAtZero: true,
        type: 'linear',
        title: {
          display: true,
          text: 'Triệu VND',
          font: {
            size: 14,
            // weight: 'bold',
          },
        },
        ticks: {
          color: 'black',
          font: {
            size: 14, // Kích thước chữ của các nhãn trục y
            // weight: 'bold'
          }
        },
        grid: {
          display: false
        },
      }
    }
  };

  const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const data = {

    datasets: [
      {
        label: 'Dự kiến',
        data: [19, 43, 23, 100, 15, 20, 40, 10, 19, 43, 23, 100],
        backgroundColor: '#E4003A',
        borderRadius: 1,
      },
      {
        label: 'Đã nhận',
        data: [15, 20, 40, 10, 15, 20, 40, 12, 15, 20, 40, 10, 15, 20, 40, 100],
        backgroundColor: '#1E429F',
        borderRadius: 1
      },

    ],
    labels,
  };


  return (
    // <TitleCard title={"Tổng quan "}>

    <Bar options={options} data={data} />
    // </TitleCard>

  )
}


export default BarChart