'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Typography } from '@mui/material'

function AnimatedText({ text }) {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (text && index < text.length) {
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) => prev + text[index])
        setIndex((prev) => prev + 1)
      }, 10) // Adjust typing speed here (milliseconds per character)
      return () => clearInterval(intervalRef.current)
    } else if (index >= text.length) {
      clearInterval(intervalRef.current)
    }
  }, [text, index])

  return <Typography style={{ whiteSpace: 'pre-line' }}>{displayText.replace(/\\n/g, '\n')}</Typography>
}

export default AnimatedText
