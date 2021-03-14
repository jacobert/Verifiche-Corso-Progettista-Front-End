import React from 'react';

const Joke = ({ value, categories }) => {
    return (
      <div className="Joke">
        <code className="Joke-Value">{value}</code>
        <p>categories: {categories.map((cat, idx) =>
          <span className="Selected-Cat" key={idx}><code>{cat}</code></span>
        )}</p>
      </div>
    )
  }

export default Joke