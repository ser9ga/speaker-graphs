import {Flex, Grid, Switch, Text} from '@chakra-ui/react';
import {PiSpeakerNone} from 'react-icons/pi';
import {LuDiameter} from 'react-icons/lu';
import {TbCircuitVoltmeter, TbRulerMeasure} from 'react-icons/tb';
import {IoCarOutline} from 'react-icons/io5';
import {GiCarDoor} from 'react-icons/gi';
import {RiSpeaker2Line} from 'react-icons/ri';
import {useAppDispatch, useAppSelector} from '@/app/Store/Hooks';
import {getIsLineVisibleSelector, getLineColorSelector} from '@/app/Store/GraphData/GraphDataSelectors';
import {changeVisibilityOfCase} from '@/app/Store/GraphData/GraphDataSlice';
import {Tooltip} from "@/app/components/ui/tooltip";
import * as React from "react";

interface LegendItemProps {
  uniqName: string
  speakerLabel: string
  cabinetLabel: string
  portDiameter: string
  portLength: string
  carLabel: string
  doorState: string
  voltageOfTesting: string
}

export const LegendItem = ({
  uniqName,
  speakerLabel,
  cabinetLabel,
  portDiameter,
  portLength,
  carLabel,
  doorState,
  voltageOfTesting
}: LegendItemProps) => {
  const isVisible = useAppSelector(state => getIsLineVisibleSelector(state, uniqName))
  const strokeColor = useAppSelector(state => getLineColorSelector(state, uniqName))

  const dispatch = useAppDispatch()

  const onCheckedChange = (params: {checked: boolean}) => {
    dispatch(changeVisibilityOfCase({
      targetGraphName: uniqName,
      flag: params.checked
    }))
  }

  return (
    <Grid
      templateColumns={'15px 32px 150px 80px 80px 80px 150px 80px 50px'}
      gap={'10px'}
      alignItems={'center'}
    >
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <div
          style={{
            height: '15px',
            width: '100%',
            backgroundColor: strokeColor
          }}
        />
      </Flex>
      <Switch.Root
        defaultChecked
        onCheckedChange={onCheckedChange}
        checked={isVisible}
        size={'sm'}
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
        <Tooltip
          content={speakerLabel}
          positioning={{placement: 'top'}}
          openDelay={1000}
        >
          <Text
            textStyle="sm"
            truncate
          >
            {speakerLabel}
          </Text>
        </Tooltip>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <RiSpeaker2Line />
        <Tooltip
          content={cabinetLabel}
          positioning={{placement: 'top'}}
          openDelay={1000}
        >
          <Text
            textStyle="sm"
            truncate
          >
            {cabinetLabel}
          </Text>
        </Tooltip>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <LuDiameter />
        <Text
          textStyle="sm"
          truncate
        >
          {portDiameter}
        </Text>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <TbRulerMeasure />
        <Text
          textStyle="sm"
          truncate
        >
          {portLength}
        </Text>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <IoCarOutline />
        <Tooltip
          content={carLabel}
          positioning={{placement: 'top'}}
          openDelay={1000}
        >
          <Text
            textStyle="sm"
            truncate
          >
            {carLabel}
          </Text>
        </Tooltip>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <GiCarDoor />
        <Text
          textStyle="sm"
          truncate
        >
          {doorState}
        </Text>
      </Flex>
      <Flex
        alignItems={'center'}
        gap={'5px'}
      >
        <TbCircuitVoltmeter />
        <Text
          textStyle="sm"
          truncate
        >
          {voltageOfTesting}
        </Text>
      </Flex>
    </Grid>
  )
}
