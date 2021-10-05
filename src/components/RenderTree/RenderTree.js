import React, { useState, useEffect } from 'react'
import classes from './RenderTree.module.scss'
import AddNodeModal from '../../Modals/AddNodeModal'
import EditNodeModal from '../../Modals/EditNodeModal'
import Button from '../Shared/Button'
export const RenderTree = (props) => {
  const { categories, setCategories, categoryIndex, category } = props
  const [treeNodeId, settreeNodeId] = useState(Number)
  const [treeEditNodeId, settreeEditNodeId] = useState(Number)
  const [rerender, setRerender] = useState(null)
  const toggleFormModal = (currentNode) => {
    settreeNodeId(currentNode.id)
  }
  const toggleEditFormModal = (currentNode) => {
    settreeEditNodeId(currentNode.id)
  }
  const calculatePrices = (category) => {
    if (category.descendants.length > 0) {
      category.totalPrice = 0
      category.descendants.map((node, index) => {
        if (node.descendants.length > 0) {
          const newCategory = calculatePrices(node)
          category.totalPrice += Number(newCategory.totalPrice)
        } else {
          category.totalPrice += Number(node.totalPrice)
          return category
        }
      })
    }
    return category
  }

  const deleteNode = (category, currentNode) => {
    if (category.id === currentNode.id) {
      return null
    } else {
      category.descendants.map((node, index) => {
        if (node.id === currentNode.id) {
          category.totalPrice -= node.totalPrice
          category.descendants.splice(index, 1)
          return category
        } else {
          return deleteNode(node, currentNode)
        }
      })
    }
    return category
  }

  useEffect(() => {
    const categoriesClone = [...categories]
    if (categories.length > 0) {
      categoriesClone[categoryIndex] = calculatePrices(category)
      setCategories(categoriesClone)
    }
  }, [rerender, category])

  const deleteNodeHandler = (currentNode) => {
    const categoriesClone = [...categories]
    if (deleteNode(category, currentNode) === null) {
      categoriesClone.splice(categoryIndex, 1)
    } else {
      categoriesClone[categoryIndex] = deleteNode(category, currentNode)
    }
    setCategories(categoriesClone)
    setRerender(currentNode.id)
  }

  const RenderTreeHandler = (currentNode) => {
    const elements = []
    currentNode.descendants.map((profile, index) => {
      elements.push(RenderTreeHandler(profile))
    })
    return (
      <div className={classes.container}>
        <div className={classes.profile}>
          <h1 className={classes.categoryHeading}>
            Category: {currentNode.category}
            {currentNode.ascendant ? (
              <span className={classes.subCategory}>
                Sub-Category of: {currentNode.ascendant.category}
              </span>
            ) : null}
          </h1>
          <h1 className={classes.categoryPrice}>
            Total price for this category:&nbsp;
            {currentNode.price > 0 ? currentNode.price : currentNode.totalPrice}
            €
          </h1>
          <div className={classes.buttonsContainer}>
            {currentNode.price === 0 ? (
              <Button
                type=''
                stylesClass='add'
                onClick={() => toggleFormModal(currentNode)}
                text='Add New Sub-Category'
              />
            ) : null}
            <Button
              type=''
              stylesClass='delete'
              onClick={() => deleteNodeHandler(currentNode)}
              text='Delete A Category'
            />
            <Button
              type=''
              stylesClass='edit'
              onClick={() => toggleEditFormModal(currentNode)}
              text='Edit A Category'
            />
          </div>
        </div>
        {treeNodeId === currentNode.id ? (
          <AddNodeModal
            category={category}
            currentNode={currentNode}
            settreeNodeId={settreeNodeId}
            setCategories={setCategories}
            categoryIndex={categoryIndex}
            categories={categories}
          />
        ) : null}
        {treeEditNodeId === currentNode.id ? (
          <EditNodeModal
            category={category}
            currentNode={currentNode}
            settreeEditNodeId={settreeEditNodeId}
            categoryIndex={categoryIndex}
            setCategories={setCategories}
            categories={categories}
          />
        ) : null}
        <div className={classes.profileDescendants}>{elements}</div>
      </div>
    )
  }

  return <div>{category ? RenderTreeHandler(category) : null}</div>
}
