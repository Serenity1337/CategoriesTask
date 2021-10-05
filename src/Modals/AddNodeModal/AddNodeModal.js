import React, { useState, useEffect } from 'react'
import ModalBtnContainer from '../../components/Shared/ModalBtnContainer'
import classes from './AddNodeModal.module.scss'
export const AddNodeModal = (props) => {
  const [profile, setprofile] = useState({
    id: new Date().getTime(),
    descendants: [],
    price: 0,
    totalPrice: 0,
    ascendant: {},
  })

  const inputProfileHandler = (event) => {
    const profileCopy = { ...profile }
    profileCopy[event.target.name] = event.target.value
    setprofile(profileCopy)
  }
  const cancelNodeHandler = () => {
    props.settreeNodeId(null)
  }
  const findNode = (category, currentNode, profile) => {
    if (category.id === currentNode.id) {
      profile.ascendant = category
      profile.totalPrice = Number(profile.price)
      category.descendants = [...category.descendants, profile]
      category.totalPrice += Number(profile.totalPrice)
      return category
    } else {
      category.descendants.map((node, index) => {
        if (node.id === currentNode.id) {
          profile.price = Number(profile.price)
          profile.totalPrice = Number(profile.price)
          profile.ascendant = node
          node.descendants = [...node.descendants, profile]
          node.totalPrice += Number(profile.totalPrice)
          return category
        } else {
          return findNode(node, currentNode, profile)
        }
      })
    }
    return category
  }
  const addNodeHandler = (event) => {
    event.preventDefault()
    const categoryCopy = { ...props.category }
    const profileCopy = { ...profile }
    const categoriesCopy = [...props.categories]
    categoriesCopy[props.categoryIndex] = findNode(
      categoryCopy,
      props.currentNode,
      profileCopy
    )
    props.setCategories(categoriesCopy)
    props.settreeNodeId(null)
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
        onSubmit={(event) => addNodeHandler(event)}
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
      </form>
    </div>
  )
}
