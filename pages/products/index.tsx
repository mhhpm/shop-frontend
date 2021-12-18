import Layout from '@utils/components/Layout'
import { PageContainer } from '@utils/components/PageWrapper'

const ProductsPage = () => {
  return (
    <Layout title="Book Shop | Products" requireLogin={false}>
      <PageContainer fluid>Products page</PageContainer>
    </Layout>
  )
}

export default ProductsPage
