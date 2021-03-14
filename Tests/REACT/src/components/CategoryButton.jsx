import React from 'react'

const CategoryButton = ({ title, onClick }) => {
    return (
      <button className="Cat-button" href="#" onClick={onClick(title)}>
        <code>{title}</code>
      </button>
    )
  }

export default CategoryButton