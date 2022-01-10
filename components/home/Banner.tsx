import Link from 'next/link'
import { Button, Carousel, Container } from 'react-bootstrap'

const Banner = () => {
  return (
    <Carousel interval={2000} pause={false}>
      <Carousel.Item>
        <section className="bg-dark py-5">
          <Container className="px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">Love Book</h1>
              <div className="hero-banner__content">
                <h2>Browse Our Premium Product</h2>
                <Link href="/products" passHref>
                  <Button variant="dark">Browse Now</Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </Carousel.Item>
      <Carousel.Item>
        <section className="bg-dark py-5">
          <Container className="px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">Book is Fun</h1>
              <div className="hero-banner__content">
                <h2>Browse Our Premium Product</h2>
                <Link href="/products" passHref>
                  <Button variant="dark">Browse Now</Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </Carousel.Item>
    </Carousel>
  )
}

export default Banner
