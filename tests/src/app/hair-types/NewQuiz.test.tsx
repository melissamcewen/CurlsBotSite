import { describe, expect, test, beforeEach } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewQuiz from '@/app/hair-types/quiz/NewQuiz';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('NewQuiz Component', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  describe('Initial render', () => {
    test('renders quiz start screen', () => {
      render(<NewQuiz />);
      // The component initializes with the first question, so we check for that
      expect(
        screen.getByText(/does your hair dry perfectly straight/i),
      ).toBeInTheDocument();
    });
  });

  describe('Quiz flow - Straight path', () => {
    test('straight gate question appears on initial render', () => {
      render(<NewQuiz />);
      expect(
        screen.getByText(
          /does your hair dry perfectly straight/i,
        ),
      ).toBeInTheDocument();
    });

    test('selecting Yes on straight gate redirects to straight result', async () => {
      render(<NewQuiz />);
      expect(
        screen.getByText(
          /does your hair dry perfectly straight/i,
        ),
      ).toBeInTheDocument();

      // Click Yes radio button
      const yesRadio = screen.getByRole('radio', { name: /yes/i });
      fireEvent.click(yesRadio);

      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).not.toBeDisabled();
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/hair-types/quiz/straight');
      });
    });
  });

  describe('Quiz flow - Waves path', () => {
    test('primary pattern question appears after No on straight gate', async () => {
      render(<NewQuiz />);
      expect(
        screen.getByText(/does your hair dry perfectly straight/i),
      ).toBeInTheDocument();

      const noRadio = screen.getByRole('radio', { name: /no/i });
      fireEvent.click(noRadio);

      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(
          screen.getByText(/what's your most common hair pattern/i),
        ).toBeInTheDocument();
      });
    });

    test('can select Waves pattern', async () => {
      render(<NewQuiz />);
      expect(
        screen.getByText(/does your hair dry perfectly straight/i),
      ).toBeInTheDocument();

      const noRadio = screen.getByRole('radio', { name: /no/i });
      fireEvent.click(noRadio);
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(
          screen.getByText(/what's your most common hair pattern/i),
        ).toBeInTheDocument();
      });

      const wavesOption = screen.getByText(/^Waves$/i);
      expect(wavesOption).toBeInTheDocument();
    });

    test('Waves only path completes and redirects', async () => {
      render(<NewQuiz />);

      // Answer straight gate
      expect(
        screen.getByText(/does your hair dry perfectly straight/i),
      ).toBeInTheDocument();
      const noRadio = screen.getByRole('radio', { name: /no/i });
      fireEvent.click(noRadio);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Select Waves
      await waitFor(() => {
        expect(
          screen.getByText(/what's your most common hair pattern/i),
        ).toBeInTheDocument();
      });
      const wavesRadio = screen.getByRole('radio', { value: 'waves' });
      fireEvent.click(wavesRadio);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Skip additional patterns (none selected)
      await waitFor(() => {
        expect(
          screen.getByText(/do you have any other curl pattern types/i),
        ).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Should redirect to swavy result
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/hair-types/quiz/swavy');
      });
    });
  });

  describe('Quiz flow - Curls path', () => {
    test('Curls path asks for shrinkage when no additional patterns', async () => {
      render(<NewQuiz />);

      // Answer straight gate
      expect(
        screen.getByText(/does your hair dry perfectly straight/i),
      ).toBeInTheDocument();
      const noRadio = screen.getByRole('radio', { name: /no/i });
      fireEvent.click(noRadio);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Select Curls
      await waitFor(() => {
        expect(
          screen.getByText(/what's your most common hair pattern/i),
        ).toBeInTheDocument();
      });
      const curlsRadio = screen.getByRole('radio', { value: 'curls' });
      fireEvent.click(curlsRadio);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Skip additional patterns
      await waitFor(() => {
        expect(
          screen.getByText(/do you have any other curl pattern types/i),
        ).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Should ask for shrinkage
      await waitFor(() => {
        expect(
          screen.getByText(/how much does your hair shrink/i),
        ).toBeInTheDocument();
      });
    });

    test('Curls + shrinkage path completes', async () => {
      render(<NewQuiz />);

      // Answer straight gate
      expect(
        screen.getByText(/does your hair dry perfectly straight/i),
      ).toBeInTheDocument();
      const noRadio = screen.getByRole('radio', { name: /no/i });
      fireEvent.click(noRadio);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Select Curls
      await waitFor(() => {
        expect(
          screen.getByText(/what's your most common hair pattern/i),
        ).toBeInTheDocument();
      });
      const curlsRadio = screen.getByRole('radio', { value: 'curls' });
      fireEvent.click(curlsRadio);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Skip additional patterns
      await waitFor(() => {
        expect(
          screen.getByText(/do you have any other curl pattern types/i),
        ).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Answer shrinkage
      await waitFor(() => {
        expect(
          screen.getByText(/how much does your hair shrink/i),
        ).toBeInTheDocument();
      });
      const shrinkageRadio = screen.getByRole('radio', { value: '25-50' });
      fireEvent.click(shrinkageRadio);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Should redirect
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalled();
      });
    });
  });

  describe('Quiz flow - Coils path', () => {
    test('Coils path asks for elongation', async () => {
      render(<NewQuiz />);

      // Answer straight gate
      expect(
        screen.getByText(/does your hair dry perfectly straight/i),
      ).toBeInTheDocument();
      const noRadio = screen.getByRole('radio', { name: /no/i });
      fireEvent.click(noRadio);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Select Coils
      await waitFor(() => {
        expect(
          screen.getByText(/what's your most common hair pattern/i),
        ).toBeInTheDocument();
      });
      const coilsRadio = screen.getByRole('radio', { value: 'coils' });
      fireEvent.click(coilsRadio);
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Skip additional patterns
      await waitFor(() => {
        expect(
          screen.getByText(/do you have any other curl pattern types/i),
        ).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole('button', { name: /next/i }));

      // Should ask for elongation
      await waitFor(() => {
        expect(
          screen.getByText(/when you wet your hair, does it loosen/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Quiz navigation', () => {
    test('Next button is disabled when no answer selected', async () => {
      render(<NewQuiz />);
      const startButton = screen.getByRole('button', { name: /start quiz/i });
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(
          screen.getByText(/does your hair dry perfectly straight/i),
        ).toBeInTheDocument();
      });

      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });

    test('Next button is enabled when answer selected', async () => {
      render(<NewQuiz />);
      expect(
        screen.getByText(/does your hair dry perfectly straight/i),
      ).toBeInTheDocument();

      const yesRadio = screen.getByRole('radio', { name: /yes/i });
      fireEvent.click(yesRadio);

      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).not.toBeDisabled();
    });

    test('Restart button appears during quiz', () => {
      render(<NewQuiz />);
      expect(
        screen.getByRole('button', { name: /restart/i }),
      ).toBeInTheDocument();
    });
  });

  describe('Progress indicator', () => {
    test('shows progress dots', () => {
      render(<NewQuiz />);
      // Progress indicator should be present - check for step titles
      const step1 = screen.getByTitle('Step 1');
      expect(step1).toBeInTheDocument();
    });
  });
});

