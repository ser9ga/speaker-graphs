import {Box, Grid} from '@chakra-ui/react';
import styles from "./styles.module.scss";
import {DiagramCollection} from "@/app/ViewComponents/DiagramCollection/DiagramCollection";
import {ControlPanel} from "@/app/ViewComponents/ControlPanel/ControlPanel";

export const DiagramTab = () => {
  return (
    <Grid
      className={styles.container}
      templateRows={'2fr 135px'}
      padding={'15px'}
      height={'100%'}
      width={'100%'}
      gap={'10px'}
    >
      <Box
        className={styles.qwe}
        height={'100%'}
        width={'100%'}
      >
        <DiagramCollection/>
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
