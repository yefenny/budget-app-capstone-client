import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Expense from './Expense';

it('render Expense without problem', () => {
  const object = {
    id: 1,
    date: new Date(),
    description: 'Description 1',
    amount: 0,
    category: 'Category 1'
  };
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Expense object={object} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
