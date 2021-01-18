import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const URL = "http://localhost:4000/comments/"

interface FetchProps {
   sessionToken: string
   onClose: () => void
   showDrawers: (e: React.MouseEvent, text: {}) => void
   visible: boolean
   selectedRow: {
      pageID: number,
      commentText: string,
      id: number
   }
}

// type FetchState = {
//    visible: boolean,
//    title: string,
//    description: string,
//    videoURL: string,
//    endDate: string,
//    id: number,
//    softCap: number
// }

class EditComments extends React.Component<FetchProps> {
   
      state = {
      id: this.props.selectedRow.id,
      pageID: this.props.selectedRow.pageID,
      commentText: this.props.selectedRow.commentText
      };
   

   handleSubmit = (e: React.MouseEvent) => {
      e.preventDefault();
      console.log(this.props.sessionToken)
      fetch(URL + this.props.selectedRow.id, {
         method: 'PUT',
         body: JSON.stringify({ commentText: this.state.commentText }),
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken
         })
      }).then((response) => { })
      // .then((data) => {
      // console.log(data.userID);})
      this.setState({
         visible: false,
      });
   };

   render() {
      return (
         <>
            <Drawer
               title="Create a new campaign"
               width={720}
               onClose={this.props.onClose}
               visible={this.props.visible}
               bodyStyle={{ paddingBottom: 80 }}
            >
               <Form layout="vertical" hideRequiredMark>
                  <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="commentText"
                           label="Comment"
                           rules={[{ required: true, message: 'Please enter new comment' }]}
                        >
                           <Input placeholder={this.state.commentText} value={this.state.commentText} onChange={(e) => this.setState({ commentText: e.target.value })} />
                        </Form.Item>
                     </Col>
                  </Row>
                  <div
                     style={{
                        textAlign: 'right',
                     }}
                  >
                     <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
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

export default EditComments;