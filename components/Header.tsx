import { Box, Flex } from "@chakra-ui/layout";
import { useAppContext } from "../context/AppContext";

export const Header = () => {
  return (
    <Box as="header">
      <Flex justifyContent={"space-between"} minH="100px">
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
  const { userData } = useAppContext();

  if (!userData) return <Box>Loading...</Box>;

  return (
    <>
      {userData.map((el: any, i: number) => (
        <Box key={i}>
          {el.firstName} {el.lastName}
        </Box>
      ))}
    </>
  );
};
