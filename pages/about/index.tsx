import Layout from '@utils/components/Layout'
import { PageContainer } from '@utils/components/PageWrapper'
import { GetServerSideProps } from 'next'
import React from 'react'
import styled from 'styled-components'

const AboutContainer = styled(PageContainer)`
  .red {
    color: red;
  }
`

export default function About() {
  return (
    <Layout title="Ve chung toi">
      <AboutContainer>
        <h1 className="red"> ff</h1>
      </AboutContainer>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}
