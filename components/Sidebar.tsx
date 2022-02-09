import { Box } from "@chakra-ui/react";

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
    <Box maxW="100px">
      <ul>
        {linkItems.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </Box>
  );
};
