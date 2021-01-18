import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const URL = "http://localhost:4000/"

interface TokenProps {
   sessionToken: string
}

class CreateCampaign extends React.Component <TokenProps> {

   state = {
      visible: false,
      title: '',
      description: '',
      videoURL: '',
      endDate: '',
      softCap: 0
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

   handleSubmit = (e: React.MouseEvent) => {
      e.preventDefault();
      fetch(URL + "createcampaign", {
         method: 'POST',
         body: JSON.stringify({ title: this.state.title, description: this.state.description, endDate: this.state.endDate, softCap: this.state.softCap, videoURL: this.state.videoURL}),
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken
         })
      }).then((response) => response.json()
      ).then((data) => {
         console.log(data.userID);
      })
      this.setState({
         visible: false,
      });
      console.log(this.state.title, this.state.description, this.state.endDate, this.state.softCap, this.state.videoURL )
   };

   render() {
      return (
         <>
            <Button type="primary" onClick={this.showDrawer} style={{ float: 'right' }}>
               <PlusOutlined /> Create a Campaign
            </Button>
            <Drawer
               title="Create a new campaign"
               width={720}
               onClose={this.onClose}
               visible={this.state.visible}
               bodyStyle={{ paddingBottom: 80 }}
            >
               <Form layout="vertical" hideRequiredMark>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="title"
                           label="Title"
                           rules={[{ required: true, message: 'Please enter a title' }]}
                        >
                           <Input placeholder="Please enter the campaign title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item
                           name="url"
                           label="YouTube Campaign Video Link"
                           rules={[
                              { required: true, message: 'Please enter a YouTube url' },
                              { type: 'url', message: 'This is not a valid URL' }
                           ]}
                        >
                           <Input placeholder="Please enter YouTube url" value={this.state.videoURL} onChange={(e) => this.setState({ videoURL: e.target.value })} />
                        </Form.Item>
                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="softCap"
                           label="Soft Cap"
                           rules={[
                              { required: true, message: 'Please enter a soft cap' },
                              { type: 'number', min: 5000, max: 1000000, message: 'Value must be a number between $5,000 and $1,000,000' },
                           ]}
                        >
                           <InputNumber placeholder="$" value={this.state.softCap} onChange={(e) => this.setState({ softCap: e })} />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item
                           name="endDate"
                           label="End Date"
                           rules={[{ required: true, message: 'Please choose an end date' }]}
                        >
                           <DatePicker onChange={(e, dateString) => this.setState({ endDate: dateString })} />
                        </Form.Item>
                     </Col>
                  </Row>
                  <Row gutter={16}>
                     <Col span={24}>
                        <Form.Item
                           name="description"
                           label="Description"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter a campaing description',
                              },
                           ]}
                        >
                           <Input.TextArea rows={4} placeholder="Please enter a campaign description" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
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

export default CreateCampaign;