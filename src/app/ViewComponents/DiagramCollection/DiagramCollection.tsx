import { Grid, IconButton } from '@chakra-ui/react';
import { DiagramBlock } from '@/app/ViewComponents/DiagramBlock/DiagramBlock';
import { GiElectricalResistance } from 'react-icons/gi';
import { GRAPH_NAME } from '@/app/Constants/GraphName';
import { UNIT } from '@/app/Constants/Unit';
import { useAppSelector } from '@/app/Store/Hooks';
import { isGraphExpandedSelector } from '@/app/Store/AppControl/AppControlSelectors';
import {useEffect} from "react";

export const DiagramCollection = () => {
  const isGraphExpanded = useAppSelector(isGraphExpandedSelector);

  // нужно для отключения outline на графиках
  useEffect(() => {
    setTimeout(() => {
      const list = Array.from(document.getElementsByClassName('recharts-surface'));
      // @ts-ignore
      [...list]?.forEach(el => el.style.outline = 'none')
    })
  }, [])

  return (
    <Grid
      templateRows={isGraphExpanded ? "1fr" : "1fr 1fr"}
      templateColumns={isGraphExpanded ? "1fr" : "1fr 1fr 1fr"}
      gap={'15px'}
      height={'100%'}
      width={'100%'}
    >
      <DiagramBlock
        graphName={GRAPH_NAME.PRESSURE_FROM_TARGET_VOLTAGE}
        unitName={UNIT.Pa}
      />
      <DiagramBlock
        graphName={GRAPH_NAME.IMPEDANCE_FROM_TARGET_VOLTAGE}
        unitName={UNIT.Z}
      />
      <DiagramBlock
        graphName={GRAPH_NAME.SENSITIVITY_FROM_TARGET_VOLTAGE}
        unitName={UNIT.S}
      />
      <DiagramBlock
        graphName={GRAPH_NAME.PRESSURE_FROM_GIVEN_VOLTAGE}
        unitName={UNIT.PaUout}
        buttonCollection={[(
          <IconButton
            key={1}
            onClick={() => {}} // TODO
          >
            <GiElectricalResistance />
          </IconButton>
        )]}
      />
      <DiagramBlock
        graphName={GRAPH_NAME.POWER}
        unitName={UNIT.P}
      />
    </Grid>
  );
}
