import { Button } from "@chakra-ui/button";
import { useReportContext } from "../context/ReportsContext";

const CreateReportButton = () => {
  const { from, to, projectId, gatewayId, getReports } = useReportContext();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    from,
    to,
    projectId,
    gatewayId,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return (
    <Button
      minW="fit-content"
      onClick={async () => {
        await fetch(
          "http://178.63.13.157:8090/mock-api/api/report",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => getReports(result.data))
          .catch((error) => console.log("error", error));
      }}
    >
      Create Report
    </Button>
  );
};

export default CreateReportButton;
