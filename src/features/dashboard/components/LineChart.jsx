import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart(){
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
      },
    },scales: {
      x: {
        beginAtZero: true,
        type: 'category',
        title: {
          display: true,
          text: 'Tháng',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          color: 'black',
          font: {
            size: 14, // Kích thước chữ của các nhãn trục y
            weight: 'bold'
          }
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        type: 'linear',
        title: {
          display: true,
          text: 'Số tiền',
          font: {
            size: 14,
            weight: 'bold',
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
          color: 'rgba(0, 0, 0, 0.1)',
        },
      }
    }
  };

  
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = chartData.map(item => `Tháng ${item.month}`);
  const data = {
  labels,
  datasets: [
    {
      // fill: true,
      fill: false,
      label: 'Tổng số tiền hợp đồng cọc ',
      data: chartData.map(item => item.totalDepositAmount),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      //  backgroundColor: "rgba(75,192,192,0.2)",
      // borderColor: "rgba(75,192,192,1)"
    },
    {
      fill: false,
      label: 'Tổng số tiền hợp đồng thuê ',
      data: chartData.map(item =>  item.totalContractAmount ),
      borderColor: "rgb(255, 99, 132)",
      // backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    
  ],
};
  

    return(
      <TitleCard title={"Doanh thu"}>
          <Line data={data} options={options}/>
      </TitleCard>
    )
}


export default LineChart