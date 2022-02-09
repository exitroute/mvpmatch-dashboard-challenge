import { Button } from "@chakra-ui/button";

const CreateReportButton = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    from: "2020-01-01",
    to: "2022-20-08",
    projectId: "bgYhx",
    gatewayId: "i6ssp",
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return (
    <Button
      onClick={async () => {
        const reportReq = await fetch(
          "http://178.63.13.157:8090/mock-api/api/report",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      }}
    >
      Create Report
    </Button>
  );
};

export default CreateReportButton;
