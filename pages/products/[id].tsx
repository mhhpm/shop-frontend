import  {API} from 'environment'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '@utils/components/Layout'
import Banner from '@components/home/Banner'
import { Col, Container, Row } from 'react-bootstrap'
import ProductDetailPage from '@utils/components/ProductDetail'



function ProductDetail({ datas }) {
  return (
    <Layout title="Book Shop | Home">
      <section className="pb-5">
        <Container className="px-4 px-lg-5 mt-5">
        <ProductDetailPage image={datas.data.attributes.image} name={datas.data.attributes.name} rating={datas.data.attributes.rating}  weight={datas.data.attributes.weight} quantity={datas.data.attributes.quantity} price={datas.data.attributes.price} description={datas.data.attributes.description} status={datas.data.attributes.status} author={datas.data.attributes.author} id={datas.data.id}/>
        </Container>
      </section>
    </Layout>


    // <div>
    //   <h1>Data fetching</h1>
    //       <ul>
    //         <li>{datas.data.id}</li>
    //         <li>{datas.data.attributes.name}</li>
    //         <li>{datas.data.attributes.price}</li>
    //       </ul>
         
      
    // </div>
  )
}

export async function getStaticProps({params}) {
  const res = await fetch(`${API}/products/${params.id}`)
  const datas = await res.json()

  return {
    props: { datas },
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/products`)
  const datas = await res.json()

  return{
    paths: datas.data.map((item)=> {
      return {
        params: {
          id: item.id.toString()
        }
      }
    }),
    fallback: false
  }
  
}

export default ProductDetail
