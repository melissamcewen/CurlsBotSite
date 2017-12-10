var quizQuestions = [
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
    question: "Which describes your hair better?",
      answers: [
          {
              type: "High",
              content: "My hair looks dull and dry",
              points: 2
          },
          {
              type: "Low",
              content: "My hair appears healthy and shiny, but has little volume",
              points: -2
          },
          {
              type: "Normal",
              content: "My hair has a good amount of volume and looks pretty healthy",
              points: 0
          }
      ]
  },
  {
    question: "My hair was previously bleached, colored, or permed or otherwise heavily processed/heat damaged within the past year",
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
    question: "Have you tried oils in your hair?",
      answers: [
          {
              type: "Low",
              content: "Yes, and they made my hair look limp and greasy",
              points: -2
          },
          {
              type: "High",
              content: "Oils make my hair look healthy and shiny",
              points: 2
          },
          {
              type: "Normal",
              content: "Some oils work well in my hair but I have to be careful and use only some types and/or in small amounts",
              points: 0
          },
          {
              type: "Normal",
              content: "Hmm I've never tried oil on my hair before",
              points: 0
          }
      ]
  }, 
  {
    question: "Which do you need more of?",
      answers: [
          {
              type: "Low",
              content: "Clarifying treatments",
              points: -2
          },
          {
              type: "High",
              content: "Deep conditioning",
              points: 2
          },
          {
              type: "Normal",
              content: "I use both equally or I don't use either",
              points: 0
          }
      ]
  }, 
  {
    question: "How often do you need to wash your hair?",
      answers: [
          {
              type: "Low",
              content: "I seem to need to wash my hair often or it looks greasy",
              points: -2
          },
          {
              type: "Normal",
              content: "I can go a few days (3-4) without washing and my hair looks great",
              points: 0
          },
          {
              type: "High",
              content: "I can go over 4 days without washing and my hair looks great",
              points: 2
          },

      ]
  },
  {
    question: "How does your hair respond to sulfate-containing shampoo?",
      answers: [
          {
              type: "Low",
              content: "It looks fine or great!",
              points: -2
          },
          {
              type: "Normal",
              content: "It seems a little dry",
              points: 0
          },
          {
              type: "High",
              content: "Sulfate-containg shampoos make my hair look very dry and unhealthy",
              points: 2
          },

      ]
  },
  {
    question: "Low-poo or co-wash",
      answers: [
          {
              type: "Low",
              content: "Low-poo",
              points: -1
          },
          {
              type: "Normal",
              content: "I don't know about this or I haven't tried both",
              points: 0
          },
         {
              type: "Normal",
              content: "I alternate the two",
              points: 0
          },
          {
              type: "High",
              content: "Co-wash",
              points: 1
          },

      ]
  }


];

export default quizQuestions;