import Banner from '@components/home/Banner'
import Product from '@components/products/Product'
import Layout from '@utils/components/Layout'
import { useSession, signOut } from 'next-auth/react'
import { Col, Container, Row } from 'react-bootstrap'
const ImgSrc = 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
const ImgSrc2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo2ivkG_JkakIfI1GQL1BfZlQvOQlk5Tr1bA&usqp=CAU'
import Image from 'next/image'

export default function Home() {
  return (
    <Layout title="Book Shop | Home">
      <Banner />
      <section className="pb-5">
        <Container className="px-4 px-lg-5 mt-5">
          <Row className="g-sm-5 g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrc}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrc}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrc}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrc}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="hero-banner">
      <div className="container">
        <div className="row no-gutters align-items-center pt-60px">
          <div className="col-5 d-none d-sm-block">
            <div className="hero-banner__img">

              <Image
              className="card-img-top"
              loader={() => ImgSrc2}
              src={'image'}
              alt="..."
              width={450}
              height={300}
            />
            </div>
          </div>
          <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
            <div className="hero-banner__content">
              <h4>Shop is fun</h4>
              <h1>Browse Our Premium Product</h1>
              <p>Us which over of signs divide dominion deep fill bring they're meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.</p>
              <a className="button button-hero" href="#">Browse Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Layout>
  )
}
