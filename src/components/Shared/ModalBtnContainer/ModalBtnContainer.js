import React from 'react'
import classes from './ModalBtnContainer.module.scss'
import Button from '../Button'
export const ModalBtnContainer = (props) => {
  const { buttons, containerType } = props
  return (
    <div className={classes[containerType]}>
      {buttons.map((button) => (
        <Button
          type={button.type}
          stylesClass={button.stylesClass}
          onClick={button.onClick}
          text={button.text}
        />
      ))}
    </div>
  )
}
