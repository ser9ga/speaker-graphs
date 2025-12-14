import * as React from "react";
import {Grid} from '@chakra-ui/react';
import {MeasurementCaseTable} from "@/app/_modules/ViewComponents/MeasurementCaseTable/MeasurementCaseTable";

export const MeasurementCaseCollection = () => {
  return (
    <Grid
      templateRows={"1fr 1fr"}
      gap={'15px'}
      width={'100%'}
      height={'100%'}
      minHeight={'0px'}
      minWidth={'0px'}
      padding={'15px'}
      overflow={'hidden'}
    >
      <MeasurementCaseTable />
      <MeasurementCaseTable />
    </Grid>
  )
}
