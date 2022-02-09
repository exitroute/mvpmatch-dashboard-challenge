import type { NextPage } from "next";
import Layout from "../components/Layout";
import ReportsMenu from "../components/ReportsMenu";
import ReportsDisplay from "../components/ReportsDisplay";

const Reports: NextPage = () => {
  return (
    <Layout>
      <ReportsMenu />
      <ReportsDisplay />
    </Layout>
  );
};

export default Reports;
