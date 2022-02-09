import { Flex } from "@chakra-ui/layout";

const ReportsMenu = () => {
  return (
    <Flex justifyContent="space-between">
      <div>Report Info</div>
      <Flex>
        <div>Select Project</div>
        <div>Select Gateway</div>
        <div>Date Picker From</div>
        <div>Date Picker To</div>
        <button>Create report</button>
      </Flex>
    </Flex>
  );
};

export default ReportsMenu;
