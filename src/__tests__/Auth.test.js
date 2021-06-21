import { render, screen } from '@testing-library/react';
import Auth from 'components/auth/Auth';

test('should render Auth component', () => {
  render(<Auth />);
  expect(screen.getByText('Authorization')).toBeInTheDocument();
});
