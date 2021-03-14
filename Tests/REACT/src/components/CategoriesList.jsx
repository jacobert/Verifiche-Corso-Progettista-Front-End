import React from 'react'
import CategoryButton from './CategoryButton'

const CategoriesList = ({ categories, onCategoryClick }) => {
    return categories.map((category, index) => <CategoryButton key={index} title={category} onClick={onCategoryClick} />)
  }

export default CategoriesList