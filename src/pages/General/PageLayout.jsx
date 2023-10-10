import { React, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#F5F5F5',
};

const PageLayout = ({ children }) => {
  const [route, setRoute] = useState();
  const location = useLocation();

  useEffect(() => {
    setRoute(location.pathname);
  }, [location.pathname]);

  if (route !== "/") {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Content>
          <Header style={headerStyle}></Header>
          <main style={{ paddingLeft: "35px" }}>{children}</main>
        </Content>
      </Layout>
    );
  }
  return <main>{children}</main>;
};
export default PageLayout;
