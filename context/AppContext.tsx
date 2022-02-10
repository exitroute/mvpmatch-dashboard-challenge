import { createContext, useContext, ReactNode, useState } from "react";

interface AppContextType {
  userData: Array<{}>;
  getUserData?: any;
  projectData: Array<{}>;
  getProjectData?: any;
  gatewayData: Array<{}>;
  getGatewayData?: any;
}

const appContextDefaultValues: AppContextType = {
  userData: [],
  projectData: [],
  gatewayData: [],
};

const AppContext = createContext<AppContextType>(appContextDefaultValues);

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {
  const [userData, setUserData] = useState<Array<{}>>([]);
  const [projectData, setProjectData] = useState<Array<{}>>([]);
  const [gatewayData, setGatewayData] = useState<Array<{}>>([]);

  const getUserData = (data: Array<{}>) => {
    setUserData(data);
  };

  const getProjectData = (data: Array<{}>) => {
    setProjectData(data);
  };

  const getGatewayData = (data: Array<{}>) => {
    setGatewayData(data);
  };

  const value = {
    userData,
    getUserData,
    projectData,
    getProjectData,
    gatewayData,
    getGatewayData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
