import React from 'react'
import classes from './ErrorMsg.module.scss'
export const ErrorMsg = ({ msg }) => {
  return <div className={classes.errorMsg}>{msg}</div>
}
