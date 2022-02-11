import { Box, Text } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import { useReportContext } from "../context/ReportsContext";
import { useAppContext } from "../context/AppContext";
import { report } from "process";

const ReportsDisplay = () => {
  const { reports, from, to, projectId, projectName, gatewayId, gatewayName } =
    useReportContext();

  const { projectData, gatewayData } = useAppContext();

  const projectIds = projectData.map((el: any) => el.projectId);

  const reportsByProject = projectIds.map((el) => {
    return reports?.filter((report) => report.projectId === el);
  });

  console.log(reportsByProject);

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
              <AccordionButton>
                <Text fontSize="large">Project {i + 1}</Text>
              </AccordionButton>
            ) : null}
            <AccordionPanel>
              <Table variant="striped" colorScheme="gray">
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
                          <Td>{report.gatewayId}</Td>
                          <Td>{report.paymentId}</Td>
                          <Td>{report.amount}</Td>
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

const ProjectAccordion = () => {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Project 1
            </Box>
            <Box>Total: 14,000</Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}></AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
