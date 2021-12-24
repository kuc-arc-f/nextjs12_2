
import { gql} from '@apollo/client';

const task = {
  get_gql_add : function(title: string){
    return gql`
      mutation {
        addTask(title: "${title}"){
          id
        }
      }            
    `   
  },
  get_gql_update : function(id: number, title: string){
    return gql`
      mutation {
        updateTask(id: ${id}, title: "${title}"){
          id
        }
      }            
    `   
  },
  get_gql_delete: function(id: number){
    return gql`
      mutation {
        deleteTask(id: ${id}){
          id
        }
      }      
    `   
  },    
  get_query_task : function(id: number){
    return gql`
    query {
      task(id: ${id}){
        id
        title
      }            
    }
   `   
  },  
}
export default  task;

