import * as React from 'react'
import Button from '@mui/material/Button'

type Props = {
  onSelect: Function
  name: string
  selectedName?: string
}

export default function SelectButton({ onSelect, name, selectedName }: Props) {
  const isSelected = selectedName === name
  // console.log(name)
  // console.log(isSelected)
  const [status, setStatus] = React.useState(false)
  const handleClick = () => {
    onSelect(name)
    setStatus(!status)
  }

  return (
    <Button
      onClick={handleClick}
      variant={status === true ? 'contained' : 'outlined'}
      size="small"
    >
      {name}
    </Button>
  )
}
