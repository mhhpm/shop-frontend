import {
  faCartPlus,
  faMoneyBill,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '@utils/components/Layout'
import { formatVND } from '@utils/helper'
import { getProduct } from '@utils/services/product'
import { IProduct } from '@utils/types/product'
import { GetServerSideProps } from 'next'
import { Container } from 'react-bootstrap'

function ProductDetail({
  product,
  notFound,
}: {
  product: IProduct
  notFound: boolean
}) {
  if (notFound) {
    return (
      <Layout title="Book Shop | Chi tiết sản phẩm">
        <div className="text-center mt-5">"Không tìm thấy sản phẩm"</div>
      </Layout>
    )
  }
  const {
    image,
    name,
    rating,
    weight,
    quantity,
    price,
    category,
    author,
    description,
    status,
  } = product.attributes

  return (
    <Layout title="Book Shop | Chi tiết sản phẩm">
      <section className="pb-5">
        <Container className="px-4 px-lg-5 mt-5">
          <div className="row">
            <div className="col">
              <img width={500} height={500} src={image} alt="Product image" />
            </div>
            <div className="col">
              <h2>{name}</h2>

              <div className="row d-flex  justify-content-between">
                <div className="col-2">
                  {rating}{' '}
                  <FontAwesomeIcon icon={faStar} color="orange" size="xs" />
                </div>

                <div className="col-3">
                  <b>Weight:</b> {weight}{' '}
                </div>
                <div className="col">
                  <b>Quantity:</b> {quantity}{' '}
                </div>
              </div>

              <h5 className="mt-3" style={{ color: 'red' }}>
                {formatVND(price)}
              </h5>

              <div className="mt-3">
                <b className="mt-3">Product Detail: </b>
              </div>

              <div className="row">
                <div className="col-3"> Category: {category}</div>{' '}
                <div className="col">Author: {author}</div>{' '}
              </div>
              <div className="mt-2">Description: {description} </div>

              <div className="mt-3 d-flex ">
                <a
                  href="#"
                  className="btn btn-success mr-auto"
                  role="button"
                  aria-disabled="true"
                >
                  <FontAwesomeIcon icon={faCartPlus} size="xs" /> Add To Card
                </a>
                <div>&nbsp;</div>
                <a
                  href="#"
                  className=" btn  btn-primary"
                  role="button"
                  aria-disabled="true"
                >
                  <FontAwesomeIcon icon={faMoneyBill} size="xs" /> Buy Now
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const product = await getProduct(params?.id as string)
    if (product) {
      return {
        props: { product },
      }
    }
  } catch (error) {}

  return {
    props: { notFound: true },
  }
}

export default ProductDetail
