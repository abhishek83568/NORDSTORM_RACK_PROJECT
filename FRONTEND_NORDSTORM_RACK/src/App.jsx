
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Links from './components/Links'
import ChatBot from './components/ChatBot'

function App() {


  return (
    <>
      <Navbar/>
      <Links/>
      <ChatBot/>
    </>
  )
}

export default App
