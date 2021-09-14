import React from 'react';
import GroceryItem from './GroceryItem';

export default function GroceryList({ data, dispatch, modal }) {
  return (
    <ul className="grocery-list">
      {data.map((item) => (
        <GroceryItem
          key={item.id}
          {...item}
          groceryList={data}
          {...modal}
          dispatch={dispatch}
        />
      ))}
    </ul>
  );
}
