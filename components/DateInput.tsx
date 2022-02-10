import { Input } from "@chakra-ui/react";
import { useReportContext } from "../context/ReportsContext";

interface DateInputProp {
  dateParam: string;
}

const DateInput = (props: DateInputProp) => {
  const dateParam = props.dateParam;
  const { getTo, getFrom } = useReportContext();

  const changeHandler = (e: any, param: string) => {
    param === "to" ? getTo(e.target.value) : getFrom(e.target.value);
  };

  return <Input type="date" onChange={(e) => changeHandler(e, dateParam)} />;
};

export default DateInput;
