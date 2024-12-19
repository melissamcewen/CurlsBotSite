import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '@/app/quiz/Quiz';
import React from 'react';

describe('Quiz', () => {
  const clickFirstAnswer = () => {
    // Get all buttons that don't contain "Take Quiz Again"
    const buttons = screen.getAllByRole('button').filter(button =>
      !button.textContent?.toLowerCase().includes('take quiz again')
    );
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
  };

  it('shows quiz interface', () => {
    render(<Quiz />);
    // Check for any answer buttons
    const answerButtons = screen.getAllByRole('button').filter(button =>
      !button.textContent?.toLowerCase().includes('take quiz again')
    );
    expect(answerButtons.length).toBeGreaterThan(0);
  });

  it('shows multiple answer options', () => {
    render(<Quiz />);
    const answerButtons = screen.getAllByRole('button').filter(button =>
      !button.textContent?.toLowerCase().includes('take quiz again')
    );
    expect(answerButtons.length).toBeGreaterThan(1);
  });

  it('shows results after completing quiz', () => {
    render(<Quiz />);
    // Complete the quiz
    for (let i = 0; i < 10; i++) {
      clickFirstAnswer();
    }
    // Check for key results elements
    const porosityElements = screen.getAllByText(/porosity/i);
    expect(porosityElements.length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /take quiz again/i })).toBeInTheDocument();
  });

  it('restarts quiz when restart button is clicked', () => {
    render(<Quiz />);
    // Complete the quiz
    for (let i = 0; i < 10; i++) {
      clickFirstAnswer();
    }
    // Click restart
    const restartButton = screen.getByRole('button', { name: /take quiz again/i });
    fireEvent.click(restartButton);
    // Verify we're back at the start by checking for answer buttons
    const answerButtons = screen.getAllByRole('button').filter(button =>
      !button.textContent?.toLowerCase().includes('take quiz again')
    );
    expect(answerButtons.length).toBeGreaterThan(1);
  });

  it('shows product recommendations in results', () => {
    render(<Quiz />);
    // Complete the quiz
    for (let i = 0; i < 10; i++) {
      clickFirstAnswer();
    }
    // Check for recommendations section
    const recommendedElements = screen.getAllByText(/recommended products/i);
    expect(recommendedElements.length).toBeGreaterThan(0);
  });
});
