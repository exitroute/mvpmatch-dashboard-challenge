import type { NextPage } from "next";
import { ReportsProvider } from "../context/ReportsContext";
import Layout from "../components/Layout";
import ReportsMenu from "../components/ReportsMenu";
import ReportsDisplay from "../components/ReportsDisplay";
import useSWR, { SWRConfig } from "swr";

const Reports: NextPage = () => {
  return (
    <ReportsProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (arg: any, ...args: any) =>
            fetch(arg, ...args).then((res) => res.json()),
        }}
      >
        <Layout>
          <ReportsMenu />
          <ReportsDisplay />
        </Layout>
      </SWRConfig>
    </ReportsProvider>
  );
};

export default Reports;
