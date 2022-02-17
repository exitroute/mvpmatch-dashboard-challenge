import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ project, projectIdsAndNames }: any) => {
  /**
   * @param [{projectName: string, amount: number}]
   * @returns [{projectName: string, totalAmountForProject: number}]
   */

  const labelsAndData = project.reduce((acc: any, cur: any, i: any) => {
    let found;
    if (acc.length !== 0) {
      found = acc.find((el: any | undefined) => cur.projectId === el.projectId);
    }
    if (!found) {
      acc.push({ projectId: cur.projectId, amount: cur.amount });
    } else {
      found.amount = found.amount + cur.amount;
    }
    return acc;
  }, []);

  projectIdsAndNames.map((project: any) => {
    return labelsAndData.map((el: any) => {
      if (el.projectId === project.id) {
        el.projectName = project.name;
      }
      return el;
    });
  });

  console.log("labelsAndData", labelsAndData);

  const chartData = {
    labels: labelsAndData.map((el: any) => el.projectName),
    datasets: [
      {
        label: "Project revenue",
        data: labelsAndData.map((el: any) => el.amount),
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

export default Chart;
