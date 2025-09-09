import {Box, Grid} from '@chakra-ui/react';
import {DiagramCollection} from "@/app/ViewComponents/DiagramCollection/DiagramCollection";
import {ControlPanel} from "@/app/ViewComponents/ControlPanel/ControlPanel";

export const DiagramTab = () => {
  return (
    <Grid
      templateRows={'2fr 135px'}
      padding={'15px'}
      height={'100%'}
      width={'100%'}
      gap={'10px'}
    >
      <Box
        height={'100%'}
        width={'100%'}
      >
        <DiagramCollection/>
      </Box>
      <Box
        height={'100%'}
        width={'100%'}
      >
        <ControlPanel />
      </Box>
    </Grid>
  )
}
