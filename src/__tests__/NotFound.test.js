import { render, screen, fireEvent } from '@testing-library/react';
import Status from 'common/constant/status';
import Notfound from 'pages/NotFound';

describe('block test Notfound component', () => {
  test('should render component Notfound', () => {
    render(<Notfound />);
    expect(screen.getByText(`${Status.ERROR_404.title}`)).toBeInTheDocument();
  });
});
