import * as React from 'react'
import { makeStyles } from '@mui/styles'
import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
}

const sortItem = ['Giá cao đến thấp', 'Giá thấp đến cao']

function getStyles(name: string, selection: string, theme: Theme) {
  return {
    fontWeight:
      selection.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

interface IProps {
  handleChange: any
  selection: string
}

export default function SelectPlaceholder({ handleChange, selection }: IProps) {
  const theme = useTheme()
  // const [selection, setSelection] = React.useState<string>('')

  // const handleChange = (event: SelectChangeEvent<typeof selection>) => {
  //   const {
  //     target: { value },
  //   } = event
  //   setSelection(value)
  // }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <Select
          sx={{
            '& .MuiSelect-select': {
              padding: '10px 10px',
            },
          }}
          displayEmpty
          value={selection}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <>Xếp theo</>
            }

            return selected
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Xếp theo</em>
          </MenuItem>
          {sortItem.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selection, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
