import { Input } from "@chakra-ui/react";
import { useReportContext } from "../context/ReportsContext";

interface DateInputProp {
  dateParam: string;
}

const DateInput = (props: DateInputProp) => {
  const dateParam = props.dateParam;
  const { getTo, to, getFrom, from } = useReportContext();

  const changeHandler = (e: any, param: string) => {
    param === "to" ? getTo(e.target.value) : getFrom(e.target.value);
  };

  return <Input type="date" min={from} max={to} onChange={(e) => changeHandler(e, dateParam)} />;
};

export default DateInput;
