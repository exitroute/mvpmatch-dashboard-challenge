import { useReportContext } from "../context/ReportsContext";

const ReportsDisplay = () => {
  const { reports } = useReportContext();
  return (
    <div>
      <pre>{JSON.stringify(reports, null, 2)}</pre>
    </div>
  );
};

export default ReportsDisplay;
