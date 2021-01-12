import React from "react";
import { Drawer, Form, Button, Col, Row, Input, Radio } from 'antd';
// import { ExclamationOutlined } from "@ant-design/icons";

// const { Option } = Select;

const URL = "http://localhost:4000/"

interface TokenProps {
   updateToken: (token: string) => void
 }

class LoginSignup extends React.Component <TokenProps> {
   state = {
      visible: false,
      isLoggedIn: "login",
      email: "",
      password: ""
   };

   showDrawer = () => {
      this.setState({
         visible: true,
      });
   };

   onClose = () => {
      this.setState({
         visible: false,
      });
   };

   changeLoginSignup = () => {
      this.state.isLoggedIn === "login" ? this.setState({
         isLoggedIn:  "signup",
      }) : this.setState({
         isLoggedIn:  "login",
      })
   }

   handleSubmit = (e: React.MouseEvent) => {
      e.preventDefault(); 
        fetch(URL + this.state.isLoggedIn, {
            method: 'POST',
            body: JSON.stringify({ email: this.state.email, password: this.state.password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.accessToken);
            console.log(data);
        })
      this.setState({
         visible: false,
      });
   };

   render() {
      return (
         <>
            <Button type="primary" onClick={this.showDrawer} style={{ float: 'right', margin: '16px' }}>
               Login/Signup
        </Button>
            <Drawer
               title={
                  <Radio.Group value={this.state.isLoggedIn} style={{ marginLeft: '40%' }} onChange={this.changeLoginSignup} >
                     <Radio.Button value="login">Login</Radio.Button>
                     <Radio.Button value="signup">Signup</Radio.Button>
                  </Radio.Group>}
               width={720}
               onClose={this.onClose}
               visible={this.state.visible}
               bodyStyle={{ paddingBottom: 80 }}
            >
               <Form layout="vertical" hideRequiredMark>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="email"
                           label="Email"
                           rules={[{ required: true, message: 'Please enter user name' }]}
                        >
                           <Input placeholder="Please enter your email" value={this.state.email} onChange={(e) => {this.setState ({email: e.target.value})}} />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item
                           name="password"
                           label="Password"
                           rules={[{ required: true, message: 'Please enter your password' }]}
                        >
                           <Input.Password placeholder="Please enter your password" value={this.state.password} onChange={(e) => {this.setState ({password: e.target.value})}} />
                        </Form.Item>
                     </Col>
         
                  </Row>
                  <div
                     style={{
                        textAlign: 'right',
                     }}
                  >
                     <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                        Cancel
                     </Button>
                     <Button onClick={this.handleSubmit} type="primary">
                        Submit
                     </Button>
                  </div>
               </Form>
            </Drawer>
         </>
      );
   }
}

export default LoginSignup;