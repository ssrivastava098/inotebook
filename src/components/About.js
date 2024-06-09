import React from 'react'
import { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'
import Navbar from './Navbar'

const About = () => {
  const a = useContext(noteContext)
  return (
    <div>
      <Navbar />
      This is about {a.name}
    </div>
  )
}

export default About
