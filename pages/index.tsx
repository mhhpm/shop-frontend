import Layout from '@utils/components/Layout'
import { Dropdown, DropdownButton } from 'react-bootstrap'

export default function Home() {
  return (
    <Layout title="Book Shop | Home" requireLogin={false}>
      Home page
      <DropdownButton id="dropdown-basic-button" title="Test React Bootstrap">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </Layout>
  )
}
