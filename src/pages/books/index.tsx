import {useState, useEffect} from 'react';
import Link from 'next/link';
import { gql } from "@apollo/client";
import client from '@/apollo-client'
import Layout from '@/components/layout'
import IndexRow from './IndexRow';
import cookies from 'next-cookies';
import ReactPaginate from 'react-paginate';
import LibPagenate from '@/lib/LibPagenate';
const perPage = 5;
//
function Index(props) {
console.log(props);
  //state
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  LibPagenate.set_per_page(perPage);
  useEffect(() => {
    (async() => {
      const items = props.items
      const d = LibPagenate.getPageStart(0);
      setItems(items.slice(d.start, d.end));
    })()    
  },[])
  const handlePageClick = (data: any) => {
    console.log('onPageChange', data);
    let selected = data.selected;
    let offset = Math.ceil(selected * perPage);
    const d = LibPagenate.getPageStart(selected);
console.log(d);
    setOffset(offset);
    setItems(props.items.slice(d.start, d.end));
  }
  const currentPage = Math.round(offset / perPage);
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
        <hr />
        <hr />
        <nav aria-label="Page navigation comments" className="mt-4">
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={props.pageCount}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            hrefBuilder={(page, pageCount) =>
              page >= 1 && page <= pageCount ? `/page/${page}` : '#'
            }
            hrefAllControls
            forcePage={currentPage}
            onClick={(clickEvent) => {
              console.log('onClick', clickEvent);
            }}
          />
        </nav>
        <hr className="my-4" />        
        {/*
        <button onClick={() => clikckHandler() }>ttt</button>
        */}
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
//console.log(data.data.books); 
  let items = data.data.books;
  LibPagenate.set_per_page(perPage);
  const n = LibPagenate.getMaxPage(items.length);
console.log(items.length, n);
  const user_id = cookies(ctx).user_id || ''
  return {
    props: {
      items: items, user_id: user_id, pageCount: n 
    } 
  }
}

export default Index
