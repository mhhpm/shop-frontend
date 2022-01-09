import Banner from '@components/home/Banner'
import Product from '@components/products/Product'
import Layout from '@utils/components/Layout'
import { getProduct } from '@utils/services/product'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Col, Container, Row } from 'react-bootstrap'
const ImgSrc = 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
const ImgSrc2 =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo2ivkG_JkakIfI1GQL1BfZlQvOQlk5Tr1bA&usqp=CAU'
const ImgSrcTony =
  'https://bizweb.dktcdn.net/thumb/1024x1024/100/381/999/products/ca-phe-cung-tony.jpg?v=1590395320940'
const ImgSrcQGKN =
  'https://salt.tikicdn.com/cache/w1200/ts/product/56/1d/e1/c1e7282144fcfaf258a23bc4bf04f47a.jpg'
const ImgSrcLogist =
  'https://salt.tikicdn.com/cache/w1200/ts/product/ef/50/0b/698a3607bf8cd4b7224300bd695484c0.jpg'
const ImgSrcTesla =
  'https://salt.tikicdn.com/cache/400x400/ts/product/f3/81/4e/9c2baf49c9b281a7e4e46169adcb9675.jpg.webp'
const ImgSrcElon =
  'https://salt.tikicdn.com/cache/400x400/ts/product/c9/94/00/aff05741dd084a2d8be80cf1f6fc338c.jpg.webp'

import Image from 'next/image'

export default function Home() {
  return (
    <Layout title="Book Shop | Home">
      <section className="hero-banner">
        <div className="container">
          <div className="row no-gutters align-items-center pt-60px">
            <div className="col-5 d-none d-sm-block">
              <div className="hero-banner__img">
                <Image
                  className="card-img-top"
                  loader={() => ImgSrcElon}
                  src={'image'}
                  alt="..."
                  width={750}
                  height={700}
                />
              </div>
            </div>
            <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
              <div className="hero-banner__content">
                <h4>Shop is fun</h4>
                <h1>Browse Our Premium Product</h1>
                <p>
                  Us which over of signs divide dominion deep fill bring they're
                  meat beho upon own earth without morning over third. Their
                  male dry. They are great appear whose land fly grass.
                </p>
                <a className="button button-hero" href="#">
                  Browse Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-5">
        <Container className="px-4 px-lg-5 mt-5">
          <div className="section-intro pb-60px">
            <p>Popular Item in the market</p>
            <h2>
              Trending <span className="section-intro__style">Product</span>
            </h2>
          </div>
          <Row className="g-sm-5 g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrcLogist}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrcTony}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrcQGKN}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
            <Col>
              <Product
                name="Special Item"
                id="1"
                image={ImgSrcTesla}
                price={18000}
                reviewPoints={5}
                isSale={true}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="blog">
        <div className="container">
          <div className="section-intro pb-60px">
            <p>Popular Item in the market</p>
            <h2>
              Latest <span className="section-intro__style">News</span>
            </h2>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="card card-blog">
                <div className="card-blog__img">
                  <Image
                    className="card-img-top"
                    loader={() => ImgSrcTony}
                    src={'image'}
                    alt="..."
                    width={250}
                    height={200}
                  />
                </div>
                <div className="card-body">
                  <ul className="card-blog__info">
                    <li>
                      <a href="#">By Admin</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-comments-smiley"></i> 2 Comments
                      </a>
                    </li>
                  </ul>
                  <h4 className="card-blog__title">
                    <a href="single-blog.html">
                      The Richland Center Shooping News and weekly shooper
                    </a>
                  </h4>
                  <p>
                    Let one fifth i bring fly to divided face for bearing divide
                    unto seed. Winged divided light Forth.
                  </p>
                  <a className="card-blog__link" href="#">
                    Read More <i className="ti-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="card card-blog">
                <div className="card-blog__img">
                  <Image
                    className="card-img-top"
                    loader={() => ImgSrcTony}
                    src={'image'}
                    alt="..."
                    width={250}
                    height={200}
                  />
                </div>
                <div className="card-body">
                  <ul className="card-blog__info">
                    <li>
                      <a href="#">By Admin</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-comments-smiley"></i> 2 Comments
                      </a>
                    </li>
                  </ul>
                  <h4 className="card-blog__title">
                    <a href="single-blog.html">
                      The Shopping News also offers top-quality printing
                      services
                    </a>
                  </h4>
                  <p>
                    Let one fifth i bring fly to divided face for bearing divide
                    unto seed. Winged divided light Forth.
                  </p>
                  <a className="card-blog__link" href="#">
                    Read More <i className="ti-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="card card-blog">
                <div className="card-blog__img">
                  <Image
                    className="card-img-top"
                    loader={() => ImgSrcTony}
                    src={'image'}
                    alt="..."
                    width={250}
                    height={200}
                  />
                </div>
                <div className="card-body">
                  <ul className="card-blog__info">
                    <li>
                      <a href="#">By Admin</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-comments-smiley"></i> 2 Comments
                      </a>
                    </li>
                  </ul>
                  <h4 className="card-blog__title">
                    <a href="single-blog.html">
                      Professional design staff and efficient equipment you’ll
                      find we offer
                    </a>
                  </h4>
                  <p>
                    Let one fifth i bring fly to divided face for bearing divide
                    unto seed. Winged divided light Forth.
                  </p>
                  <a className="card-blog__link" href="#">
                    Read More <i className="ti-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  console.log('Session', session?.accessToken)
  try {
    const data = await getProduct('1')
  } catch (error) {}
  return {
    props: {},
  }
}
