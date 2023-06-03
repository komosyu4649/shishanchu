import React, { FC } from 'react'
import Header from './Header'

type Prosp = {
  children: React.ReactNode
}

const Layout: FC<Prosp> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
