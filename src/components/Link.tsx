import * as React from 'react'
import clsx from 'clsx'
import { Link as TanStackLink, useRouterState } from '@tanstack/react-router'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import { styled } from '@mui/material/styles'

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({})

export type LinkProps = {
  activeClassName?: string
  href: string
  noLinkStyle?: boolean
} & Omit<MuiLinkProps, 'href'>

// A styled version compatible with TanStack Router
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref
) {
  const {
    activeClassName = 'active',
    className: classNameProps,
    href,
    noLinkStyle,
    ...other
  } = props

  const router = useRouterState()
  const pathname = router.location.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: pathname === href && activeClassName,
  })

  const isExternal =
    typeof href === 'string' &&
    (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0)

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...(other as any)} />
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />
  }

  if (noLinkStyle) {
    return (
      <TanStackLink
        to={href}
        className={className}
        {...(other as any)}
      >
        {(linkProps) => <Anchor {...linkProps} ref={ref} />}
      </TanStackLink>
    )
  }

  return (
    <TanStackLink
      to={href}
      className={className}
      {...(other as any)}
    >
      {(linkProps) => (
        <MuiLink {...(linkProps as any)} ref={ref} {...other} />
      )}
    </TanStackLink>
  )
})

export default Link
