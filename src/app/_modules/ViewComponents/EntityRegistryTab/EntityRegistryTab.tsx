'use client'

import {Flex, Grid, IconButton} from '@chakra-ui/react';
import {LuDiameter} from "react-icons/lu";
import {ENTITY_CATEGORY_NAME_LABEL} from "@/app/_modules/Constants/Translations/EntityCategoryNameLabel";
import {PiSpeakerNone} from "react-icons/pi";
import * as React from "react";
import {useCallback, useState} from "react";
import {RiSpeaker2Line} from "react-icons/ri";
import {IoCarOutline} from "react-icons/io5";
import {SpeakersEntityTable} from "@/app/_modules/ViewComponents/SpeakersEntityTable/SpeakersEntityTable";
import {_exhaustiveCheck} from "@/app/_modules/Utils/Common";
import {CabinetsEntityTable} from "@/app/_modules/ViewComponents/CabinetsEntityTable/CabinetsEntityTable";
import {PortsEntityTable} from "@/app/_modules/ViewComponents/PortsEntityTable/PortsEntityTable";
import {CarsEntityTable} from "@/app/_modules/ViewComponents/CarsEntityTable/CarsEntityTable";
import {ENTITY_CATEGORY, EntityCategory} from "@/app/_modules/Constants/EntityCategory";

export const EntityRegistryTab = () => {
  const [activeEntity, setActiveEntity] = useState<EntityCategory>(ENTITY_CATEGORY.SPEAKERS);

  const getActiveTable = useCallback(() => {
    switch (activeEntity) {
      case ENTITY_CATEGORY.SPEAKERS: {
        return <SpeakersEntityTable />;
      }

      case ENTITY_CATEGORY.CABINETS: {
        return <CabinetsEntityTable />;
      }

      case ENTITY_CATEGORY.PORTS: {
        return <PortsEntityTable />;
      }

      case ENTITY_CATEGORY.CARS: {
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
          variant={activeEntity === ENTITY_CATEGORY.SPEAKERS ? "solid" : "outline"}
          onClick={() => setActiveEntity(ENTITY_CATEGORY.SPEAKERS)}
        >
          <PiSpeakerNone />
          {ENTITY_CATEGORY_NAME_LABEL.SPEAKERS}
        </IconButton >
        <IconButton
          variant={activeEntity === ENTITY_CATEGORY.CABINETS ? "solid" : "outline"}
          onClick={() => setActiveEntity(ENTITY_CATEGORY.CABINETS)}
        >
          <RiSpeaker2Line />
          {ENTITY_CATEGORY_NAME_LABEL.CABINETS}
        </IconButton>
        <IconButton
          variant={activeEntity === ENTITY_CATEGORY.PORTS ? "solid" : "outline"}
          onClick={() => setActiveEntity(ENTITY_CATEGORY.PORTS)}
        >
          <LuDiameter />
          {ENTITY_CATEGORY_NAME_LABEL.PORTS}
        </IconButton>
        <IconButton
          variant={activeEntity === ENTITY_CATEGORY.CARS ? "solid" : "outline"}
          onClick={() => setActiveEntity(ENTITY_CATEGORY.CARS)}
        >
          <IoCarOutline />
          {ENTITY_CATEGORY_NAME_LABEL.CARS}
        </IconButton>
      </Flex>
      {getActiveTable()}
    </Grid>
  )
}
