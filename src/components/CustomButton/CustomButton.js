import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const CustomButton = styled(Button)(
  ({ textcolor, background, border = 'transparent', hover, style }) => ({
    color: textcolor,
    backgroundColor: background,
    borderColor: border,
    ...style,
    '&:hover': hover,
  })
)

export default CustomButton
