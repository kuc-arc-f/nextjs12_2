
import { gql} from '@apollo/client';

const user = {
  get_gql_add : function(name: string, email: string, password: string){
    return gql`
      mutation {
        addUser(name: "${name}", email: "${email}", password: "${password}"){
          id
        }
      }                 
    `   
  },
  get_query_valid : function(email: string, password: string){
    return gql`
    query {
      userValid(email: "${email}", password: "${password}") {
        id
      }
    }    
   `   
  },  
  get_query_user : function(id: number){
    return gql`
    query {
      user(id: ${id}){
        id
        name
      }            
    }
   `   
  },  
}
export default user;

