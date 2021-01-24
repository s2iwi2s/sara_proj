import { Box, Typography } from "@material-ui/core"

const SubTitleComponent = (props) => {
 return (
  <>
   <Box>
    <Typography variant="h5">{props.children}</Typography>
   </Box>
  </>
 )
}

export default SubTitleComponent