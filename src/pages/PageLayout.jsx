import React from "react";
import Sidebar from "../components/Sidebar";
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
  return (
    <Layout style={{ minHeight: '100vh', }}>
      <Sidebar/>
        <Content>
          <Header style={headerStyle}></Header>
          <main style={{paddingLeft: "35px"}}>{children}</main>
        </Content>
    </Layout>
  );
};

export default PageLayout;
