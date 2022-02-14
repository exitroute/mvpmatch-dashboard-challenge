import { Box, List, ListItem } from "@chakra-ui/react";

interface LinkItemProps {
  name: string;
}

const linkItems: Array<LinkItemProps> = [
  { name: "Histogram" },
  { name: "Spaces" },
  { name: "Presentation" },
  { name: "Pie Chart" },
  { name: "Logout" },
];

export const SideBar = () => {
  return (
    <Box maxW="200px" p="3rem">
      <List listStyleType="none">
        {linkItems.map((item, i) => (
          <ListItem py="1rem" key={i}>
            {item.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
