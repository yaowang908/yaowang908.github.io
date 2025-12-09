import * as React from 'react'
import clsx from 'clsx'
import { Link as TanStackLink, useRouterState } from '@tanstack/react-router'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import { styled } from '@mui/material/styles'

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({})

type TanStackLinkProps = React.ComponentProps<typeof TanStackLink>
type AnchorProps = React.ComponentPropsWithoutRef<'a'>

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
      return (
        <Anchor
          className={className}
          href={href}
          ref={ref}
          {...(other as Omit<AnchorProps, 'href' | 'ref' | 'className'>)}
        />
      )
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />
  }

  const tanStackLinkProps: Omit<TanStackLinkProps, 'to' | 'children'> = {
    className,
    ...(other as Omit<TanStackLinkProps, 'to' | 'children' | 'className'>),
  }

  if (noLinkStyle) {
    return (
      <TanStackLink to={href} {...tanStackLinkProps}>
        {(linkProps) => (
          <Anchor
            {...(linkProps as AnchorProps)}
            ref={ref}
            className={className}
          />
        )}
      </TanStackLink>
    )
  }

  return (
    <TanStackLink to={href} {...tanStackLinkProps}>
      {(linkProps) => (
        <MuiLink
          {...(linkProps as AnchorProps)}
          ref={ref}
          {...other}
          className={className}
        />
      )}
    </TanStackLink>
  )
})

export default Link
