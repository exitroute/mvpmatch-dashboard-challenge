import { Box, Flex } from "@chakra-ui/layout";
import useSWR from "swr";

export const Header = () => {
  return (
    <Box as="header" h="100px">
      <Flex justifyContent={"space-between"}>
        <Flex>
          <Box>Company Logo</Box>
          <Box>Other Logo</Box>
        </Flex>
        <Profile />
      </Flex>
    </Box>
  );
};

const Profile = () => {
  const { data, error } = useSWR(
    "http://178.63.13.157:8090/mock-api/api/users"
  );

  if (!data) return <Box>Loading...</Box>;
  if (error) return <Box>Failed to load</Box>;

  return (
    <>
      {data.data.map((el: any, i: number) => (
        <Box key={i}>
          {el.firstName} {el.lastName}
        </Box>
      ))}
    </>
  );
};
