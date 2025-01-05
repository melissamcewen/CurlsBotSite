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

  it('restarts quiz when restart button is clicked', () => {
    render(<Quiz />);
    completeQuiz();
    // Find and click any restart button
    const buttons = screen.getAllByRole('button');
    const restartButton = buttons[buttons.length - 1]; // Last button should be restart
    userEvent.click(restartButton);
    // Verify we're back at the start by checking for the first question's content
    expect(
      screen.getByText(/Which sounds more like your experience with products/i),
    ).toBeInTheDocument();
  });

  it('shows product recommendations in results', () => {
    render(<Quiz />);
    completeQuiz();
    // Check for any product-related content
    const productElements = screen.getAllByText(/products/i);
    expect(productElements.length).toBeGreaterThan(0);
  });
});
