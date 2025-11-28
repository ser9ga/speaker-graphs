import * as React from 'react';
import { useMemo } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Tooltip } from '@/app/_modules/components/ui/tooltip';
import { BsArrowsCollapseVertical, BsArrowsExpandVertical } from 'react-icons/bs';
import { _exhaustiveCheck } from '@/app/_modules/Utils/Common';
import { HORIZONTAL_SCALE_OPTION } from '@/app/_modules/Constants/HorizontalScaleOption';
import { useAppDispatch, useAppSelector } from '@/app/_modules/Store/Hooks';
import { horizontalScaleOptionSelector } from '@/app/_modules/Store/AppControl/AppControlSelectors';
import { toggleHorizontalScaleOption } from '@/app/_modules/Store/AppControl/AppControlSlice';

export const HorizontalScaleControlButton = () => {
  const horizontalScaleOption = useAppSelector(horizontalScaleOptionSelector);
  const dispatch = useAppDispatch()

  const icon = useMemo(() => {
    switch (horizontalScaleOption) {
      case HORIZONTAL_SCALE_OPTION.ZOOMED: {
        return <BsArrowsCollapseVertical />
      }

      case HORIZONTAL_SCALE_OPTION.FULL: {
        return <BsArrowsExpandVertical />
      }
    }

    return _exhaustiveCheck(horizontalScaleOption)
  }, [horizontalScaleOption])

  const tooltipContent = useMemo(() => {
    switch (horizontalScaleOption) {
      case HORIZONTAL_SCALE_OPTION.ZOOMED: {
        return 'Адаптировать шкалы X для оптимального отображения'
      }

      case HORIZONTAL_SCALE_OPTION.FULL: {
        return 'Развернуть шкалы X до полных диапазонов'
      }
    }

    return _exhaustiveCheck(horizontalScaleOption)
  }, [horizontalScaleOption])

  return (
    <Tooltip
      content={tooltipContent}
      positioning={{placement: 'right'}}
      openDelay={500}
    >
      <IconButton onClick={() => dispatch(toggleHorizontalScaleOption())}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
