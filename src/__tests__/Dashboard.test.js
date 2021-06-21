import { render, screen } from '@testing-library/react';
import Dashboard from 'pages/Dashboard';

describe('block test Dashboard component', () => {
  test('should render component Dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
