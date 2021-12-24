import Head from 'next/head'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="container">
      <h1>Top</h1>
    </div>
    </Layout>
  )
}