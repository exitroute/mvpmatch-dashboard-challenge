import { Select } from "@chakra-ui/react";
import useSWR from "swr";
import { useState } from "react";

interface SelectorProps {
  selector: string;
}

const Selector = (props: SelectorProps) => {
  const selector = props.selector;

  const [selectedOption, setSelectedOption] = useState<String>();

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const { data, error } = useSWR(
    `http://178.63.13.157:8090/mock-api/api/${selector}s`
  );

  if (!data) return <Select placeholder="Loading..." />;
  if (error) return <Select placeholder="Failed to load" />;

  return (
    <Select onChange={selectChange} placeholder={`All ${selector}s`}>
      {data.data.map((el: any, i: number) => (
        <option
          key={i}
          value={selector === "project" ? el.projectId : el.gatewayId}
        >
          {el.name}
        </option>
      ))}
    </Select>
  );
};

export default Selector;
