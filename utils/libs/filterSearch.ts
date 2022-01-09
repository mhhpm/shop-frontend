interface IProps {
  router: any
  search?: string
  sort?: string
  filter?: string[]
}

const filterSearch = ({ router, search, sort, filter }: IProps) => {
  const { pathname, query } = router

  if (search) query.search = search

  if (filter) {
    query.filter = filter
  }

  if (sort) {
    switch (sort) {
      case 'Giá thấp đến cao':
        query.sort = 'asc'
        break
      case 'Giá cao đến thấp':
        query.sort = 'desc'
        break
      default:
        query.sort = ''
    }
  }

  router.push({
    pathname,
    query: query,
  })
}

export default filterSearch
