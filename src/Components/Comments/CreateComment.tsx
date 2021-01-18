import React from 'react';
import { Form, Button, List, Input } from 'antd';
import moment from 'moment';

const URL = "http://localhost:4000/"

interface TokenProps {
   pageID: number,
   // commentMap: [userID: number, commentText: string]
}

class CreateCampaign extends React.Component<TokenProps> {

   state = {
      commentText: '',
      pageID: 0,
      sessionToken: '',
      commentMap: [{userID: 0, commentText: ''}]
   };

   componentDidMount = () => {
      this.getToken()
      this.getComments()
   }

   getToken = async () => {
      let sessionToken = await localStorage.getItem('token')
      this.setState({ sessionToken: sessionToken })
   }

   getComments = () => {
      fetch(URL + "getsomecomments/" + this.props.pageID, {
         method: 'GET',
         headers: new Headers({
            'Content-Type': 'application/json',
         })
      }).then((response) => response.json()
      ).then((data) => {
         console.log(data);
         this.setState({
            commentMap: data
         })
      })
      console.log(this.state.commentText)
   }

   handleSubmit = (e: React.MouseEvent) => {
      e.preventDefault();
      console.log(this.state.sessionToken)
      fetch(URL + "createcomment/" + this.props.pageID, {
         method: 'POST',
         body: JSON.stringify({ commentText: this.state.commentText }),
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.state.sessionToken
         })
      }).then((response) => response.json()
      ).then((data) => {
         console.log(data.userID);
         this.getComments()
      })
      console.log(this.state.commentText)
   };

   render() {
      return (
         <>
            <Form.Item>
               <Input.TextArea rows={4} placeholder="Enter comment text here" onChange={(e) => this.setState({ commentText: e.target.value })} value={this.state.commentText} />
            </Form.Item>
            <Form.Item>
               <Button htmlType="submit" onClick={this.handleSubmit} type="primary">
                  Add Comment
                  </Button>
            </Form.Item>
            <br />
            <List
               itemLayout="horizontal"
               dataSource={this.state.commentMap}
               renderItem={item => (
                  <List.Item>
                     <List.Item.Meta
                        title={"User ID: " + item.userID}
                        description={item.commentText}
                     />
                  </List.Item>
               )}
            />,
         </>
      );
   }
}

export default CreateCampaign;