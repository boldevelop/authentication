import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './containers/App'
import reportWebVitals from './reportWebVitals'
import { UserContextProvider } from './context/UserContext/UserContext'
import { UsersDBProvider } from './context/UsersDataBase/UsersDataBaseContext'

ReactDOM.render(
  <React.StrictMode>
    <UsersDBProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </UsersDBProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
