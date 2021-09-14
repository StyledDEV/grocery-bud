export const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === 'CHANGE_CURRENT_GROCERY') {
    return { ...state, currentGrocery: payload };
  }

  if (type === 'ADD_GROCERY') {
    const { data, newGrocery } = payload;
    return { ...state, data: [...data, newGrocery] };
  }

  // Do the same (replace the whole grocery list)
  if (type === 'REMOVE_GROCERY' || type === 'CHANGE_GROCERY_LIST') {
    return { ...state, data: payload };
  }

  if (type === 'TRIGGER_ALERT') {
    return { ...state, alert: { ...payload } };
  }

  if (type === 'TRIGGER_MODAL') {
    return {
      ...state,
      modal: { ...payload },
    };
  }

  if (type === 'CHANGE_IS_EDITING') {
    return { ...state, isEditing: payload };
  }

  throw new Error('no action matching');
};
