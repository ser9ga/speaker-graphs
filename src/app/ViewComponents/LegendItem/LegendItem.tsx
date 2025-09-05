import { Flex, Grid, Switch, Text } from '@chakra-ui/react';
import { PiSpeakerNone } from 'react-icons/pi';
import { LuDiameter } from 'react-icons/lu';
import { TbRulerMeasure } from 'react-icons/tb';
import { IoCarOutline } from 'react-icons/io5';
import { GiCarDoor } from 'react-icons/gi';
import { RiSpeaker2Line } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '@/app/Store/Hooks';
import { getIsLineVisibleSelector, getLineColorSelector } from '@/app/Store/GraphData/GraphDataSelectors';
import { changeVisibilityOfCase } from '@/app/Store/GraphData/GraphDataSlice';

interface LegendItemProps {
  uniqName: string
  speakerLabel: string
  cabinetLabel: string
  portDiameter: string
  portLength: string
  carLabel: string
  doorState: string
}

export const LegendItem = ({
  uniqName,
  speakerLabel,
  cabinetLabel,
  portDiameter,
  portLength,
  carLabel,
  doorState,
}: LegendItemProps) => {
  const isVisible = useAppSelector(getIsLineVisibleSelector(uniqName))
  const strokeColor = useAppSelector(getLineColorSelector(uniqName))

  const dispatch = useAppDispatch()

  const onCheckedChange = (params: {checked: boolean}) => {
    dispatch(changeVisibilityOfCase({
      targetGraphName: uniqName,
      flag: params.checked
    }))
  }

  return (
    <Grid
      templateColumns={'40px 150px 80px 80px 80px 80px 100px'}
      gap={'10px'}
      alignItems={'center'}
    >
      <Switch.Root
        colorPalette={strokeColor}
        defaultChecked
        onCheckedChange={onCheckedChange}
        checked={isVisible}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label />
      </Switch.Root>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <PiSpeakerNone />
        <Text truncate>
          {speakerLabel}
        </Text>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <RiSpeaker2Line />
        <Text>
          {cabinetLabel}
        </Text>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <LuDiameter />
        <Text>
          {portDiameter}
        </Text>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <TbRulerMeasure />
        <Text>
          {portLength}
        </Text>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <IoCarOutline />
        <Text>
          {carLabel}
        </Text>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <GiCarDoor />
        <Text>
          {doorState}
        </Text>
      </Flex>
    </Grid>
  )
}
