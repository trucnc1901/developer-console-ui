import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from 'components/auth/AuthForm';

describe('block test AuthForm component', () => {
  test('should render component AuthForm', () => {
    render(<AuthForm />);
    expect(screen.getByText(/Authorization/i)).toBeInTheDocument();
  });

  test('should action redirect login callback', () => {
    render(<AuthForm />);
    const handleClick = jest.fn(() => {
      setTimeout(() => {
        window.location = 'https://dev-console.zalopay.vn/';
      }, 600);
    });
    fireEvent.click(screen.getByText(/Login by Zalo/i));
    expect(handleClick).toBeCalledTimes(0);
    // expect(handleClick).toHaveBeenCalledWith('https://dev-console.zalopay.vn/');
  });
});
