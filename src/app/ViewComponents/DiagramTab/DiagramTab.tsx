import {Box, Grid, Separator} from '@chakra-ui/react';
import styles from "./styles.module.scss";
import {DiagramCollection} from "@/app/ViewComponents/DiagramCollection/DiagramCollection";
import {ControlPanel} from "@/app/ViewComponents/ControlPanel/ControlPanel";

export const DiagramTab = () => {
  return (
    <Grid
      className={styles.container}
      templateRows={'2fr 70px 184px'}
      padding={'35px'}
      height={'100%'}
      width={'100%'}
    >
      <Box
        className={styles.qwe}
        height={'100%'}
        width={'100%'}
      >
        <DiagramCollection/>
      </Box>
      <Box paddingTop={'35px'}>
        <Separator />
      </Box>
      <Box
        className={styles.asd}
        height={'100%'}
        width={'100%'}
      >
        <ControlPanel />
      </Box>
    </Grid>
  )
}
