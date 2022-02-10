import { Select } from "@chakra-ui/react";
import useSWR from "swr";
import { useState } from "react";
import { useReportContext } from "../context/ReportsContext";

interface SelectorProps {
  selector: string;
}

const Selector = (props: SelectorProps) => {
  const { getProjectId, getProjectName, getGatewayId, getGatewayName } =
    useReportContext();
  const selector = props.selector;

  const { data, error } = useSWR(
    `http://178.63.13.157:8090/mock-api/api/${selector}s`
  );

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [id, name] = JSON.parse(event.target.value);

    if (selector === "project") {
      getProjectId(id);
      getProjectName(name);
    } else {
      getGatewayId(id);
      getGatewayName(name);
    }
  };

  if (!data) return <Select placeholder="Loading..." />;
  if (error) return <Select placeholder="Failed to load" />;

  return (
    <Select onChange={selectChange} placeholder={`All ${selector}s`}>
      {data.data.map((el: any, i: any) => (
        <option
          key={i}
          value={
            selector === "project"
              ? JSON.stringify([el.projectId, el.name])
              : JSON.stringify([el.gatewayId, el.name])
          }
        >
          {el.name}
        </option>
      ))}
    </Select>
  );
};

export default Selector;
