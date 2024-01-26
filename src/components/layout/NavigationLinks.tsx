import { useLingui } from '@lingui/react'
import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { getNavLinks } from '@/config/AppMetadata'

type NavLinkProps = {
  href: string
  title: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, title }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  const { _: trans } = useLingui()

  return (
    <Link
      href={href}
      className={classnames('ph-color-accent mr-4 underline-offset-4 sm:mr-6', {
        'font-bold underline': isActive,
        'hover:underline': !isActive,
      })}
    >
      {trans(title)}
    </Link>
  )
}

const NavigationLinks = () => {
  return (
    <>
      {getNavLinks().map((link) => (
        <NavLink key={link.href} href={link.href} title={link.title} />
      ))}
    </>
  )
}

export default NavigationLinks
