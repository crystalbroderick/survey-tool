import React from 'react'
import RadioGroupRating from './RadioGroupRating'
import { TextField } from '@mui/material'
export default function questionType({type}) {
    switch(type) {
      case 'rating':
        return <RadioGroupRating/>
      case 'short':
        return <TextField fullWidth id="fullWidth" placeholder="Enter short response here" variant="standard" />
      default:
        return "No Question Type found."
    }
  }