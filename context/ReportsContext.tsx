import { createContext, useContext, ReactNode, useState } from "react";

interface reportContextType {
  from?: string;
  getFrom?: any;
  to?: string;
  getTo?: any;

  projectId?: string;
  getProjectId?: any;
  projectName?: string;
  getProjectName?: any;

  gatewayId?: string;
  getGatewayId?: any;
  gatewayName?: string;
  getGatewayName?: any;

  reports?: Array<{
    projectId?: string;
    gatewayId?: string;
    [key: string]: any;
  }>;
  getReports?: any;
}

const reportContextDefaultValues: reportContextType = {
  from: "",
  to: "",
  projectId: "",
  projectName: "",
  gatewayId: "",
  gatewayName: "",
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
  const [projectName, setProjectName] = useState<string>("");
  const [gatewayId, setGatewayId] = useState<string>("");
  const [gatewayName, setGatewayName] = useState<string>("");
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

  const getGatewayName = (name: string) => {
    setGatewayName(name);
  };

  const getProjectId = (id: string) => {
    setProjectId(id);
  };

  const getProjectName = (name: string) => {
    setProjectName(name);
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
    projectName,
    getProjectName,
    gatewayId,
    getGatewayId,
    gatewayName,
    getGatewayName,
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
