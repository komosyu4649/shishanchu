import React, { FC } from 'react'
import Header from './Header'
import Menu from './Menu'

type Prosp = {
  children: React.ReactNode
}

const Layout: FC<Prosp> = ({ children }) => {
  return (
    <div>
      <Header />
      <Menu />
      <main>{children}</main>
    </div>
  )
}

export default Layout
