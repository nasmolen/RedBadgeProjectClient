import React from 'react';
import { Menu, Button } from 'antd';
import {HomeOutlined, PlayCircleOutlined, SoundOutlined, DollarCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';

class Sidebar extends React.Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }} icon={this.state.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} />        
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
            <span><HomeOutlined /></span>
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span><DollarCircleOutlined /></span>
            <span>Crowdfunding</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span><PlayCircleOutlined /></span>
            <span>Video</span>
          </Menu.Item>
          <Menu.Item key="4">
            <span><SoundOutlined /></span>
            <span>Audio</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Sidebar;