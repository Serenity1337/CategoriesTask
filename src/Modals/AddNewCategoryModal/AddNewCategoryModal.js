import React, { useState, useEffect } from 'react'
import ErrorMsg from '../../components/Shared/ErrorMsg'
import ModalBtnContainer from '../../components/Shared/ModalBtnContainer'
import classes from './AddNewCategoryModal.module.scss'
export const AddNewCategoryModal = (props) => {
  const [profile, setprofile] = useState({
    id: new Date().getTime(),
    descendants: [],
    price: 0,
    totalPrice: 0,
  })
  const [msgError, setMsgError] = useState('')

  const inputProfileHandler = (event) => {
    const profileCopy = { ...profile }
    profileCopy[event.target.name] = event.target.value
    setprofile(profileCopy)
  }
  const cancelNodeHandler = () => {
    props.setNewCategory(false)
  }

  const addNewCategory = (event) => {
    event.preventDefault()
    if (profile.category) {
      profile.price = Number(profile.price)
      const categoriesCopy = [...props.categories, profile]
      props.setCategories(categoriesCopy)
      props.setNewCategory(false)
    } else {
      setMsgError('Please provide a name for Category')
    }
  }

  const btnArray = [
    {
      type: 'submit',
      text: 'Save',
      stylesClass: 'save',
    },
    {
      type: '',
      text: 'Cancel',
      stylesClass: 'cancel',
      onClick: cancelNodeHandler,
    },
  ]

  return (
    <div className={classes.formContainer}>
      <form
        action=''
        className={classes.addNodeModalForm}
        onSubmit={(event) => addNewCategory(event)}
      >
        <input
          type='text'
          placeholder='Enter Category Name'
          onChange={inputProfileHandler}
          name='category'
        />
        <input
          type='number'
          placeholder='Enter Product Price'
          onChange={inputProfileHandler}
          name='price'
        />
        <ModalBtnContainer
          buttons={btnArray}
          containerType='modalBtnContainer'
        />
        <ErrorMsg msg={msgError} />
      </form>
    </div>
  )
}
