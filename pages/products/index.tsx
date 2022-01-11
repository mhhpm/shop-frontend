import Layout from '@utils/components/Layout'
import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { SelectChangeEvent } from '@mui/material/Select'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useRouter } from 'next/router'
import SelectPlaceholder from '@utils/components/SelectPlaceHolder'
import filterSearch from '@utils/libs/filterSearch'
import Product from '../../components/products/Product'
import { getProducts, getProductByURL } from '@utils/services/product'
import { IProduct } from '@utils/types/product'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '1px solid grey',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#f5f5f5', 0.5),
  '&:hover': {
    backgroundColor: alpha('#f5f5f5', 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}))

interface IProps {
  products: any
  pageSize: number
}

const selection = ['Sách thiếu nhi', 'Học ngoại ngữ', 'Kỹ năng sống', 'Kinh tế']
function DashboardContent({ products, pageSize }: IProps) {
  const [bookList, setBookList] = React.useState(products)
  React.useEffect(() => {
    setBookList(products)
  }, [products])

  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = React.useState<string[]>([])
  const handleSelectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.target.checked
    const name = event.target.name
    const tmpSelectedCategory = [...selectedCategory]
    if (event.target.checked) {
      tmpSelectedCategory?.push(name)
    } else {
      const index = tmpSelectedCategory.indexOf(name)
      tmpSelectedCategory.splice(index, 1)
    }
    setSelectedCategory(tmpSelectedCategory)
    const filter = tmpSelectedCategory
    filterSearch({ router, filter })

    console.log(tmpSelectedCategory)
  }

  const searchHandler = (e: any) => {
    if (e.code === 'Enter') {
      const search = e.target.value
      filterSearch({ router, search })
    }
  }

  const [selections, setSelection] = React.useState<string>('')
  const handleChange = (event: SelectChangeEvent<typeof selections>) => {
    const value = event.target.value
    setSelection(value)
    filterSearch({ router, sort: event.target.value })
  }

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    router.push(`?page=${page}`)
  }

  console.log('rerender')

  return (
    <Layout title="Book Shop | Sản phẩm" requireLogin={false}>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Box>
            <Search>
              <SearchIconWrapper onClick={searchHandler}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onKeyDown={searchHandler}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
          <Box
            mt={2}
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box sx={{ flexGrow: 0.5 }}>
              <b>Thể loại</b>
            </Box>

            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
              {selection.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox onChange={handleSelectCategory} name={item} />
                    }
                    label={item}
                  />
                )
              })}
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            <SelectPlaceholder
              selection={selections}
              handleChange={handleChange}
            />
          </Box>
          {bookList?.length > 0 ? (
            <>
              <Grid mt={1} container spacing={3}>
                {bookList.map((book: IProduct) => (
                  <Grid item xs={3} key={book.id}>
                    <Product id={book.id} attributes={book.attributes} />
                  </Grid>
                ))}
              </Grid>
              <Box m="auto" mt={5}>
                <Pagination
                  onChange={handlePagination}
                  count={pageSize}
                  color="primary"
                />
              </Box>
            </>
          ) : (
            <>Không có kết quả cho từ khóa bạn tìm kiếm</>
          )}
        </Box>
      </Container>
    </Layout>
  )
}

export default DashboardContent

export async function getServerSideProps({
  query: { page = 1, sort, filter, search },
}: any) {
  const PRODUCT_PER_PAGE = 16
  const resDefault = await getProducts()
  const totalProducts = resDefault.meta.pagination.total
  const totalPages = Math.ceil(totalProducts / PRODUCT_PER_PAGE)

  let res = await getProductByURL(
    `?pagination[page]=${page}&pagination[pageSize]=${PRODUCT_PER_PAGE}`,
  )

  if (sort) {
    res = await getProductByURL(`?sort[0]=price%3A${sort}`)
  }

  if (search) {
    search = encodeURI(search)
    const a = `?filters[name][$containsi]=${search}`
    console.log(a)
    res = await getProductByURL(`?filters[name][$containsi]=${search}`)
  }

  if (filter) {
    let tmpFilter = null
    if (typeof filter === 'string') {
      tmpFilter = new Array(filter)
    } else {
      tmpFilter = [...filter]
    }

    const length = tmpFilter.length
    let url = `?filters[category][$in][0]=${encodeURI(tmpFilter[0])}`
    for (let i = 1; i < length; i++) {
      url += `&filters[category][$in][${i}]=${encodeURI(tmpFilter[i])}`
    }
    res = await getProductByURL(url)
  }

  return {
    props: {
      products: res.data,
      pageSize: totalPages,
    },
  }
}
