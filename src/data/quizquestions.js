var quizQuestions = [
  {
      question: "Take a strand of hair that's still attached to your head and slide your fingers from the bottom up the shaft towards the scalp",
      answers: [
          {
              type: "High",
              content: "I feel little bumps",
              points: 2
          },
          {
              type: "Normal",
              content: "It feels smooth",
              points: 0
          },
          {
              type: "Normal",
              content: "Hmm...I can't quite say",
              points: 0
          }
      ]
  },
  {
      question: "Splash some water on your hair, does it bead up or absorb right away?",
      answers: [
          {
              type: "Low",
              content: "Beads up",
              points: -2
          },
          {
              type: "High",
              content: "Absorbs right away",
              points: 2
          },
          {
              type: "Normal",
              content: "I'd prefer not to do this right now",
              points: 0
          }
      ]
  },
  {
      question: "Take a strand of clean shed hair and drop it in a glass of water for 3-5 minutes, this works best if the hair has no product on it",
      answers: [
          {
              type: "Low",
              content: "The hair floats",
              points: -2
          },
          {
              type: "Normal",
              content: "The hair sinks to the middle",
              points: 0
          },
          {
              type: "High",
              content: "This hair sinks to the bottom",
              points: 2

          },
          {
              type: "Normal",
              content: "I'd prefer not to do this right now",
              points: 0
          }
      ]
  },
  {
      question: "Which sounds more like your experience with products:",
      answers: [
          {
              type: "Low",
              content: "Products sit on my hair and end up looking like grease or buildup",
              points: -4
          },
          {
              type: "High",
              content: "My hair absorbs products like a sponge, so I have to use a lot of product",
              points: 4
          },
          {
              type: "Normal",
              content: "I don't really have either of these issues",
              points: 0
          }
      ]
  },
  {
      question: "I do not absorb hair color or treatments easily",
      answers: [
          {
              type: "Low",
              content: "Yes",
              points: -2
          },
          {
              type: "Normal",
              content: "No, they absorb just fine",
              points: 0
          },
          {
              type: "Normal",
              content: "I don't color so this doesn't apply to me",
              points: 0
          }
      ]
  },
  {
    question: "My hair takes a long time to dry compared to other people with similar hair density",
      answers: [
          {
              type: "Low",
              content: "Yes, ugh it takes forever to dry",
              points: -2
          },
          {
              type: "Normal",
              content: "No, it seems to take a pretty normal amount of time to dry",
              points: 0
          }
      ]
  }, 
  {
    question: "My hair appears healthy but has little volume",
      answers: [
          {
              type: "Low",
              content: "Yes",
              points: -2
          },
          {
              type: "Normal",
              content: "No",
              points: 0
          }
      ]
  }, 
  {
    question: "My hair looks dull and dry",
      answers: [
          {
              type: "High",
              content: "Yes",
              points: 2
          },
          {
              type: "Normal",
              content: "Nope",
              points: 0
          }
      ]
  }, 
  {
    question: "My hair was previously bleached, colored, or permed or otherwise heavily processed/heat damaged",
      answers: [
          {
              type: "High",
              content: "Yes",
              points: 2
          },
          {
              type: "Normal",
              content: "Nope",
              points: 0
          }
      ]
  }, 
  {
    question: "Putting oil directly in my hair works great for me and doesn't make my hair look greasy or limp",
      answers: [
          {
              type: "High",
              content: "Yes!",
              points: 2
          },
          {
              type: "Normal",
              content: "No",
              points: -1
          }
      ]
  }, 
  {
    question: "I seem to need to remove buildup from my hair with clarifying treatments often",
      answers: [
          {
              type: "Low",
              content: "Yes",
              points: -2
          },
          {
              type: "Normal",
              content: "No",
              points: 0
          }
      ]
  }, 
  {
    question: "I seem to need to wash my hair often or it looks greasy",
      answers: [
          {
              type: "Low",
              content: "Yes",
              points: -2
          },
          {
              type: "Normal",
              content: "No",
              points: 0
          }
      ]
  }


];

export default quizQuestions;