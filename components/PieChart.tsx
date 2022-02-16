import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ project }: any) => {
  /**
   * @param [{gatewayName: string, amount: number}]
   * @returns [{gatewayName: string, totalAmountForGateway: number}]
   */

  const gatewayNamesAndTotals = project.reduce((acc: any, cur: any, i: any) => {
    let found;
    if (acc.length !== 0) {
      found = acc.find(
        (el: any | undefined) => cur.gatewayName === el.gatewayName
      );
    }
    if (!found) {
      acc.push({ gatewayName: cur.gatewayName, amount: cur.amount });
    } else {
      found.amount = found.amount + cur.amount;
    }
    return acc;
  }, []);

  const chartData = {
    labels: gatewayNamesAndTotals.map((el: any) => el.gatewayName),
    datasets: [
      {
        label: "Project revenue",
        data: gatewayNamesAndTotals.map((el: any) => el.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Doughnut data={chartData} />
    </>
  );
};

export default PieChart;
