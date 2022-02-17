import { Box, Text, Flex } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";

import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { useReportContext } from "../context/ReportsContext";
import { useAppContext } from "../context/AppContext";
import GatewayDoughnutChart from "./GatewayDoughnutChart";
import ProjectDoughnutChart from "./ProjectDoughnutChart";

const ReportsDisplay = () => {
  const { reports, projectName, gatewayName } = useReportContext();
  const { projectData, gatewayData } = useAppContext();

  const projectIdsAndNames = projectData.map((el: any) => {
    return { id: el.projectId, name: el.name };
  });

  const gatewayIdsAndNames = gatewayData.map((el: any) => {
    return { id: el.gatewayId, name: el.name };
  });

  const reportsByProject = projectIdsAndNames
    // sort and split by project id
    .map((project) => {
      return reports?.filter((report) => report.projectId === project.id);
    })
    // remove empty arrays
    .filter((project) => project?.length)
    // add gateway names
    .map((project) => {
      return (
        project
          ?.map((report) => {
            gatewayIdsAndNames.map((el) => {
              if (el.id === report?.gatewayId) {
                report.gatewayName = el.name;
              }
            });
            return report;
          })
          // sort dates
          .sort(
            (a: any, b: any) =>
              new Date(a.created).getTime() - new Date(b.created).getTime()
          )
          // format dates
          .map((report) => {
            return {
              ...report,
              created: new Date(report.created).toLocaleDateString("en-GB"),
            };
          })
          // sort by gateway
          .sort((a: any, b: any) => {
            const gatewayA = a.gatewayName.slice(-1);
            const gatewayB = b.gatewayName.slice(-1);
            return gatewayA - gatewayB;
          })
      );
    });

  const renderProjectTotal = (arr: any) => {
    return arr
      .reduce(
        (acc: any, cur: any) => parseFloat(acc) + parseFloat(cur.amount),
        0
      )
      .toLocaleString("en-US", { style: "currency", currency: "USD" });
  };

  return (
    <Box>
      <Box p="1rem">
        <Text>
          {`${projectName?.length === 0 ? `All Projects` : projectName} | 
        ${gatewayName?.length === 0 ? `All Gateways` : gatewayName}`}
        </Text>
      </Box>

      {reportsByProject.length === 1 ? (
        <>
          <SingleProjectReport
            gatewayIdsAndNames={gatewayIdsAndNames}
            reportsByProject={reportsByProject}
            renderProjectTotal={renderProjectTotal}
          />
        </>
      ) : (
        <MultipleProjectReports
          reportsByProject={reportsByProject}
          projectIdsAndNames={projectIdsAndNames}
          renderProjectTotal={renderProjectTotal}
        />
      )}
    </Box>
  );
};

export default ReportsDisplay;

const SingleProjectReport = ({
  gatewayIdsAndNames,
  reportsByProject,
  renderProjectTotal,
}: any) => {
  // sort and split by gateway
  const reportsByGateway = gatewayIdsAndNames
    .map((gateway: any) => {
      return reportsByProject.flat().filter((report: any) => {
        return report.gatewayId === gateway.id;
      });
    })
    .filter((el: any) => el?.length);

  return (
    <Flex>
      {reportsByGateway.length === 1 ? (
        <Box width="50%">
          <GatewayTable project={reportsByGateway.flat()} />
          <Box padding="1rem">
            Total: {renderProjectTotal(reportsByGateway)}
          </Box>
        </Box>
      ) : (
        <Flex>
          <MultipleGatewayDisplay
            reportsByGateway={reportsByGateway}
            gatewayIdsAndNames={gatewayIdsAndNames}
            renderProjectTotal={renderProjectTotal}
          />
          <Box width="50%" px="4rem">
            <GatewayDoughnutChart project={reportsByGateway.flat()} />
          </Box>
        </Flex>
      )}
const MultipleProjectReports = ({
  reportsByProject,
  projectIdsAndNames,
  renderProjectTotal,
}: any) => {
  const { gatewayId } = useReportContext();

  const renderProjectTitle = (id: string | undefined) => {
    return projectIdsAndNames.find((el: any) => el.id === id)?.name;
  };

  return (
    <Flex flexGrow="1">
      <Accordion allowToggle flexGrow="1">
        {reportsByProject.map((project: any, i: number) => (
          <AccordionItem key={i}>
            {project && (
              <>
                <AccordionButton justifyContent="space-between">
                  <Text fontSize="large">
                    {renderProjectTitle(project[0].projectId)}
                  </Text>
                  <Text fontSize="large">
                    Total {renderProjectTotal(project)}
                  </Text>
                </AccordionButton>
                <AccordionPanel>
                  <ReportsTable project={project} gatewayId={gatewayId} />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
      <Box
        width="50%"
        px="4rem"
        display={gatewayId?.length !== 0 ? "block" : "none"}
      >
        <ProjectDoughnutChart
          project={reportsByProject.flat()}
          projectIdsAndNames={projectIdsAndNames}
        />
        <Box padding="1rem">
          Gateway Total: {renderProjectTotal(reportsByProject.flat())}
        </Box>
      </Box>
    </Flex>
  );
};

const MultipleGatewayDisplay = ({
  reportsByGateway,
  gatewayIdsAndNames,
  renderProjectTotal,
}: any) => {
  const renderGatewayTitle = (id: string | undefined) => {
    return gatewayIdsAndNames.find((el: any) => el.id === id)?.name;
  };

  return (
    <Accordion allowToggle>
      {reportsByGateway.map((gateway: any, i: number) => (
        <AccordionItem key={i}>
          <AccordionButton justifyContent="space-between">
            <Text fontSize="large">
              {renderGatewayTitle(gateway[0].gatewayId)}
            </Text>
            <Text fontSize="large">Total {renderProjectTotal(gateway)}</Text>
          </AccordionButton>
          <AccordionPanel>
            <GatewayTable project={gateway} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const GatewayTable = ({ project }: any) => {
  console.log("Gateway Table project", project);
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Transaction ID</Th>
          <Th>Amount</Th>
        </Tr>
      </Thead>
      {project && project?.length
        ? project?.map((report: any) => {
            return (
              <Tbody key={report.paymentId}>
                <Tr>
                  <Td>{report.created}</Td>
                  <Td>{report.paymentId}</Td>
                  <Td>
                    {report.amount.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </Td>
                </Tr>
              </Tbody>
            );
          })
        : null}
    </Table>
  );
};

const MultipleProjectReports = ({
  reportsByProject,
  projectIdsAndNames,
  renderProjectTotal,
}: any) => {
  const renderProjectTitle = (id: string | undefined) => {
    return projectIdsAndNames.find((el: any) => el.id === id)?.name;
  };

  return (
    <Flex>
      <Accordion allowToggle>
        {reportsByProject.map((project: any, i: number) => (
          <AccordionItem key={i}>
            {project && (
              <>
                <AccordionButton justifyContent="space-between">
                  <Text fontSize="large">
                    {renderProjectTitle(project[0].projectId)}
                  </Text>
                  <Text fontSize="large">
                    Total {renderProjectTotal(project)}
                  </Text>
                </AccordionButton>
                <AccordionPanel>
                  <ReportsTable project={project} />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
      <Box width="50%" px="4rem">
        <ProjectDoughnutChart
          project={reportsByProject.flat()}
          projectIdsAndNames={projectIdsAndNames}
        />
      </Box>
    </Flex>
  );
};

const ReportsTable = ({ project }: any) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Gateway</Th>
          <Th>Transaction ID</Th>
          <Th>Amount</Th>
        </Tr>
      </Thead>
      {project?.length
        ? project?.map((report: any) => (
            <Tbody key={report.paymentId}>
              <Tr>
                <Td>{report.created}</Td>
                <Td display={gatewayId?.length !== 0 ? "none" : "table-cell"}>
                  {report.gatewayName}
                </Td>
                <Td>{report.paymentId}</Td>
                <Td>
                  {report.amount.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Td>
              </Tr>
            </Tbody>
          ))
        : null}
    </Table>
  );
};
