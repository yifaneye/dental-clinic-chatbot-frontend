import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dental Chatbot title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Dental Chatbot/i);
  expect(linkElement).toBeInTheDocument();
});
