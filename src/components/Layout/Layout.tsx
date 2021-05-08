import React from 'react'
import css from './Layout.module.css'
import { Header } from '../Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container h-full pt-20">
        <div className="flex justify-center">
          <div className={css.form}>{children}</div>
        </div>
      </main>
    </>
  )
}

export { Layout }
