import React from 'react';

const Joke = ({ propsValue, propsCategories }) => {
    return (
        <>              
            <div className="Joke">
                <code className="Joke-Value">{propsValue === undefined ? 'Usa la barra di ricerca per cercare le migliori barzellette su Chuck Norris!' : propsValue}</code> 
            </div>
            {Array.isArray(propsCategories) && propsCategories.map((category, index) =>
                <div className="Cat-button" key={index}>
                    <code>{category}</code>
                </div>
            )}
        </>

    )
  }

export default Joke