import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '@utils/components/Layout'
import { formatVND } from '@utils/helper'
import useCartContext from '@utils/hooks/useCartContext'
import { getProduct } from '@utils/services/product'
import { IProduct } from '@utils/types/product'
import { GetServerSideProps } from 'next'
import { Button, Container } from 'react-bootstrap'
import { AddToCart } from 'store/actions'

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
    quantity,
    price,
    category,
    author,
    description,
  } = product.attributes

  const { dispatch } = useCartContext()

  const handleAddToCart = () => {
    dispatch(AddToCart(product, 1))
  }

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

              <h5 className="my-3" style={{ color: 'red' }}>
                {formatVND(price)}
              </h5>

              <div className="row ">
                <div className="col-6">
                  <b>Số lượng:</b> {quantity}{' '}
                </div>
                <div className="col-2">
                  {rating}{' '}
                  <FontAwesomeIcon icon={faStar} color="orange" size="xs" />
                </div>
              </div>

              <div className="mt-3">
                <b className="mt-3">Thông tin sách: </b>
              </div>

              <div className="row">
                <div className="col-6">Thể loại: {category}</div>{' '}
                <div className="col">Tác giả: {author}</div>{' '}
              </div>
              <div className="mt-3">
                <b className="mt-3">Mô tả: </b>
              </div>
              <div className="mt-2 text-justify">{description} </div>

              <div className="mt-3 d-flex ">
                <Button variant="success" onClick={handleAddToCart}>
                  <FontAwesomeIcon icon={faCartPlus} size="xs" /> Thêm vào giỏ
                  hàng
                </Button>
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
