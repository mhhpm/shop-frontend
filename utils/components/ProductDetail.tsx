import { faBullseye, faCartPlus, faCoffee, faMoneyBill, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProductDetailPage({
  id,
  name,
  price,
  weight,
  rating,
  quantity,
  status,
  author,
  description,
  category,
  image,
}) {
  return (
    <div class="row">
      <div class="col">
        <img width={500} height={500} src={image} alt="Product image" />
      </div>
      '
      <div class="col">
        <h1>{name}</h1>

        <div class="row d-flex  justify-content-between">
          <div class="col-2">
            {rating} <FontAwesomeIcon icon={faStar} color="orange" size="xs" />
          </div>

          <div class="col-3">
            <b>Weight:</b> {weight}{' '}
          </div>
          <div class="col">
            <b>Quantity:</b> {quantity}{' '}
          </div>
        </div>

        <h5 class="mt-3" style={{ color: 'red' }}>
          {price} VND
        </h5>
        <div>Status: {status}</div>
      
          <div class="mt-3">
            
            <b class="mt-3">Product Detail: </b>
          </div>

          <div class="row">
            {' '}
            <div class="col-3"> Category: {category}</div>{' '}
            <div class="col">Author: {author}</div>{' '}
          </div>
         <div class="mt-2">Description: {description} </div> 
        

        <div class="mt-3 d-flex ">
            
<a href='#'  class="btn btn-success mr-auto" role="button" aria-disabled="true"><FontAwesomeIcon icon={faCartPlus}  size='xs'/> Add To Card</a>
        <div>&nbsp;</div>
            <a  href='#' class=" btn  btn-primary" role="button" aria-disabled="true"><FontAwesomeIcon icon={faMoneyBill}  size='xs'/> Buy Now</a>
        </div>
      </div>
    </div>
  )
}
export default ProductDetailPage
