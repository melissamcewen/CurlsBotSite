import {
  quizQuestions,
  resultMapping,
} from '../../../../../src/app/hair-types/quiz/quizData';

// Helper function to simulate answering questions
const simulateQuizPath = (
  answers: { section: string; question: string; answer: string }[],
) => {
  let currentSection = '1vs234';
  let result: string | undefined;

  for (const { section, question: expectedQuestion, answer } of answers) {
    // Verify we're in the expected section
    expect(currentSection).toBe(section);

    // Find the questions for current section
    const sectionQuestions = quizQuestions.filter(
      (q) => q.section === currentSection,
    );
    expect(sectionQuestions.length).toBeGreaterThan(0);

    // Find the specific question we want to answer
    const question = sectionQuestions.find(
      (q) => q.question === expectedQuestion,
    );
    if (!question) {
      console.error(
        `Could not find question "${expectedQuestion}" in section "${section}"`,
      );
      console.error(
        'Available questions:',
        sectionQuestions.map((q) => q.question),
      );
    }
    expect(question).toBeDefined();

    // Find the matching answer
    const matchingAnswer = question!.answers.find((a) => a.content === answer);
    if (!matchingAnswer) {
      console.error(
        `Could not find answer "${answer}" for question: "${expectedQuestion}"`,
      );
      console.error(
        'Available answers:',
        question!.answers.map((a) => a.content),
      );
    }
    expect(matchingAnswer).toBeDefined();

    // Update current section or get result
    if (matchingAnswer!.result) {
      result = matchingAnswer!.result;
      break;
    }
    if (matchingAnswer!.nextSection) {
      currentSection = matchingAnswer!.nextSection;
    }
  }

  return result;
};

describe('Quiz Logic - Type 1A Pathway', () => {
  test('Type 1A pathway from documentation', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question: 'Is your hair perfectly straight with no bends when wet?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question:
          'Have you ever tried any techniques to form waves like scrunching? Did waves form?',
        answer: "I haven't tried these techniques",
      },
      {
        section: '1vs2',
        question:
          'Does your hair form any waves/bends overnight or in high humidity?',
        answer: 'No',
      },
      {
        section: '1cvs1ab',
        question: 'Is it easy to curl your hair with a curling iron?',
        answer: "I've never tried a curling iron",
      },
      {
        section: '1cvs1ab',
        question:
          'Do you get more volume in your hair from using a stronger/clarifying shampoo?',
        answer: "I've never used a clarifying shampoo",
      },
      {
        section: '1cvs1ab',
        question: 'Do you often struggle with frizzy hair?',
        answer: 'No',
      },
      {
        section: '1cvs1ab',
        question: 'Is your hair very thick?',
        answer: 'No',
      },
      {
        section: '1avs1b',
        question: 'Does your hair ever curl up at the ends?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('1a');
    expect(resultMapping['1a']).toBe('/hair-types/type-1a');
  });

  test('Type 4C pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Is your hair much longer if you stretch it out?',
        answer: 'Yes',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'Yes',
      },
      {
        section: '3cvs4',
        question:
          'Does your hair shrink more than 50% of its length when it dries?',
        answer: 'Yes',
      },
      {
        section: '4avs4c',
        question:
          'Do you see a consistent spiral curl pattern without needing to define it with product or styling?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('4c');
    expect(resultMapping['4c']).toBe('/hair-types/type-4c');
  });

  test('Type 2B pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Do heavy products make your hair limp?',
        answer: 'Yes',
      },
      {
        section: '2vs3',
        question:
          'If you scrunch your hair with gel or mousse/foam and let it air dry, does it form ringlets or just enhanced waves?',
        answer: 'No',
      },
      {
        section: '2avs2c',
        question: 'Is your hair wavy when wet?',
        answer: 'No',
      },
      {
        section: '2avs2b',
        question:
          'Does brushing your hair when dry make it straight at the roots?',
        answer: 'No',
      },
      {
        section: '2avs2b',
        question:
          'Does your hair ever get completely straight closer to the roots 1-2 days after washing it?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('2b');
    expect(resultMapping['2b']).toBe('/hair-types/type-2b');
  });

  test('Type 3A pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Do heavy products make your hair limp?',
        answer: 'No',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'No',
      },
      {
        section: '3a3bvs3c',
        question:
          'Do your curls tend to loosen or stretch out easily with just the weight of your hair or products?',
        answer: 'Yes',
      },
      {
        section: '3avs3b',
        question: 'Does gel sometimes make your hair stringy?',
        answer: 'Yes',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('3a');
    expect(resultMapping['3a']).toBe('/hair-types/type-3a');
  });

  test('Type 1B pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question: 'Is your hair perfectly straight with no bends when wet?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question:
          'Have you ever tried any techniques to form waves like scrunching? Did waves form?',
        answer: "I haven't tried these techniques",
      },
      {
        section: '1vs2',
        question:
          'Does your hair form any waves/bends overnight or in high humidity?',
        answer: 'No',
      },
      {
        section: '1cvs1ab',
        question: 'Is it easy to curl your hair with a curling iron?',
        answer: "I've never tried a curling iron",
      },
      {
        section: '1cvs1ab',
        question:
          'Do you get more volume in your hair from using a stronger/clarifying shampoo?',
        answer: 'Yes',
      },
      {
        section: '1avs1b',
        question: 'Does your hair ever curl up at the ends?',
        answer: 'Yes',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('1b');
    expect(resultMapping['1b']).toBe('/hair-types/type-1b');
  });

  test('Type 2A pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Do heavy products make your hair limp?',
        answer: 'Yes',
      },
      {
        section: '2vs3',
        question:
          'If you scrunch your hair with gel or mousse/foam and let it air dry, does it form ringlets or just enhanced waves?',
        answer: 'No',
      },
      {
        section: '2avs2c',
        question: 'Is your hair wavy when wet?',
        answer: 'No',
      },
      {
        section: '2avs2b',
        question:
          'Does brushing your hair when dry make it straight at the roots?',
        answer: 'Yes',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('2a');
    expect(resultMapping['2a']).toBe('/hair-types/type-2a');
  });

  test('Type 3C pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Do heavy products make your hair limp?',
        answer: 'No',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'No',
      },
      {
        section: '3a3bvs3c',
        question:
          'Do your curls tend to loosen or stretch out easily with just the weight of your hair or products?',
        answer: 'No',
      },
      {
        section: '3a3bvs3c',
        question: 'Do you have a lot of trouble getting volume at your roots?',
        answer: 'No my roots have plenty of volume',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('3c');
    expect(resultMapping['3c']).toBe('/hair-types/type-3c');
  });

  test('Type 4B pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Is your hair much longer if you stretch it out?',
        answer: 'Yes',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'Yes',
      },
      {
        section: '3cvs4',
        question:
          'Does your hair shrink more than 50% of its length when it dries?',
        answer: 'Yes',
      },
      {
        section: '4avs4c',
        question:
          'Do you see a consistent spiral curl pattern without needing to define it with product or styling?',
        answer: 'Yes',
      },
      {
        section: '4avs4b',
        question:
          'Do you have any pieces of your hair that have a zig zag/kink pattern rather than coils/spirals?',
        answer: 'Yes',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('4b');
    expect(resultMapping['4b']).toBe('/hair-types/type-4b');
  });

  test('Type 1C pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question: 'Is your hair perfectly straight with no bends when wet?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question:
          'Have you ever tried any techniques to form waves like scrunching? Did waves form?',
        answer: "I haven't tried these techniques",
      },
      {
        section: '1vs2',
        question:
          'Does your hair form any waves/bends overnight or in high humidity?',
        answer: 'No',
      },
      {
        section: '1cvs1ab',
        question: 'Is it easy to curl your hair with a curling iron?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('1c');
    expect(resultMapping['1c']).toBe('/hair-types/type-1c');
  });

  test('Type 2C pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Do heavy products make your hair limp?',
        answer: 'Yes',
      },
      {
        section: '2vs3',
        question:
          'If you scrunch your hair with gel or mousse/foam and let it air dry, does it form ringlets or just enhanced waves?',
        answer: 'No',
      },
      {
        section: '2avs2c',
        question: 'Is your hair wavy when wet?',
        answer: 'Yes',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('2c');
    expect(resultMapping['2c']).toBe('/hair-types/type-2c');
  });

  test('Type 3B pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Do heavy products make your hair limp?',
        answer: 'No',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'No',
      },
      {
        section: '3a3bvs3c',
        question:
          'Do your curls tend to loosen or stretch out easily with just the weight of your hair or products?',
        answer: 'Yes',
      },
      {
        section: '3avs3b',
        question: 'Does gel sometimes make your hair stringy?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('3b');
    expect(resultMapping['3b']).toBe('/hair-types/type-3b');
  });

  test('Type 4A pathway', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'No',
      },
      {
        section: '23vs34',
        question: 'Is your hair much longer if you stretch it out?',
        answer: 'Yes',
      },
      {
        section: '3a3cvs3c4',
        question: 'Do you have trouble growing your hair long/gaining length?',
        answer: 'Yes',
      },
      {
        section: '3cvs4',
        question:
          'Does your hair shrink more than 50% of its length when it dries?',
        answer: 'Yes',
      },
      {
        section: '4avs4c',
        question:
          'Do you see a consistent spiral curl pattern without needing to define it with product or styling?',
        answer: 'Yes',
      },
      {
        section: '4avs4b',
        question:
          'Do you have any pieces of your hair that have a zig zag/kink pattern rather than coils/spirals?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('4a');
    expect(resultMapping['4a']).toBe('/hair-types/type-4a');
  });
});

describe('Quiz Logic - Type 1C Pathway', () => {
  test('Type 1C pathway through static flyaways', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question: 'Is your hair perfectly straight with no bends when wet?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question:
          'Have you ever tried any techniques to form waves like scrunching? Did waves form?',
        answer: "I haven't tried these techniques",
      },
      {
        section: '1vs2',
        question:
          'Does your hair form any waves/bends overnight or in high humidity?',
        answer: 'No',
      },
      {
        section: '1cvs1ab',
        question: 'Is it easy to curl your hair with a curling iron?',
        answer: "I've never tried a curling iron",
      },
      {
        section: '1cvs1ab',
        question:
          'Do you get more volume in your hair from using a stronger/clarifying shampoo?',
        answer: "I've never used a clarifying shampoo",
      },
      {
        section: '1cvs1ab',
        question: 'Do you often struggle with frizzy hair?',
        answer: 'No',
      },
      {
        section: '1cvs1ab',
        question: 'Is your hair very thick?',
        answer: 'Yes',
      },
      {
        section: '1cvs1ab',
        question: 'Do you have trouble with static flyaways?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('1c');
    expect(resultMapping['1c']).toBe('/hair-types/type-1c');
  });

  test('Type 1C pathway through no static', () => {
    const answers = [
      {
        section: '1vs234',
        question:
          'Does your hair dry straight without needing products, heat, or tools?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question: 'Is your hair perfectly straight with no bends when wet?',
        answer: 'Yes',
      },
      {
        section: '1vs2',
        question:
          'Have you ever tried any techniques to form waves like scrunching? Did waves form?',
        answer: "I haven't tried these techniques",
      },
      {
        section: '1vs2',
        question:
          'Does your hair form any waves/bends overnight or in high humidity?',
        answer: 'No',
      },
      {
        section: '1cvs1ab',
        question: 'Is it easy to curl your hair with a curling iron?',
        answer: 'No',
      },
    ];

    const result = simulateQuizPath(answers);
    expect(result).toBe('1c');
    expect(resultMapping['1c']).toBe('/hair-types/type-1c');
  });
});
