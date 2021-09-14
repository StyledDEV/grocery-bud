import React, { useReducer, useEffect } from 'react';
import GroceryForm from './components/GroceryForm';
import GroceryList from './components/GroceryList';
import Modal from './components/Modal';
import { reducer } from './reducer';

const defaultState = {
  data: [],
  currentGrocery: { name: '' },
  alert: { isOpen: false, content: '', type: '' },
  modal: {
    show: false,
    action: null,
    message: '',
    buttonContent: '',
    closeText: '',
  },
  isEditing: false,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { data, currentGrocery, alert, modal, isEditing } = state;

  useEffect(() => {
    const localGrocery = JSON.parse(localStorage.getItem('tasks'));
    if (localGrocery) {
      dispatch({
        type: 'CHANGE_GROCERY_LIST',
        payload: localGrocery,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(data));
  }, [data]);

  const clearGroceryList = () => {
    const action = () => {
      dispatch({ type: 'CHANGE_GROCERY_LIST', payload: [] });
      // Close modal
      dispatch({ type: 'TRIGGER_MODAL', payload: { ...modal } });
    };

    dispatch({
      type: 'TRIGGER_MODAL',
      payload: {
        show: true,
        action,
        message: 'You want to delete all the elements?',
        buttonContent: 'Delete all',
        closeText: 'No',
      },
    });
  };

  return (
    <main className="container">
      <h1 className="title">Grocery Bud</h1>

      <GroceryForm
        alert={{ ...alert }}
        currentGrocery={currentGrocery}
        data={data}
        isEditing={isEditing}
        dispatch={dispatch}
      />
      {data.length ? (
        <div>
          <button className="btn danger" onClick={clearGroceryList}>
            Clear list
          </button>
          <GroceryList data={data} {...modal} dispatch={dispatch} />
        </div>
      ) : (
        <p>Nothing here.. try adding your first item</p>
      )}
      {modal.show && <Modal {...modal} dispatch={dispatch} />}
    </main>
  );
}
