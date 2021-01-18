import React from 'react';
import CreateCampaign from '../Campaigns/CreateCampaign'
import DisplayCampaignsCards from '../Campaigns/DisplayCampaigns';

const URL = "http://localhost:4000/campaigns"

// interface CampaignProps {
//    data: Data[]
// }

// interface Data {
//    title: string,
//    description: string,
//    videoURL: string,
//    softCap: number,
//    endDate: string,
//    sessionToken: string,
//    key: string
// }

class CampaignContent extends React.Component {
   state = {
      data: [],
      // title: '',
      // description: '',
      // videoURL: '',
      // softCap: 0,
      // endDate: '',
      sessionToken: ''
   };

   componentDidMount = () => {
      this.getData()
   }

   getData = () => {
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

   createCampaign = () => {
      let getToken = localStorage.getItem('token')
      console.log(getToken)
      if (getToken) return(true)
      return(false)
   }

   render() {
      return (
         <div>
            <div>
               {this.createCampaign() ? <div><CreateCampaign sessionToken={this.state.sessionToken} /> <br /><br /></div> : null }
            </div>
            <div>
               {this.state.data.length > 0 ? <DisplayCampaignsCards data={this.state.data} /> : null}
            </div>
         </div>
      )
   }
}

export default CampaignContent;