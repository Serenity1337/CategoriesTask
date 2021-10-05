import React, { useState, useEffect } from 'react'
import RenderTree from '../../components/RenderTree'
import Button from '../../components/Shared/Button'
import AddNewCategoryModal from '../../Modals/AddNewCategoryModal'

export const CategoriesTask = () => {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState(false)
  const newCategoryHandler = () => {
    setNewCategory(true)
  }
  return (
    <div>
      <Button
        type=''
        text='Create New Category'
        stylesClass='newCategory'
        onClick={newCategoryHandler}
      />
      {categories.length > 0
        ? categories.map((category, categoryIndex) => (
            <RenderTree
              categories={categories}
              setCategories={setCategories}
              category={category}
              categoryIndex={categoryIndex}
            />
          ))
        : null}
      {newCategory ? (
        <AddNewCategoryModal
          setNewCategory={setNewCategory}
          categories={categories}
          setCategories={setCategories}
        />
      ) : null}
    </div>
  )
}
