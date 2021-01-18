import React from 'react';
import { Form, Button, List, Input } from 'antd';
import moment from 'moment';

const URL = "http://localhost:4000/"

interface TokenProps {
   pageID: number,
}

class CreateCampaign extends React.Component<TokenProps> {

   state = {
      commentText: '',
      pageID: 0,
      sessionToken: ''
   };

   handleSubmit = (e: React.MouseEvent) => {
      e.preventDefault();
      if (localStorage.getItem('token')) {
         this.setState({ sessionToken: localStorage.getItem('token') })
         console.log(localStorage.getItem('token'));
       }
      fetch(URL + "createcampaign", {
         method: 'POST',
         body: JSON.stringify({ commentText: this.state.commentText }),
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.state.sessionToken
         })
      }).then((response) => response.json()
      ).then((data) => {
         console.log(data.userID);
      })
      this.setState({
         visible: false,
      });
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
         </>
      );
   }
}

export default CreateCampaign;


// export default CommentsComponent;