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
}

const reportContextDefaultValues: reportContextType = {
  from: "",
  to: "",
  projectId: "",
  gatewayId: "",
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

  const getFrom = (date: any) => {
    setFrom(date);
  };

  const getTo = (date: any) => {
    setTo(date);
  };

  const getGatewayId = (id: any) => {
    setGatewayId(id);
  };

  const getProjectId = (id: any) => {
    setProjectId(id);
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
  };

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
}

export function useReportContext() {
  return useContext(ReportsContext);
}
