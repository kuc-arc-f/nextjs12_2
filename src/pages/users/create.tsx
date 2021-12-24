import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'
import { gql } from "@apollo/client";
import client from '../../apollo-client'

import Layout from '../../components/layout'
//
interface IState {
  name: string,
  mail: string,
  password: string, 
  _token: string,
}
interface IProps {
  csrf: any,
  flash: any,
  count: number,
}
export default class UserCreate extends Component<IProps, IState> {
  static async getInitialProps(ctx) {
    const data = await client.query({
      query: gql`
      query {
        userCount
      }
      ` ,
      fetchPolicy: "network-only"
    });
//console.log(data.data.userCount);     
    return { 
      user_id :cookies(ctx).user_id,
      csrf: "",
      count: data.data.userCount,
    }
  }  
  constructor(props){
    super(props)
    this.state = {
      name: '',
      mail: '',
      password: '',
      _token: '',
    };
    this.handleChange = this.handleChange.bind(this);    
    this.handleClick = this.handleClick.bind(this);
console.log(this.props.count)
  }
  async componentDidMount(){
    if(Number(this.props.count) > 0){
      flash.set({ messages_error: 'Error, admin user max 1' })
      Router.push('/login');
    }else{
      const data = await client.query({
        query: gql`
        query {
          getToken
        }      
        `,
        fetchPolicy: "network-only"
      });
//console.log(data.data.getToken);      
      this.setState({ _token: data.data.getToken });
    }     
  }   
  handleClick(){
    this.addItem()
  } 
  async addItem(){
    try {
      const mail = this.state.mail;
      const password = this.state.password;
      const name = this.state.name;
      const result = await client.mutate({
        mutation: gql`
        mutation {
          addUser(token: "${this.state._token}",
          name: "${name}", email: "${mail}", password: "${password}"){
            id
          }          
        }                 
        `
      })
      console.log(result);
      Router.push('/login');
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
    if(event.target.name ==='name' ){
      this.setState({name: value });
  }
  if(event.target.name ==='password' ){
      this.setState({password: value });
    }    
  }   
  render() {
console.log(this.state);
    return (
    <Layout>
      <div className="container">
        <hr className="mt-2 mb-2" />
        <h1>User - Create</h1>
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
              <label>Name:</label>
              <input name="name" type="text" className="form-control"
              value={this.state.name}
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
          <button className="btn btn-primary" onClick={this.handleClick}>Save
          </button>
        </div>
      </div>
    </Layout>
    )    
  } 
}