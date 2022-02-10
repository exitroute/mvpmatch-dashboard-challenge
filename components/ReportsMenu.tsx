import { Flex } from "@chakra-ui/react";
import CreateReportButton from "./CreateReportButton";
import Selector from "./Selector";
import DateInput from "./DateInput";

const ReportsMenu = () => {
  return (
    <Flex justifyContent="space-between" minH="50px">
      <div>Report Info</div>
      <Flex>
        <Selector selector="project" />
        <Selector selector="gateway" />
        <DateInput dateParam="from" />
        <DateInput dateParam="to" />
        <CreateReportButton />
      </Flex>
    </Flex>
  );
};

export default ReportsMenu;
