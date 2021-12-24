import React from 'react'
import Link from 'next/link';
import Router from 'next/router'
import cookies from 'next-cookies'
import flash from 'next-flash';
import { gql } from "@apollo/client";
import client from '../apollo-client'

import Layout from '../components/layout'
import FlashBox from '../components/FlashBox'
import LibCookie from '../client/lib/LibCookie'

interface IProps {
  csrf: any,
  flash: any,
}
interface IState {
  mail: string,
  password: string, 
  _token: string,
}
//
class Page extends React.Component<IProps, IState> {
  static async getInitialProps(ctx) {
    return {
      flash: flash.get(ctx)|| {},
      csrf: "",
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      mail: '', password: '', _token : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
// console.log(this.props)
  }
  async componentDidMount(){
    const data = await client.query({
      query: gql`
      query {
        getToken
      }      
      `,
      fetchPolicy: "network-only"
    });
console.log(data.data.getToken);
    this.setState({_token: data.data.getToken});
  }
  handleClick(){
    this.postItem()
  }
  async postItem(){
    try {
      const item = {
        mail: this.state.mail,
        password: this.state.password,
      }
console.log(item);
      const key = process.env.COOKIE_KEY_USER_ID;
      const data = await client.query({
        query: gql`
        query {
          userValid(token: "${this.state._token}",
          email: "${this.state.mail}", password: "${this.state.password}") {
            id
          }
        }        
        `,
        fetchPolicy: "network-only"
      });
console.log(data);
      if(data.data.userValid !== null){
        const uid = data.data.userValid.id;
        console.log("uid=", uid);
        LibCookie.set_cookie(key, uid);
        alert("Success, login");
        location.href = '/';
      }else{
        alert("Error, login");
      }
    } catch (error) {
      console.error(error);
      alert("Error , save");
    }    
  }  
  handleChange(event) {
//    console.log(event.target.name )
    const value = event.target.value;
    if(event.target.name ==='mail' ){
        this.setState({mail: value });
    }
    if(event.target.name ==='password' ){
      this.setState({password: value });
    }    
  }
  render() {
console.log(this.state);
    const messages_success = this.props.flash.messages_success;
    return (
    <Layout>
      <FlashBox messages_success={messages_success} messages_error="" />
      { this.props.flash.messages_error ? 
      <div className="alert alert-danger" role="alert">{this.props.flash.messages_error}</div> 
      : <div /> }
      <div className="container">
        <h1>Login</h1>
        <hr />
        <div className="col-sm-6">
          <div className="form-group">
              <label>mail:</label>
              <input name="mail" type="text" className="form-control"
              value={this.state.mail}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
              <label>password:</label>
              <input name="password" type="password" className="form-control"
              value={this.state.password}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="form-group mt-2">
          <button className="btn btn-primary" onClick={this.handleClick}>Login
          </button>
        </div>
        <hr /> 
        <Link href="/users/create">
          <a className="btn btn-outline-primary">Signup</a>
        </Link>                 
      </div>
    </Layout>
    );
  }
}
export default Page
