import { render, screen } from '@testing-library/react';
import Profile from 'pages/Profile';

describe('block test Profile component', () => {
  test('should render component Profile', () => {
    render(<Profile />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
