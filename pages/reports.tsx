import type { NextPage } from "next";
import { ReportsProvider } from "../context/ReportsContext";
import { useAppContext } from "../context/AppContext";
import Layout from "../components/Layout";
import ReportsMenu from "../components/ReportsMenu";
import ReportsDisplay from "../components/ReportsDisplay";
import useSWR from "swr";

const Reports: NextPage = () => {
  const { getUserData, getProjectData, getGatewayData } = useAppContext();

  const url = `http://178.63.13.157:8090/mock-api/api`;

  const { data: users, error: fetchUserDataError } = useSWR(`${url}/users`);
  if (fetchUserDataError) console.error(fetchUserDataError);
  getUserData(users.data);

  const { data: projects, error: fetchProjectDataError } = useSWR(
    `${url}/projects`
  );
  if (fetchProjectDataError) console.error(fetchProjectDataError);
  getProjectData(projects.data);

  const { data: gateways, error: fetchGatewayDataError } = useSWR(
    `${url}/gateways`
  );
  if (fetchGatewayDataError) console.error(fetchGatewayDataError);
  getGatewayData(gateways.data);

  return (
    <ReportsProvider>
      <Layout>
        <ReportsMenu />
        <ReportsDisplay />
      </Layout>
    </ReportsProvider>
  );
};

export default Reports;
