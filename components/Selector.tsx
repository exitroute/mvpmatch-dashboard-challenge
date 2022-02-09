import { Select } from "@chakra-ui/react";
import useSWR from "swr";
import { useState } from "react";
import { useReportContext } from "../context/ReportsContext";

interface SelectorProps {
  selector: string;
}

const Selector = (props: SelectorProps) => {
  const { getProjectId, getGatewayId } = useReportContext();
  const selector = props.selector;

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    selector === "project" ? getProjectId(value) : getGatewayId(value);
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
