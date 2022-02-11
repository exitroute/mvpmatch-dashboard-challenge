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
  const { data: projects, error: fetchProjectDataError } = useSWR(
    () => `${url}/projects`
  );
  const { data: gateways, error: fetchGatewayDataError } = useSWR(
    () => `${url}/gateways`
  );

  if (fetchUserDataError) console.error(fetchUserDataError);
  if (fetchProjectDataError) console.error(fetchProjectDataError);
  if (fetchGatewayDataError) console.error(fetchGatewayDataError);

  if (!users || !projects || !gateways) return <div>loading...</div>;

  getUserData(users.data);
  getProjectData(projects.data);
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
