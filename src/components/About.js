import React from 'react'
import { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'

const About = () => {
  const a = useContext(noteContext)
  return (
    <div>
      This is about {a.name}
    </div>
  )
}

export default About
