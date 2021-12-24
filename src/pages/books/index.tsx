import Link from 'next/link';
import { gql } from "@apollo/client";
import client from '@/apollo-client'
import Layout from '@/components/layout'
import IndexRow from './IndexRow';
import cookies from 'next-cookies';
//
function Index(props) {
//console.log(props);
  const items = props.items
  return (
    <Layout>
      <div className="container">
        <Link href="/books/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>  
        <hr className="mt-2 mb-2" />        
        <h3>Books - index</h3>
        <table className="table table-hover">
          <thead>
          <tr>
              <th>Title</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => {
            return (<IndexRow key={index}
                  id={item.id} title={item.title} date="" />       
            )
          })}
          </tbody>
        </table>
      </div>
    </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
  //  console.log("uid=", cookies(ctx).user_id)
  const data = await client.query({
    query: gql`
    query {
      books {
        id
        title
        created_at
      }
    }
    `,
    fetchPolicy: "network-only"
  });
console.log(data.data.books); 
//  const items = data.data.tasks; 
  const user_id = cookies(ctx).user_id || ''
  return {
    props: {
      items: data.data.books, user_id: user_id 
    } 
  }
}

export default Index
