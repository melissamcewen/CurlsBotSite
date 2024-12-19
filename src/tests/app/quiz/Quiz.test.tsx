import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '@/app/quiz/Quiz';
import React from 'react';

describe('Quiz', () => {
  const clickFirstAnswer = () => {
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
  };

  it('renders initial quiz state', () => {
    render(<Quiz />);
    expect(screen.getByText(/take this quiz to determine your hair porosity level/i)).toBeInTheDocument();
  });

  it('progresses through questions', () => {
    render(<Quiz />);
    clickFirstAnswer();
    expect(screen.getByText(/question 2 of/i)).toBeInTheDocument();
  });

  it('shows result after completing quiz', () => {
    render(<Quiz />);
    // Complete the quiz by clicking first answer for each question
    for (let i = 0; i < 10; i++) {
      clickFirstAnswer();
    }
    // Should show result text that includes "Based on your answers"
    expect(screen.getByText(/based on your answers/i)).toBeInTheDocument();
  });

  it('allows restarting the quiz', () => {
    render(<Quiz />);
    // Complete the quiz
    for (let i = 0; i < 10; i++) {
      clickFirstAnswer();
    }

    const restartButton = screen.getByRole('button', { name: /take quiz again/i });
    fireEvent.click(restartButton);
    expect(screen.getByText(/take this quiz to determine your hair porosity level/i)).toBeInTheDocument();
  });

  it('shows product recommendations after completion', () => {
    render(<Quiz />);
    // Complete the quiz
    for (let i = 0; i < 10; i++) {
      clickFirstAnswer();
    }

    expect(screen.getByRole('heading', { name: /recommended products for your hair type/i })).toBeInTheDocument();
  });
});
