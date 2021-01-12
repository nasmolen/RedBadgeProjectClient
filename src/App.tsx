import React from 'react';
// import { RouteComponentProps } from 'react-router-dom';
// import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import {Layout, Menu} from 'antd';
import {HomeOutlined, PlayCircleOutlined, SoundOutlined, DollarCircleOutlined, DoubleRightOutlined, DoubleLeftOutlined} from '@ant-design/icons';
import Logo1 from './assets/logo-v1.png';
import Logo2 from './assets/logo-v4.png';
import LoginSignup from './Components/Auth/LoginSignup';

const {
  Header, Content, Footer, Sider,
} = Layout;

// type tokenProps = {
//   updateToken: string
// }

// interface TokenProps {
//   updateToken: (token: string) => void
// }

class App extends React.Component {
  state = {
    collapsed: false,
    sessionToken: ''
  };

  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.setState({sessionToken: localStorage.getItem('token')})
      console.log(localStorage.getItem('token'));
    }
  }
  
  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken});
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{minHeight: '100vh'}} >
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img src={this.state.collapsed ? Logo2 : Logo1} alt="logo1" style={{width: this.state.collapsed ? "65px" : "185px", height: '50px'}} />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined style={{fontSize: '20px'}} />} style={{fontSize: '16px'}} >
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<DollarCircleOutlined style={{fontSize: '20px'}} />} style={{fontSize: '16px'}} >
              Crowdfunding
            </Menu.Item>
            <Menu.Item key="3" icon={<PlayCircleOutlined style={{fontSize: '20px'}} />} style={{fontSize: '16px'}} >
              Video
            </Menu.Item>
            <Menu.Item key="4" icon={<SoundOutlined style={{fontSize: '20px'}} />} style={{fontSize: '16px'}} >
              Audio
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? DoubleRightOutlined : DoubleLeftOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <LoginSignup updateToken={this.updateToken} {...this.props} />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;

// #components-layout-demo-side .logo {
//   height: 32px;
//   background: rgba(255,255,255,.2);
//   margin: 16px;
// }