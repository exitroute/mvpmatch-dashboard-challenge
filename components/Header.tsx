import { Box, Flex } from "@chakra-ui/layout";

export const Header = () => {
  return (
    <Box h="100px">
      <Flex justifyContent={"space-between"}>
        <Flex>
          <Box>Company Logo</Box>
          <Box>Other Logo</Box>
        </Flex>
        <Box>User Id</Box>
      </Flex>
    </Box>
  );
};
