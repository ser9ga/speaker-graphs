'use client'

import {Icon, Show, Tabs} from '@chakra-ui/react';
import {GoGraph, GoListUnordered} from 'react-icons/go';
import {DiagramTab} from '@/app/_modules/ViewComponents/DiagramTab/DiagramTab';
import {useAppDispatch, useAppSelector} from '@/app/_modules/Store/Hooks';
import {isCleanLookEnabledSelector} from '@/app/_modules/Store/GraphSetControl/GraphSetControlSelectors';
import React from "react";
import {MAIN_TAB_NAME, MainTabName} from "@/app/_modules/Constants/MainTabName";
import {
  MeasurementCaseCollection
} from "@/app/_modules/ViewComponents/MeasurementCaseCollection/MeasurementCaseCollection";
import flags from "@/app/feature-flags.json";
import {EntityRegistryTab} from "@/app/_modules/ViewComponents/EntityRegistryTab/EntityRegistryTab";
import {VscGraph} from "react-icons/vsc";
import {activeTabSelector} from "@/app/_modules/Store/AppControl/AppControlSelectors";
import {setActiveTab} from "@/app/_modules/Store/AppControl/AppControlSlice";

export const TabContainer = () => {
  const isCleanLookEnabled = useAppSelector(isCleanLookEnabledSelector);
  const activeTab = useAppSelector(activeTabSelector);

  const dispatch = useAppDispatch();

  return (
    <>
      <Tabs.Root
        defaultValue="graph_views"
        width={'100%'}
        minWidth={'1280px'}
        height={'100%'}
        minHeight={'720px'}
        display="grid"
        gridTemplateRows={'auto 1fr'}
        value={activeTab}
        onValueChange={(details) => dispatch(setActiveTab(details.value as MainTabName))}
      >
        <Tabs.List>
          <Show <boolean> when={!isCleanLookEnabled}>
            <Tabs.Trigger value={MAIN_TAB_NAME.GRAPH_DRAWS}>
              <Icon size="sm">
                <GoGraph />
              </Icon>
              Графики
            </Tabs.Trigger>
            {flags.feature__catalog && (
              <Tabs.Trigger value={MAIN_TAB_NAME.MEASUREMENT_CASE_CATALOG}>
                <Icon size="sm">
                  <VscGraph />
                </Icon>
                Каталог
              </Tabs.Trigger>
            )}
            {flags.feature__registry && (
              <Tabs.Trigger value={MAIN_TAB_NAME.ENTITY_REGISTRY}>
                <Icon size="sm">
                  <GoListUnordered/>
                </Icon>
                Реестр
              </Tabs.Trigger>
            )}
          </Show>
        </Tabs.List>
        <Tabs.Content
          value={MAIN_TAB_NAME.GRAPH_DRAWS}
          height={'100%'}
          width={'100%'}
          minHeight={'0px'}
          minWidth={'0px'}
          paddingTop={'0px'}
        >
          <DiagramTab />
        </Tabs.Content>
        {flags.feature__catalog && (
          <Tabs.Content
            value={MAIN_TAB_NAME.MEASUREMENT_CASE_CATALOG}
            height={'100%'}
            width={'100%'}
            minHeight={'0px'}
            minWidth={'0px'}
            paddingTop={'0px'}
          >
            <MeasurementCaseCollection />
          </Tabs.Content>
        )}
        {flags.feature__registry && (
          <Tabs.Content
            value={MAIN_TAB_NAME.ENTITY_REGISTRY}
            height={'100%'}
            width={'100%'}
            minHeight={'0px'}
            minWidth={'0px'}
            paddingTop={'0px'}
          >
            <EntityRegistryTab />
          </Tabs.Content>
        )}
      </Tabs.Root>
    </>
  )
}
