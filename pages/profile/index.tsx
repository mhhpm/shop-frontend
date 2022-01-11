import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'
import Layout from '@utils/components/Layout'
import { forgetPassword } from '@utils/services/updateInfo'
import { getUser } from '@utils/services/user'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import * as React from 'react'
import toast from 'react-hot-toast'

interface State {
  showPassword: boolean
  showConfirmPassword: boolean
}

function Profile({ user }: any) {
  console.log(user)
  const [values, setValues] = React.useState<State>({
    showPassword: false,
    showConfirmPassword: false,
  })

  const [username, setUsername] = React.useState(
    user?.username ? user.username : '',
  )
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    })
  }

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const handleSubmit = async () => {
    if (confirmPassword !== password) {
      toast.error('Mật khẩu xác nhận không đúng.')
      return
    }

    try {
      await forgetPassword(user.id, username)
      toast.success('Cập nhật thông tin thành công.')
    } catch (error: any) {
      console.log(error)
      if (error?.response?.data) {
        const {
          error: { status },
        } = error.response.data
        toast.error('Cập nhật thông tin không thành công.')
      }
    }
  }

  return (
    <Layout title="Book Shop | Hồ sơ cá nhân" requireLogin={true}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box mb={4}>
          <Typography variant="h4" component="h2">
            Hồ sơ của tôi
          </Typography>
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Grid container>
              <Grid item xs={12} lg={6}>
                <Box mb={5}>
                  <Typography variant="h6" component="h2">
                    Họ tên
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <OutlinedInput
                      defaultValue={username}
                      label=""
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <FormHelperText />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box mb={5}>
                  <Typography variant="h6" component="h2">
                    Email
                  </Typography>
                  <FormControl sx={{ width: '80%' }}>
                    <OutlinedInput
                      value={user?.email ? user.email : ''}
                      label=""
                      disabled={true}
                    />
                    <FormHelperText />
                  </FormControl>{' '}
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl sx={{ width: '80%' }} variant="outlined">
                  <Typography variant="h6" component="h2">
                    Mật khẩu mới
                  </Typography>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl sx={{ width: '80%' }} variant="outlined">
                  <Typography variant="h6" component="h2">
                    Xác nhận mật khẩu mới
                  </Typography>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    type={values.showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {values.showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label=""
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box mt={5}>
            <Button type="submit" variant="contained">
              Cập nhật thông tin
            </Button>
          </Box>
        </form>
      </Container>
    </Layout>
  )
}
export default Profile

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const userId = session?.id
  let user = null
  if (userId) {
    user = await getUser(userId)
    return {
      props: {
        user,
      },
    }
  }

  return {
    props: {},
  }
}
