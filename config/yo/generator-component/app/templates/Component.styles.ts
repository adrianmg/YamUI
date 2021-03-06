/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import { mergeStyleSets, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { <%= name %>Type } from './<%= name %>.types';

export interface <%= name %>ClassNameProps {
  type?: <%= name %>Type;
  theme: ITheme;
}

export const getClassNames = memoizeFunction((classNameProps: <%= name %>ClassNameProps) => {
  const { type, theme } = classNameProps;

  return mergeStyleSets({
    root: {
      color: type === <%= name %>Type.BLACK ? theme.palette.black : theme.palette.white,
      backgroundColor: type === <%= name %>Type.BLACK ? theme.palette.white : theme.palette.black,
    },
  });
});
