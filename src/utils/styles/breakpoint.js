/* @flow */
import React from 'react'
import Media from 'react-media'
import { css } from 'styled-components'
import type { Node } from 'react'

type BreakPointName = 'medium' | 'large'

// These breakpoints values represent minimum screen sizes.
// Small screen sizes should be targetted by default (mobile first).
const BREAKPOINTS: { [BreakPointName]: number } = {
  medium: 768,
  large: 1170,
}

// CSS breakpoints
export const breakpoint = (name: BreakPointName, styles: string) => css`
  @media (min-width: ${BREAKPOINTS[name]}px) {
    ${styles};
  }
`

// Rendering breakpoints
export const BreakPoint = ({
  from,
  to,
  children,
  ...props
}: {
  from: BreakPointName | '',
  to: BreakPointName | '',
  children: Node,
}) => {
  const names = ['medium', 'large']
  const query = {}
  if (from && names.includes(from)) {
    query.minWidth = BREAKPOINTS[from]
  }
  if (to && names.includes(to)) {
    query.maxWidth = BREAKPOINTS[to] - 1
  }
  return (
    <Media query={query} defaultMatches={false} {...props}>
      {ok => (ok ? children : null)}
    </Media>
  )
}

BreakPoint.defaultProps = {
  to: '',
  from: '',
}
