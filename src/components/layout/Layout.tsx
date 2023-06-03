import React, { FC } from 'react'
import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

type Prosp = {
  children: React.ReactNode
}

const Layout: FC<Prosp> = ({ children }) => {
  return (
    <div>
      <Header />
      <Menu />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
