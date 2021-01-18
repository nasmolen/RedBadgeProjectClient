import React from 'react';
import { Popconfirm, Table, Space, Button } from 'antd';
import EditComments from './EditComments';
import { stringify } from 'querystring';

const URL = "http://localhost:4000/comments/"

interface FetchTypes {
   selectedRow: {
      pageID: number,
      commentText: string,
      id: number,
   }
}

class AdminComments extends React.Component  {

   state = {
      data: [],
      pagination: {
         current: 1,
         pageSize: 10,
      },
      // loading: false,
      visible: false,
      sessionToken: '',
      selectedRow: {
         pageID: 0,
         commentText: '',
         id: 0,
      },
      columns: [
         {
            title: 'Campaign ID',
            dataIndex: 'pageID',
            key: 'pageID',
            render: (text: string) => <a>{text}</a>,
         },
         {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
         },
         {
            title: 'Comment Text',
            dataIndex: 'commentText',
            key: 'commentText',
         },
         {
            title: 'Date Created',
            key: 'createdAt',
            dataIndex: 'createdAt',
         },
         {
            title: 'Action',
            key: 'action',
            render: (text: {id: number}) => (
               <Space size="middle">
                  <Button onClick={(e: React.MouseEvent) => this.showDrawers(e, text)}>Update ID{text.id}</Button>
                  <Popconfirm title="Are you sure you want to delete this comment？" okText="Yes" cancelText="No">
                     <Button onClick={(e: React.MouseEvent) => this.changeSelectedRow(e, text)} type="primary">
                        Delete
                     </Button>
                  </Popconfirm>
               </Space>
            ),
         },
      ]
   }; 

   showDrawers = (e: React.MouseEvent, text: {}) => {
      console.log(text)
      this.setState({
         visible: true,
         selectedRow: text
      });
   };

   onClose = () => {
      this.setState({
         visible: false,
      });
   };

   changeSelectedRow = (e: React.MouseEvent, text: {id: number}) => {
      fetch(URL + text.id, {
         method: 'DELETE',
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.state.sessionToken
         })
      }).then((response) => { 
         console.log(response)
      })
   }

   componentDidMount = () => {
      if (localStorage.getItem('token')) {
         this.setState({ sessionToken: localStorage.getItem('token') })
         console.log(localStorage.getItem('token'));
      }
      fetch(URL, {
         method: 'GET',
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.state.sessionToken
         })
      })
         .then((res) => res.json())
         .then((data) => {
            this.setState({ data: data })
            console.log(data)
         })
   }

   render() {
      const { data, pagination } = this.state;
      return (
         <React.Fragment>
            <Table
               columns={this.state.columns}
               dataSource={data}
            />
            <EditComments sessionToken={this.state.sessionToken} visible={this.state.visible} selectedRow={this.state.selectedRow} onClose={this.onClose} showDrawers={this.showDrawers} />
         </React.Fragment>
      );
   }
}

export default AdminComments;