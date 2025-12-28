'use client'

import {Flex, Grid, IconButton} from '@chakra-ui/react';
import {LuDiameter} from "react-icons/lu";
import {ENTITY_CATEGORY_NAME_LABEL} from "@/app/_modules/Constants/Translations/EntityCategoryNameLabel";
import {PiSpeakerNone} from "react-icons/pi";
import * as React from "react";
import {useCallback, useState} from "react";
import {RiSpeaker2Line} from "react-icons/ri";
import {IoCarOutline} from "react-icons/io5";
import {CabinetsEntityTable} from "@/app/_modules/ViewComponents/CabinetsEntityTable/CabinetsEntityTable";
import {CarsEntityTable} from "@/app/_modules/ViewComponents/CarsEntityTable/CarsEntityTable";
import {PortsEntityTable} from "@/app/_modules/ViewComponents/PortsEntityTable/PortsEntityTable";
import {SpeakersEntityTable} from "@/app/_modules/ViewComponents/SpeakersEntityTable/SpeakersEntityTable";
import {_exhaustiveCheck} from "@/app/_modules/Utils/Common";
import {ENTITY_CATEGORY_NAME, EntityCategoryName} from "@/app/_modules/Constants/EntityCategoryName";

export const EntityRegistryTab = () => {
  const [activeEntity, setActiveEntity] = useState<EntityCategoryName>(ENTITY_CATEGORY_NAME.SPEAKERS);

  const getActiveTable = useCallback(() => {
    switch (activeEntity) {
      case ENTITY_CATEGORY_NAME.SPEAKERS: {
        return <SpeakersEntityTable />;
      }

      case ENTITY_CATEGORY_NAME.CABINETS: {
        return <CabinetsEntityTable />;
      }

      case ENTITY_CATEGORY_NAME.PORTS: {
        return <PortsEntityTable />;
      }

      case ENTITY_CATEGORY_NAME.CARS: {
        return <CarsEntityTable />;
      }

      default: _exhaustiveCheck(activeEntity);
    }
  }, [activeEntity])

  return (
    <Grid
      templateColumns={"250px 1fr"}
      gap={'15px'}
      width={'100%'}
      minHeight={'0px'}
      minWidth={'0px'}
      padding={'15px'}
      overflow={'hidden'}
    >
      <Flex
        width={'250px'}
        direction={'column'}
        gap={'10px'}
      >
        <IconButton
          variant={activeEntity === ENTITY_CATEGORY_NAME.SPEAKERS ? "solid" : "outline"}
          onClick={() => setActiveEntity(ENTITY_CATEGORY_NAME.SPEAKERS)}
        >
          <PiSpeakerNone />
          {ENTITY_CATEGORY_NAME_LABEL[ENTITY_CATEGORY_NAME.SPEAKERS]}
        </IconButton >
        <IconButton
          variant={activeEntity === ENTITY_CATEGORY_NAME.CABINETS ? "solid" : "outline"}
          onClick={() => setActiveEntity(ENTITY_CATEGORY_NAME.CABINETS)}
        >
          <RiSpeaker2Line />
          {ENTITY_CATEGORY_NAME_LABEL[ENTITY_CATEGORY_NAME.CABINETS]}
        </IconButton>
        <IconButton
          variant={activeEntity === ENTITY_CATEGORY_NAME.PORTS ? "solid" : "outline"}
          onClick={() => setActiveEntity(ENTITY_CATEGORY_NAME.PORTS)}
        >
          <LuDiameter />
          {ENTITY_CATEGORY_NAME_LABEL[ENTITY_CATEGORY_NAME.PORTS]}
        </IconButton>
        <IconButton
          variant={activeEntity === ENTITY_CATEGORY_NAME.CARS ? "solid" : "outline"}
          onClick={() => setActiveEntity(ENTITY_CATEGORY_NAME.CARS)}
        >
          <IoCarOutline />
          {ENTITY_CATEGORY_NAME_LABEL[ENTITY_CATEGORY_NAME.CARS]}
        </IconButton>
      </Flex>
      {getActiveTable()}
    </Grid>
  )
}
