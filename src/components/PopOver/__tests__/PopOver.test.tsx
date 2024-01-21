import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PopoverSortOptions from '../PopOver';


test('renders PopoverSortOptions component', () => {
  const { getByText } = render(
    <PopoverSortOptions title="Sort" onClick={() => console.log('Clicked')} />
  );

  const buttonElement = getByText('Sort');
  expect(buttonElement).toBeTruthy();
});

test('calls onClick when button is clicked', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(
    <PopoverSortOptions title="Sort" onClick={onClickMock} />
  );

  const buttonElement = getByText('Sort');
  fireEvent.click(buttonElement);

  expect(onClickMock).toHaveBeenCalled();
});
