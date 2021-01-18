import React from 'react';
// import { RouteComponentProps } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import { Layout, Menu } from 'antd';
import { HomeOutlined, PlayCircleOutlined, SoundOutlined, DollarCircleOutlined, DoubleLeftOutlined, DoubleRightOutlined, CrownOutlined } from '@ant-design/icons';
import Logo1 from './assets/logo-v1.png';
import Logo2 from './assets/logo-v4.png';
import LoginSignup from './Components/Auth/LoginSignup';
// import CreateCampaign from './Components/Campaigns/CreateCampaign';
import AdminContent from './Components/Content/adminContent';
import CampaignContent from './Components/Content/campaignContent';

const {
  Header, Content, Footer, Sider,
} = Layout;

// type tokenProps = {
//   updateToken: string
// }

// interface SelectProps {
//   onSelect: (item: string, key: number) => void
// }

class App extends React.Component {
  state = {
    collapsed: false,
    sessionToken: '',
    isAdmin: false,
    menuState: 2
  };

  componentDidMount = () => {
    let isAdmin = localStorage.getItem('userType')
    if (isAdmin)
      this.setState({
        isAdmin: true
      })
    if (localStorage.getItem('token')) {
      this.setState({ sessionToken: localStorage.getItem('token') })
      console.log(localStorage.getItem('token'));
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: newToken });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onLogout = () => {
    this.setState({
      sessionToken: null,
    });
  };

  setAdmin = (userType: string) => {
    if (userType === 'admin') {
      this.setState({
        isAdmin: true,
      });
    } else {
      this.setState({
        isAdmin: false,
      });
    }
  };

  onSelect = (item: string, key: number) => {
    console.log(item, key)
  }

  render() {
    return (
      <Router>
      <Layout style={{ minHeight: '100vh',  }} >
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img src={this.state.collapsed ? Logo2 : Logo1} alt="logo1" style={{ width: this.state.collapsed ? "65px" : "185px", height: '50px' }} />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <Menu.Item key="1" icon={<HomeOutlined style={{ fontSize: '20px' }} />} style={{ fontSize: '16px' }} >
              <a href="https://artbot.tv">Home</a>
            </Menu.Item>
            <Menu.Item key="2" icon={<DollarCircleOutlined style={{ fontSize: '20px' }} />} style={{ fontSize: '16px' }} >
              <Link to={'/crowdfunding'}> Crowdfunding </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<PlayCircleOutlined style={{ fontSize: '20px' }} />} style={{ fontSize: '16px' }} >
            <a href="https://artbot.tv/video">Video</a>
            </Menu.Item>
            <Menu.Item key="4" icon={<SoundOutlined style={{ fontSize: '20px' }} />} style={{ fontSize: '16px' }} >
            <a href="https://artbot.tv/audio">Audio</a>
            </Menu.Item>
            {this.state.isAdmin ?
              <Menu.Item key="5" icon={<CrownOutlined style={{ fontSize: '20px' }} />} style={{ fontSize: '16px' }} >
                <Link to={'/admin'}> Admin </Link>
              </Menu.Item> : null}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header  className="site-layout-background" style={{ padding: 0, backgroundColor: '#323232' }}>
            {React.createElement(this.state.collapsed ? DoubleRightOutlined : DoubleLeftOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <LoginSignup sessionToken={this.state.sessionToken} updateToken={this.updateToken} onLogout={this.onLogout} setAdmin={this.setAdmin} {...this.props} />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '0px',
              padding: 24,
              minHeight: 280,
              backgroundColor: '#1a1a1a'
            }}
          >
            <Switch>
              <Route exact path="/crowdfunding" component={CampaignContent} />
              <Route exact path="/admin" component={AdminContent} />
            </Switch>

          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
      </Router>
    );
  }
}

export default App;

// #components-layout-demo-side .logo {
//   height: 32px;
//   background: rgba(255,255,255,.2);
//   margin: 16px;
// }