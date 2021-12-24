import React, {Component} from 'react';
import { gql } from "@apollo/client";
import client from '../apollo-client'
import Layout from '../components/layout'

//
export default class Test extends Component {
  static async getInitialProps(ctx) {
    return {
      data: [],
    }
  }  
  constructor(props){
    super(props)
console.log(props);
  }
  async componentDidMount(){
    try{
      let now = new Date("2021-12-20T05:14:48.546Z");
console.log(now, typeof now);

      const data = await client.query({
        query: gql`    
        query {
          tasks {
            id
            title
            content
          }
        }              
        `,
        fetchPolicy: "network-only"
      });
console.log(data);
    } catch (e) {
      console.error(e);
    }
  }   
  async clickHandle(){
console.log("#clickHandle");
  }
  render() {
    return (
      <Layout>
        <div className="container">
          <hr className="mt-2 mb-2" />
          <h1>test</h1>
          <hr />
          <button onClick={() =>this.clickHandle() }>Test</button>
        </div>
      </Layout>
    )    
  } 
}
