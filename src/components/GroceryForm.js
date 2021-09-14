import React, { useRef, useEffect } from 'react';
import Alert from './Alert';

export default function GroceryForm({
  alert: { isAlertOpen, alertContent, alertType },
  currentGrocery,
  data,
  dispatch,
  isEditing,
}) {
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, [nameRef]);

  const handleChange = ({ name, value }) => {
    dispatch({
      type: 'CHANGE_CURRENT_GROCERY',
      payload: { ...currentGrocery, [name]: value },
    });
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();

    if (currentGrocery.name) {
      if (!isEditing) {
        const newGrocery = {
          ...currentGrocery,
          id: new Date().getTime().toString(),
        };
        dispatch({
          type: 'ADD_GROCERY',
          payload: { data, newGrocery },
        });

        dispatch({
          type: 'TRIGGER_ALERT',
          payload: {
            isAlertOpen: true,
            alertContent: 'Grocery added',
            alertType: 'success',
          },
        });
      } else {
        const newGroceryList = data.map((item) => {
          if (item.id === id) {
            const editedItem = { ...item, name: currentGrocery.name };
            return editedItem;
          } else {
            return item;
          }
        });

        dispatch({ type: 'CHANGE_GROCERY_LIST', payload: newGroceryList });
        dispatch({ type: 'CHANGE_IS_EDITING', payload: false });

        dispatch({
          type: 'TRIGGER_ALERT',
          payload: {
            isAlertOpen: true,
            alertContent: 'Grocery changed',
            alertType: 'success',
          },
        });
      }

      // Reset fields
      dispatch({
        type: 'CHANGE_CURRENT_GROCERY',
        payload: { ...currentGrocery, name: '' },
      });

      return;
    }

    dispatch({
      type: 'TRIGGER_ALERT',
      payload: {
        isAlertOpen: true,
        alertContent: 'Please provide a name',
        alertType: 'error',
      },
    });
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e, currentGrocery.id)}>
      <div className="form-control">
        <input
          ref={nameRef}
          className="form-item input"
          type="text"
          placeholder="e.g. eggs"
          name="name"
          value={currentGrocery.name}
          onChange={(e) => handleChange(e.target)}
        />
        <button className="form-item btn" type="submit">
          {isEditing ? 'Edit' : 'Add'}
        </button>
      </div>

      {isAlertOpen && (
        <Alert
          alertContent={alertContent}
          alertType={alertType}
          dispatch={dispatch}
        />
      )}
    </form>
  );
}
