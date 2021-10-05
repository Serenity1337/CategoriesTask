import React from 'react'
import classes from './Button.module.scss'
export const Button = ({ type, onClick, text, stylesClass }) => {
  return (
    <button
      className={classes[stylesClass]}
      type={type ? type : 'button'}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
