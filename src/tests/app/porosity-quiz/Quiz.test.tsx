import Quiz from '@/app/porosity-quiz/Quiz';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Quiz', () => {
  const completeQuiz = () => {
    // Click through all questions by selecting the first answer each time
    for (let i = 0; i < 10; i++) {
      const buttons = screen.getAllByRole('button');
      const answerButton = buttons[0]; // Just click the first answer each time
      userEvent.click(answerButton);
    }
  };

  it('shows quiz interface', () => {
    render(<Quiz />);
    // Check for any answer buttons
    const answerButtons = screen.getAllByRole('button');
    expect(answerButtons.length).toBeGreaterThan(0);
  });

  it('shows multiple answer options', () => {
    render(<Quiz />);
    const answerButtons = screen.getAllByRole('button');
    expect(answerButtons.length).toBeGreaterThan(1);
  });

  it('shows results after completing quiz', () => {
    render(<Quiz />);
    completeQuiz();
    // Check for porosity type in results
    expect(screen.getByText(/porosity/i)).toBeInTheDocument();
  });

  


});
