import React from 'react';

export default function GroceryItem({
  id,
  name,
  groceryList,
  dispatch,
  modal,
}) {
  const removeItem = (id) => {
    const action = () => {
      const newGroceryList = groceryList.filter((item) => item.id !== id);
      dispatch({ type: 'REMOVE_GROCERY', payload: newGroceryList });

      // Close modal
      dispatch({ type: 'TRIGGER_MODAL', payload: { ...modal } });
    };

    const nameCharLimit = 15;
    const isGreaterThanLimit = name.length > nameCharLimit;
    const message = `Delete item "${[name]}${
      isGreaterThanLimit ? `...` : ''
    }"?`;

    dispatch({
      type: 'TRIGGER_MODAL',
      payload: {
        show: true,
        action,
        message,
        buttonContent: 'Delete',
        closeText: 'No',
      },
    });
  };

  const editItem = (name) => {
    dispatch({ type: 'CHANGE_CURRENT_GROCERY', payload: { id, name } });
    dispatch({ type: 'CHANGE_IS_EDITING', payload: true });
  };

  return (
    <li className="grocery-list-item">
      <p className="grocery-list-item-name">{name}</p>
      <div>
        <button
          className="grocery-list-item-btn"
          onClick={() => editItem(name)}
        >
          Edit
        </button>
        <button
          className="grocery-list-item-btn danger"
          onClick={() => removeItem(id)}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
