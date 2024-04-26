import React from 'react';
import { render } from '@testing-library/react';
import Header from '@/app/components/Header';
import '@testing-library/jest-dom'

test('renders Header component', () => {
  const { getByText } = render(<Header />);

  const headerText = getByText(/mks/i); 
  
  expect(headerText).toBeInTheDocument();
});