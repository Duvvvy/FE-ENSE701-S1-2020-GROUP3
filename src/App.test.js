import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders SEER', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  const linkElement = getByText(/Evidence-based software engineering/i);
  expect(linkElement).toBeInTheDocument();
});
