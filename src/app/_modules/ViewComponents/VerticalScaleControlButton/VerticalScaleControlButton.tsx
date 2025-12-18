import * as React from 'react';
import { useMemo } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Tooltip } from '@/app/_modules/components/ui/tooltip';
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';
import { VERTICAL_SCALE_OPTION } from '@/app/_modules/Constants/VerticalScaleOption';
import { _exhaustiveCheck } from '@/app/_modules/Utils/Common';
import { verticalScaleOptionSelector } from '@/app/_modules/Store/GraphSetControl/GraphSetControlSelectors';
import { useAppDispatch, useAppSelector } from '@/app/_modules/Store/Hooks';
import { toggleVerticalScaleOption } from '@/app/_modules/Store/GraphSetControl/GraphSetControlSlice';

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
