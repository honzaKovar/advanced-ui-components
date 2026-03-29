import { SxProps, Theme } from '@mui/material';

import { iconButtonClassName } from '../../constants';

const createOpacityTransition = (transitions: Theme['transitions']) =>
  transitions.create('opacity', {
    duration: transitions.duration.standard,
  });

export const wrapperSx: SxProps<Theme> = ({ transitions }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  flexGrow: 1,
  gap: 1.5,
  justifyContent: 'space-between',
  [`&:hover .${iconButtonClassName}`]: {
    opacity: 1,
  },
  transition: createOpacityTransition(transitions),
});

export const defaultLabelSx: SxProps<Theme> = {
  mr: 'auto',
};

export const defaultIconButtonSx: SxProps<Theme> = ({ transitions }) => ({
  opacity: 0,
  transition: createOpacityTransition(transitions),
});
