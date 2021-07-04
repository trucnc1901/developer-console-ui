import { render, screen, fireEvent, act } from '@testing-library/react';
import AuthForm from 'components/login/AuthForm';

describe('block test AuthForm component', () => {
  it('should action redirect login callback', async () => {
    const mockClick = jest.fn();
    render(<AuthForm handleClick={mockClick} />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(mockClick).toHaveBeenCalled();
  });
});
