import { IconButton, Stack, Typography } from '@mui/material';
import { MouseEvent } from 'react';

import { mergeSx } from '../../../../utils';
import { iconButtonClassName } from '../../constants';
import { TreeItemLabelWithIconProps } from '../types';

import { HighlightedLabel } from './HighlightedLabel';
import { defaultIconButtonSx, defaultLabelSx, wrapperSx } from './styles';

export const TreeItemLabelWithIcon = ({
  children,
  EndIconButtonProps,
  highlightedLabelSegment,
  LabelTypographyProps,
  StartIconProps,
  ...restProps
}: TreeItemLabelWithIconProps) => {
  const { sx: labelSx, ...restLabelTypographyProps } = LabelTypographyProps ?? {};
  const { Icon: StartIcon, IconProps: StartSvgIconProps, show: showStartIcon, testId: startIconTestId } = StartIconProps ?? {};
  const {
    Icon: EndIcon,
    IconButtonProps,
    IconProps: EndSvgIconProps,
    onClick,
    show: showEndIconButton,
    testId: endIconButtonTestId,
  } = EndIconButtonProps ?? {};

  const { fontSize: startIconSize = 'xSmall', ...restStartSvgIconProps } = StartSvgIconProps ?? {};
  const { size: iconButtonSize = 'xSmall', sx: iconButtonSx, ...restIconButtonProps } = IconButtonProps ?? {};

  const handleOnIconButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    onClick?.(event);
  };

  const renderContent = () => {
    if (typeof children !== 'string' || !highlightedLabelSegment) {
      return children;
    }

    const normalizedHighlightedSegment = highlightedLabelSegment.toLowerCase();

    const foundMatchToHighlight = children.toLowerCase().includes(normalizedHighlightedSegment);
    const isWhitespaceOnly = normalizedHighlightedSegment.trim().length === 0;

    if (!foundMatchToHighlight || isWhitespaceOnly) {
      return children;
    }

    return <HighlightedLabel labelText={children} normalizedHighlightedSegment={normalizedHighlightedSegment} />;
  };

  return (
    <Stack sx={wrapperSx} {...restProps}>
      {showStartIcon && StartIcon && <StartIcon data-testid={startIconTestId} fontSize='small' {...restStartSvgIconProps} />}
      <Typography sx={mergeSx(defaultLabelSx, labelSx)} {...restLabelTypographyProps}>
        {renderContent()}
      </Typography>
      {showEndIconButton && EndIcon && (
        <IconButton
          data-testid={endIconButtonTestId}
          sx={mergeSx(defaultIconButtonSx, iconButtonSx)}
          className={iconButtonClassName}
          onClick={handleOnIconButtonClick}
          size='small'
          {...restIconButtonProps}
        >
          <EndIcon fontSize='inherit' {...EndSvgIconProps} />
        </IconButton>
      )}
    </Stack>
  );
};
