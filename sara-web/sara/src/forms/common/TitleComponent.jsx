import { Box, Typography } from "@material-ui/core"

const TitleComponent = (props) => {
 return (
  <Box pb={1}>
   <Typography variant="h4">
    {props.children}
   </Typography>
  </Box>
 )
}

export default TitleComponent