import { Box, Text } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";

import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { useReportContext } from "../context/ReportsContext";
import { useAppContext } from "../context/AppContext";

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
    // sort by project id
    .map((el) => {
      return reports?.filter((report) => report.projectId === el.id);
    })
    // remove empty arrays
    .filter((project) => project?.length)
    // add gateway names
    .map((project) => {
      return project?.map((report) => {
        gatewayIdsAndNames.map((el) => {
          if (el.id === report?.gatewayId) {
            report.gatewayName = el.name;
          }
        });
        return report;
      });
    });

  const renderProjectTitle = (id: string) => {
    return projectIdsAndNames.find((el) => el.id === id)?.name;
  };

  const renderProjectTotal = (arr: any) => {
    return arr
      .reduce(
        (acc: any, cur: any) => parseFloat(acc) + parseFloat(cur.amount),
        0
      )
      .toLocaleString("de-DE", { style: "currency", currency: "EUR" });
  };

  return (
    <Box>
      <Box>
        <Text>
          {`${projectName?.length === 0 ? `All Projects` : projectName} | 
        ${gatewayName?.length === 0 ? `All Gateways` : gatewayName}`}
        </Text>
      </Box>

      <Accordion allowToggle>
        {reportsByProject.map((project, i) => (
          <AccordionItem key={i}>
            {project?.length ? (
              <AccordionButton justifyContent="space-between">
                <Text fontSize="large">
                  {renderProjectTitle(project[0].projectId)}
                </Text>
                <Text fontSize="large">
                  Total {renderProjectTotal(project)}
                </Text>
              </AccordionButton>
            ) : null}
            <AccordionPanel>
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
                  ? project?.map((report) => (
                      <Tbody key={report.paymentId}>
                        <Tr>
                          <Td>{report.created}</Td>
                          <Td>{report.gatewayName}</Td>
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
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default ReportsDisplay;
