import React, { useState } from 'react'
import ModalBtnContainer from '../../components/Shared/ModalBtnContainer'
import classes from './EditNodeModal.module.scss'
export const EditNodeModal = (props) => {
  const [profile, setprofile] = useState({ ...props.currentNode })

  const inputProfileHandler = (event) => {
    const profileCopy = { ...profile }
    profileCopy[event.target.name] = event.target.value
    setprofile(profileCopy)
  }
  const findNode = (category, currentNode, profile) => {
    if (category.id === currentNode.id) {
      category.category = profile.category
      category.price = Number(profile.price)
      category.totalPrice = Number(profile.price)

      return category
    } else {
      category.descendants.map((node, index) => {
        if (node.id === currentNode.id) {
          category.totalPrice += Number(profile.price - node.price)

          node.price = Number(profile.price)
          node.category = profile.category
          node.totalPrice = Number(profile.price)
          return category
        } else {
          return findNode(node, currentNode, profile)
        }
      })
    }
    return category
  }
  const editNodeHandler = (event) => {
    const categoryCopy = { ...props.category }
    const categoriesCopy = [...props.categories]
    event.preventDefault()
    categoriesCopy[props.categoryIndex] = findNode(
      categoryCopy,
      props.currentNode,
      profile
    )
    props.setCategories(categoriesCopy)
    props.settreeEditNodeId(null)
  }
  const cancelEditNodeHandler = () => {
    props.settreeEditNodeId(null)
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
      onClick: cancelEditNodeHandler,
    },
  ]
  return (
    <div className={classes.formContainer}>
      <form
        action=''
        className={classes.addNodeModalForm}
        onSubmit={(event) => editNodeHandler(event)}
      >
        <input
          type='text'
          placeholder='Enter New Category Name'
          onChange={inputProfileHandler}
          name='category'
          value={profile.category}
        />
        <input
          type='number'
          placeholder='Enter New Product Price'
          onChange={inputProfileHandler}
          name='price'
          value={profile.price}
        />
        <ModalBtnContainer
          buttons={btnArray}
          containerType='modalBtnContainer'
        />
      </form>
    </div>
  )
}
