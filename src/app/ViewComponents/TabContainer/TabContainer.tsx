import {Show, Tabs} from '@chakra-ui/react';
import {GoGraph} from 'react-icons/go';
import {DiagramTab} from '@/app/ViewComponents/DiagramTab/DiagramTab';
import {useAppSelector} from '@/app/Store/Hooks';
import {isCleanLookEnabledSelector} from '@/app/Store/AppControl/AppControlSelectors';

export const TabContainer = () => {
  const isCleanLookEnabled = useAppSelector(isCleanLookEnabledSelector);

  return (
    <Tabs.Root
      defaultValue="graph_views"
      width={'100%'}
      minWidth={'1280px'}
      height={'100%'}
      minHeight={'720px'}
      display="grid"
      gridTemplateRows={'auto 1fr'}
    >
      <Tabs.List>
        <Show <boolean> when={!isCleanLookEnabled}>
          <Tabs.Trigger value="graph_views">
            <GoGraph />
            Графики
          </Tabs.Trigger>
        </Show>
      </Tabs.List>
      <Tabs.Content
        value="graph_views"
        height={'100%'}
        width={'100%'}
        paddingTop={'0px'}
      >
        <DiagramTab />
      </Tabs.Content>
    </Tabs.Root>
  )
}
