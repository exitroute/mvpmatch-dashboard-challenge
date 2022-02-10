import { Select } from "@chakra-ui/react";
import { useReportContext } from "../context/ReportsContext";
import { useAppContext } from "../context/AppContext";

interface SelectorProps {
  selector: string;
}

const Selector = (props: SelectorProps) => {
  const selector = props.selector;

  const { projectData, gatewayData } = useAppContext();

  const data = selector === "project" ? projectData : gatewayData;

  const { getProjectId, getProjectName, getGatewayId, getGatewayName } =
    useReportContext();

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

  return (
    <Select onChange={selectChange}>
      <option
        value={JSON.stringify(["", ""])}
        selected
      >{`All ${selector}s`}</option>
      {data.map((el: any, i: any) => (
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
