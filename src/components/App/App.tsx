import React, { FC } from 'react'
import logo from './logo.svg'
import css from './App.module.css'
import Header from '../Header'

const App: FC = () => (
  <div className={css.App}>
    <Header />
    <header className={css.AppHeader}>
      <img src={logo} className={css.AppLogo} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className={css.AppLink}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
)

export default App
