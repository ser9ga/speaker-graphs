import * as React from 'react';
import { useMemo } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Tooltip } from '@/app/components/ui/tooltip';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';
import { VERTICAL_SCALE_OPTION } from '@/app/Constants/VerticalScaleOption';
import { _exhaustiveCheck } from '@/app/Utils/Common';
import { verticalScaleOptionSelector } from '@/app/Store/AppControl/AppControlSelectors';
import { useAppDispatch, useAppSelector } from '@/app/Store/Hooks';
import { toggleVerticalScaleOption } from '@/app/Store/AppControl/AppControlSlice';

export const VerticalScaleControlButton = () => {
  const verticalScaleOption = useAppSelector(verticalScaleOptionSelector)
  const dispatch = useAppDispatch();

  const icon = useMemo(() => {
    switch (verticalScaleOption) {
      case VERTICAL_SCALE_OPTION.ZOOMED: {
        return <BsArrowsCollapse />;
      }

      case VERTICAL_SCALE_OPTION.FULL: {
        return <BsArrowsExpand />;
      }
    }

    return _exhaustiveCheck(verticalScaleOption)
  }, [verticalScaleOption])

  const tooltipContent = useMemo(() => {
    switch (verticalScaleOption) {
      case VERTICAL_SCALE_OPTION.ZOOMED: {
        return 'Адаптировать шкалы Y для оптимального отображения'
      }

      case VERTICAL_SCALE_OPTION.FULL: {
        return 'Развернуть шкалы Y до полных диапазонов'
      }
    }

    return _exhaustiveCheck(verticalScaleOption)
  }, [verticalScaleOption])

  return (
    <Tooltip
      content={tooltipContent}
      positioning={{placement: 'right'}}
      openDelay={500}
    >
      <IconButton onClick={() => dispatch(toggleVerticalScaleOption())}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
