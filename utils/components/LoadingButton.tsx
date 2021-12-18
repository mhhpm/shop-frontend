import React, { ReactNode } from 'react'
import { ButtonProps, Button, Spinner } from 'react-bootstrap'

interface IProps extends ButtonProps {
  isLoading: boolean
  children: ReactNode
}

const LoadingButton = ({
  variant = 'outline-dark',
  isLoading,
  children,
  ...props
}: IProps) => {
  return (
    <Button variant={variant} disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />{' '}
          Vui lòng chờ
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  )
}

export default LoadingButton
