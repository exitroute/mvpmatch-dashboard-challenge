import { createContext, useContext, ReactNode, useState } from "react";

interface reportContextType {
  from?: string;
  getFrom?: any;
  to?: string;
  getTo?: any;
  projectId?: string;
  getProjectId?: any;
  gatewayId?: string;
  getGatewayId?: any;
  reports?: any[];
  getReports?: any;
}

const reportContextDefaultValues: reportContextType = {
  from: "",
  to: "",
  projectId: "",
  gatewayId: "",
  reports: [],
};

const ReportsContext = createContext<reportContextType>(
  reportContextDefaultValues
);

interface Props {
  children: ReactNode;
}

export function ReportsProvider({ children }: Props) {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [gatewayId, setGatewayId] = useState<string>("");
  const [reports, setReports] = useState<Array<{}>>([]);

  const getFrom = (date: string) => {
    setFrom(date);
  };

  const getTo = (date: string) => {
    setTo(date);
  };

  const getGatewayId = (id: string) => {
    setGatewayId(id);
  };

  const getProjectId = (id: string) => {
    setProjectId(id);
  };

  const getReports = (reports: Array<{}>) => {
    setReports(reports);
  };

  const value = {
    from,
    getFrom,
    to,
    getTo,
    projectId,
    getProjectId,
    gatewayId,
    getGatewayId,
    reports,
    getReports,
  };

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
}

export function useReportContext() {
  return useContext(ReportsContext);
}
