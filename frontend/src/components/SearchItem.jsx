import React, { useState } from 'react';

function SearchItem(props) {
  const [text, setText] = useState('');

  const handleUpdate = (event) => {
    setText(event.target.value);
  };

  const handleOnClick = () => {
    props.sendTextToSearchItem(props.id, text);
    props.setEdit(false);
  };

  return (
    <>
      {props.edit ? (
        // Render the edit mode of SearchItem
        <div
          style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}
        >
          <input
            type='text'
            onChange={handleUpdate}
          />
          <button
            style={{ marginLeft: '10px' }}
            onClick={handleOnClick}
          >
            Update Todo
          </button>
        </div>
      ) : (
        // Render the normal mode of SearchItem
        <div
          style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}
        >
          <input
            type='text'
            onChange={handleUpdate}
          />
          <button
            style={{ marginLeft: '10px' }}
            onClick={() => props.createTodo(text)}
          >
            Add Todo
          </button>
        </div>
      )}
    </>
  );
}

export default SearchItem;
