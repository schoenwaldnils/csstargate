import styled from '@emotion/styled'
import NextLink, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, FC } from 'react'

import { colors } from '../../data/colors'

const StyledA = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;

  &,
  &:visited,
  :hover,
  :active {
    color: ${colors.orange};
  }

  :hover {
    text-decoration: underline;
  }
`

export const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps> = ({
  href,
  children,
  className,
  ...p
}) => {
  const isExternal = href.includes('http')

  return (
    <NextLink {...p} href={href} passHref={isExternal}>
      <StyledA
        href={href}
        className={className}
        target={isExternal ? '_blank' : '_self'}
      >
        {children}
      </StyledA>
    </NextLink>
  )
}
