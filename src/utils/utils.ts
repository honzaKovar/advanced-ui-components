import { SxProps, Theme } from "@mui/material/styles";

export const mergeSx = (
  ...sxProps: (SxProps<Theme> | undefined)[]
): SxProps<Theme> =>
  (sxProps || [])
    ?.filter(Boolean)
    .reduce(
      (acc: SxProps<Theme>[], sx) => [
        ...acc,
        ...(Array.isArray(sx) ? sx : [sx]),
      ],
      [],
    );

export const getComponentClassName = (
  prefix: string,
  name: string,
  suffix: string,
): string => {
  return `${prefix}${name}-${suffix}`;
};
