import { Header } from "./Header";
import { SideBar } from "./Sidebar";
import { Footer } from "./Footer";
import { Box, Flex } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex
      direction="column"
      justify="space-between"
      h="100vh"
      maxW="1200px"
      mx="auto"
    >
      <Header />
      <Flex flex="1">
        <SideBar />
        <Box as="main" flex="1">
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}
