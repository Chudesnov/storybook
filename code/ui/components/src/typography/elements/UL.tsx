import { styled } from '@junk-temporary-prototypes/theming';
import type { CSSObject } from '@junk-temporary-prototypes/theming';
import { withReset, withMargin } from '../lib/common';

const listCommon: CSSObject = {
  paddingLeft: 30,
  '& :first-of-type': {
    marginTop: 0,
  },
  '& :last-child': {
    marginBottom: 0,
  },
};

export const UL = styled.ul(withReset, withMargin, { ...listCommon, listStyle: 'disc' });