import styled from '@mui/system/styled';
import { highlightBorderRadiusPx } from './constants';

export const Highlight = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: highlightBorderRadiusPx,
  display: 'inline',
  height: '100%',
  whiteSpace: 'pre-wrap',
}));
