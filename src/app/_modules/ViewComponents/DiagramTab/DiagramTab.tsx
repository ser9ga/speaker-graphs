import {Box, Grid} from '@chakra-ui/react';
import {DiagramCollection} from "@/app/_modules/ViewComponents/DiagramCollection/DiagramCollection";
import {ControlPanel} from "@/app/_modules/ViewComponents/ControlPanel/ControlPanel";

export const DiagramTab = () => {
  return (
    <Grid
      templateRows={'2fr auto'}
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
