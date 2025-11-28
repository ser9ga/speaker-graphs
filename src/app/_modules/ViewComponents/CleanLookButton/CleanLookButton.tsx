import * as React from 'react';
import { useMemo } from 'react';
import { IconButton } from '@chakra-ui/react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { Tooltip } from '@/app/_modules/components/ui/tooltip';
import { _exhaustiveCheck } from '@/app/_modules/Utils/Common';
import { useAppDispatch, useAppSelector } from '@/app/_modules/Store/Hooks';
import { isCleanLookEnabledSelector } from '@/app/_modules/Store/AppControl/AppControlSelectors';
import { toggleCleanLook } from '@/app/_modules/Store/AppControl/AppControlSlice';

export const CleanLookButton = () => {
  const isCleanLookEnabled = useAppSelector(isCleanLookEnabledSelector)
  const dispatch = useAppDispatch()


  const icon = useMemo(() => {
    switch (isCleanLookEnabled) {
      case false: {
        return <LuEyeOff />;
      }

      case true: {
        return  <LuEye />;
      }
    }

    return _exhaustiveCheck(isCleanLookEnabled)
  }, [isCleanLookEnabled])

  const tooltipContent = useMemo(() => {
    switch (isCleanLookEnabled) {
      case false: {
        return 'Скрыть все вспомогательные элементы'
      }

      case true: {
        return 'Показать вспомогательные элементы'
      }
    }

    return _exhaustiveCheck(isCleanLookEnabled)
  }, [isCleanLookEnabled])

  return (
    <Tooltip
      content={tooltipContent}
      positioning={{placement: 'right'}}
      openDelay={500}
    >
      <IconButton onClick={() => dispatch(toggleCleanLook())}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
