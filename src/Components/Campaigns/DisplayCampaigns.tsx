import React from 'react';
import { Card, List, Image, Modal } from 'antd';
import {get_youtube_thumbnail} from '../Utils/Util';
import ReactPlayer from 'react-player';
import CreateComment from '../Comments/CreateComment'

interface CampaignProps {
   data: Data[]
}

interface Data {
   title: string,
   description: string,
   videoURL: string,
   softCap: number,
   endDate: string,
   id: number
}

class DisplayCampaignsCards extends React.Component<CampaignProps>  {
   state = {
      visible: false,
      row: {title: '', description: '', videoURL: '', softCap: 0, endDate: '', id: 0}
   }

   render() {
      return (
         <div>
            <List
               grid={{
                  gutter: 5,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
               }}
               dataSource={this.props.data}
               renderItem={item => (
                  <List.Item>
                     <Card title={item.title} hoverable={true} onClick={() => this.setState({ visible: true, row: item })} style={{ overflow: "hidden", borderRadius: '15px'  }}>
                        <Image preview={false} src={get_youtube_thumbnail(item.videoURL)} />
                        <p>SoftCap: ${item.softCap}</p>
                        <p>End Date: {item.endDate}</p>
                     </Card>
                     <Modal
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        title={this.state.row.title}
                        centered
                        visible={this.state.visible}
                        onOk={() => this.setState({ visible: false })}
                        onCancel={() => this.setState({ visible: false })}
                        width={1000}
                        
                     >
                        <div><ReactPlayer url={this.state.row.videoURL} /></div>
                        <br/>
                        <p>Description: {this.state.row.description}</p>
                        <p>SoftCap: ${this.state.row.softCap}</p>
                        <p>End Date: {this.state.row.endDate}</p>
                        <br/>
                        <CreateComment pageID={this.state.row.id} />
                     </Modal>
                  </List.Item>
               )}
            />
         </div>
      )
   }
}

export default DisplayCampaignsCards;