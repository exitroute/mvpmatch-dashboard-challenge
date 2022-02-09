import { Button, Flex, Select } from "@chakra-ui/react";
import CreateReportButton from "./CreateReportButton";
import Selector from "./Selector";
import useSWR from "swr";
import { useState } from "react";

const ReportsMenu = () => {
  return (
    <Flex justifyContent="space-between">
      <div>Report Info</div>
      <Flex>
        <Selector selector="project" />
        <Selector selector="gateway" />
        <div>Date Picker From</div>
        <div>Date Picker To</div>
        <CreateReportButton />
      </Flex>
    </Flex>
  );
};

export default ReportsMenu;
