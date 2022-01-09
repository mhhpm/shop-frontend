import Banner from '@components/home/Banner'
import Product from '@components/products/Product'
import Layout from '@utils/components/Layout'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
const ImgSrc1 =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo2ivkG_JkakIfI1GQL1BfZlQvOQlk5Tr1bA&usqp=CAU'

export default function Home() {
  return (
    <Layout title="About Us">
      <section className="bg-dark py-5">
        <div className="px-4 px-lg-5 my-5 container">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">VỀ CHÚNG TÔI</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              THƯƠNG HIỆU BÁN SÁCH SỐ 1 ĐƯỜNG NGUYỄN VĂN CỪ
            </p>
          </div>
        </div>
      </section>

      <section className="hero-banner">
        <div className="container">
          <div className="row no-gutters align-items-center pt-60px">
            <div className="col-5 d-none d-sm-block">
              <div className="hero-banner__img">
                <Image
                  className="card-img-top"
                  loader={() => ImgSrc1}
                  src={'image'}
                  alt="..."
                  width={450}
                  height={300}
                />
              </div>
            </div>
            <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
              <div className="hero-banner__content">
                <h4
                  color="#222"
                  className="styles__Paragraph-sc-1esu60e-3 hXOQNH"
                >
                  Giới thiệu về Nhóm 9
                </h4>
                <p> Nhóm 9 môn Mô hình hóa phần mềm </p>
                <p> Thành viên:</p>
                <p> 18120354 - Lê Anh Hào - Trưởng nhóm</p>

                <p> 18120365 - Nguyễn Quang Hiệp - Thành viên</p>

                <p> 1612261 - Đoàn Minh Huy - Thành viên</p>

                <p> 18120385 - Bùi Trọng Hoàng - Thành viên</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Container>
        <div className="hero-banner__content">
          <section className="pb-5">
            <div
              data-brick-level="widget"
              data-brick-id="236871"
              data-brick-label="TEXT: Giới thiệu nhóm 9 - Header"
              data-brick-type="TEXT"
              data-brick-index="0"
              className="WidgetsRenderer__ViewWrapper-sc-kjna85-0 cXIDOr"
            >
              <div
                title="Giới thiệu Nhóm 9 - Header"
                className="styles__TextViewContainer-sc-1esu60e-0 dSKBNp"
              >
                <div className="styles__TextViewInner-sc-1esu60e-1 qtty">
                  <h2
                    color="#222"
                    className="styles__Heading-sc-1esu60e-2 ihFbAw"
                  >
                    Shop is fun
                  </h2>
                </div>
              </div>
            </div>

            <div
              data-brick-level="widget"
              data-brick-id="236872"
              data-brick-label="TEXT: Giới thiệu Nhóm 9 - Content"
              data-brick-type="TEXT"
              data-brick-index="1"
              className="WidgetsRenderer__ViewWrapper-sc-kjna85-0 cXIDOr"
            >
              <div
                title="Giới thiệu Nhóm 9 - Content"
                className="styles__TextViewContainer-sc-1esu60e-0 dSKBNp"
              >
                <div className="styles__TextViewInner-sc-1esu60e-1 qtty">
                  <p
                    color="#111"
                    className="styles__Paragraph-sc-1esu60e-3 hXOQNH"
                  >
                    Với phương châm hoạt động “Tất cả vì Khách Hàng”, Nhóm 9
                    luôn không ngừng nỗ lực nâng cao chất lượng dịch vụ và sản
                    phẩm, từ đó mang đến trải nghiệm mua sắm trọn vẹn cho Khách
                    Hàng Việt Nam Nhóm 9 lọt Top 1 nơi làm việc tốt nhất Việt
                    Nam trong ngành Internet/E-commerce 2018 (Anphabe bình
                    chọn), Top 50 nơi làm việc tốt nhất châu Á 2019 (HR Asia
                    bình chọn).
                  </p>
                </div>
              </div>
            </div>
            <div className="address-info">
              <p className="small-text">
                Địa chỉ văn phòng: 01 Nguyễn Văn Cừ, Quận 5, thành phố Hồ Chí
                Minh
              </p>
              <p className="small-text">
                Nhóm 9 nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ
                trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử
                lý đơn hàng
              </p>
              <p className="small-text">
                Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch
                và Đầu tư Thành phố Hồ Chí Minh cấp ngày 06/01/2010
              </p>
              <p className="small-text">© 2021 - Bản quyền của Nhóm 9</p>
            </div>
          </section>
        </div>
      </Container>
    </Layout>
  )
}
