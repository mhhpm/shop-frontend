import { API } from 'environment'
import ReactDOM from 'react-dom'
import Comment from '@utils/components/Comment'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '@utils/components/Layout'
import Banner from '@components/home/Banner'
import { Col, Container, Row } from 'react-bootstrap'
import ProductDetailPage from '@utils/components/ProductDetail'
import { text } from 'stream/consumers'
import React, {useState} from 'react'



function addComment(hoten,noidung){
  
 
ReactDOM.render(<Comment hoten={hoten} noidung={noidung}/>, document.getElementById('con_id'));
}



function ProductDetail({ datas, comment_data }) {
  const [hoten, setHoten] = useState(null)
  const [noidung,setNoidung] = useState(null)
  return (
    <Layout title="Book Shop | Home">
      <section className="pb-5">
        <Container className="px-4 px-lg-5 mt-5">
          <ProductDetailPage
            image={datas.data.attributes.image}
            name={datas.data.attributes.name}
            rating={datas.data.attributes.rating}
            weight={datas.data.attributes.weight}
            quantity={datas.data.attributes.quantity}
            price={datas.data.attributes.price}
            description={datas.data.attributes.description}
            status={datas.data.attributes.status}
            author={datas.data.attributes.author}
            id={datas.data.id}
          />
        </Container>
        <div class="row mt-5">
          <div class="col d-flex justify-content-center ml-5">
            <div class="col-3">
                <div>
                  <h4>Thêm Nhận Xét:</h4>
                </div>
                <div class="input-group mb-3 mt-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      Họ tên
                    </span>
                  </div>
                  <input onChange={(e) => {setHoten(e.target.value)}}
                  id="hoten"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <textarea onChange={(e)=> {setNoidung(e.target.value)}} name="" id="content" cols="30" rows="2" placeholder='Nội dung'></textarea>
            <button type="button" class="btn btn-success" onClick={() => addComment(hoten,noidung) }>Add</button>
              </div>
          </div>
          <div class="col">
            <div class="row">
              
            </div>

            <div>
              <h5 style={{ color: 'Highlight' }}> Nhận Xét:</h5>
            </div>

            <div class="mb-3">
              <div class="px-2" style={{ color: 'orange', fontWeight: 'bold' }}>
                Guest
              </div>
              <div class="px-4"> {comment_data.data.attributes.content}</div>
            </div>

            <div id="con_id"></div>
          </div>
        </div>
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

export async function getStaticProps({ params }) {
  const res = await fetch(`${API}/products/${params.id}`)
  const datas = await res.json()

  const comments = await fetch(`${API}/reviews/${params.id}`)
  const comment_data = await comments.json()

  return {
    props: { datas, comment_data },
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/products`)
  const datas = await res.json()

  return {
    paths: datas.data.map((item) => {
      return {
        params: {
          id: item.id.toString(),
        },
      }
    }),
    fallback: false,
  }
}

export default ProductDetail
