import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders SEER', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/SEER/i);
  expect(linkElement).toBeInTheDocument();
});
