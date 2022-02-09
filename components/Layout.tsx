import { Header } from "./Header";
import { SideBar } from "./Sidebar";
import { Footer } from "./Footer";
import { Box, Flex } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" justify="space-between" h="100vh">
      <Header />
      <Flex flex="1">
        <SideBar />
        <main>{children}</main>
      </Flex>
      <Footer />
    </Flex>
  );
}
