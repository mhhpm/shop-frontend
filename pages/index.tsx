import Banner from '@components/home/Banner'
import Product from '@components/products/Product'
import Layout from '@utils/components/Layout'
import { getProductByURL } from '@utils/services/product'
import { IProduct } from '@utils/types/product'
import { GetServerSideProps } from 'next'
import { Col, Container, Row } from 'react-bootstrap'

export default function Home({ products }: { products: IProduct[] }) {
  return (
    <Layout title="Book Shop | Home">
      <section className="hero-banner">
        <Banner />
      </section>

      <section className="pb-5">
        <Container className="px-4 px-lg-5 mt-5">
          <div className="section-intro pb-5">
            <h4>Các sản phẩm bán chạy</h4>
          </div>
          <Row className="g-sm-5 g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products?.map(({ id, attributes }) => (
              <Col key={id}>
                <Product id={id} attributes={attributes} isSale={true} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const data = await getProductByURL(
      '?pagination[page]=1&pagination[pageSize]=4',
    )
    return {
      props: { products: data.data },
    }
  } catch (error) {}
  return {
    props: {},
  }
}
