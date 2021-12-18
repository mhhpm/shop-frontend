import { Container } from 'react-bootstrap'
import styled from 'styled-components'

export const PageContainer = styled(Container)`
  padding: 28px 24px;

  @media screen and (max-width: 425px) {
    padding: 16px 12px;
  }
`
