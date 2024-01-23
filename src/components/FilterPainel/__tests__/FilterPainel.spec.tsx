import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterPanel from '../FilterPainel';

test('renders FilterPanel component', () => {
  const { getByText, getByLabelText } = render(<FilterPanel />);

  const titleElement = getByText('Filtros');
  const addButtonElement = getByText('Adicionar filtro');
  const applyButtonElement = getByText('Aplicar filtros');

  expect(titleElement).toBeDefined();
  expect(addButtonElement).toBeDefined();
  expect(applyButtonElement).toBeDefined();
});

test('adds a new filter when "Adicionar filtro" button is clicked', () => {
  const { getByText, getByLabelText } = render(<FilterPanel />);

  const addButtonElement = getByText('Adicionar filtro');

  fireEvent.click(addButtonElement);

  const filterColumnSelect = getByLabelText('Coluna');
  const filterOperatorSelect = getByLabelText('Operador');
  const filterValueInput = getByLabelText('Valor');

  expect(filterColumnSelect).toBeDefined();
  expect(filterOperatorSelect).toBeDefined();
  expect(filterValueInput).toBeDefined();
});

test('removes a filter when delete button is clicked', () => {
  const { getByText, getByLabelText, queryByText } = render(<FilterPanel />);

  const addButtonElement = getByText('Adicionar filtro');
  fireEvent.click(addButtonElement);

  const deleteButtonElement = getByLabelText('Delete Icon');
  fireEvent.click(deleteButtonElement);

  const filterColumnSelect = queryByText('Coluna');
  const filterOperatorSelect = queryByText('Operador');
  const filterValueInput = queryByText('Valor');

  expect(filterColumnSelect).toBeNull();
  expect(filterOperatorSelect).toBeNull();
  expect(filterValueInput).toBeNull();
});

test('applies filters when "Aplicar filtros" button is clicked', () => {
  const { getByText, getByLabelText, queryByText } = render(<FilterPanel />);

  const addButtonElement = getByText('Adicionar filtro');
  fireEvent.click(addButtonElement);

  const applyButtonElement = getByText('Aplicar filtros');
  fireEvent.click(applyButtonElement);

});
