export interface MotivationalQuote {
  id: number;
  quote: string;
  author: string;
  category: 'Health' | 'Discipline' | 'Habits' | 'Nutrition';
}

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  // Health (13)
  {
    id: 1,
    quote: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
    category: "Health"
  },
  {
    id: 2,
    quote: "He who has health has hope; and he who has hope has everything.",
    author: "Arabian Proverb",
    category: "Health"
  },
  {
    id: 3,
    quote: "Physical fitness is the first requisite of happiness.",
    author: "Joseph Pilates",
    category: "Health"
  },
  {
    id: 4,
    quote: "The greatest wealth is health.",
    author: "Virgil",
    category: "Health"
  },
  {
    id: 5,
    quote: "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.",
    author: "Buddha",
    category: "Health"
  },
  {
    id: 6,
    quote: "A healthy outside starts from the inside.",
    author: "Robert Urich",
    category: "Health"
  },
  {
    id: 7,
    quote: "Early to bed and early to rise makes a person healthy, wealthy, and wise.",
    author: "Benjamin Franklin",
    category: "Health"
  },
  {
    id: 8,
    quote: "The groundwork of all happiness is good health.",
    author: "Leigh Hunt",
    category: "Health"
  },
  {
    id: 9,
    quote: "Your body hears everything your mind says.",
    author: "Naomi Judd",
    category: "Health"
  },
  {
    id: 10,
    quote: "Health is a state of complete harmony of the body, mind and spirit.",
    author: "B.K.S. Iyengar",
    category: "Health"
  },
  {
    id: 11,
    quote: "Invest in your health today, or pay for your illness tomorrow.",
    author: "Health Proverb",
    category: "Health"
  },
  {
    id: 12,
    quote: "A fit body, a calm mind, a house full of love. These things cannot be bought—they must be earned.",
    author: "Naval Ravikant",
    category: "Health"
  },
  {
    id: 13,
    quote: "The doctor of the future will give no medicine, but will interest his patients in the care of the human frame, in diet, and in prevention.",
    author: "Thomas Edison",
    category: "Health"
  },

  // Discipline (13)
  {
    id: 14,
    quote: "Discipline is the bridge between goals and accomplishment.",
    author: "Jim Rohn",
    category: "Discipline"
  },
  {
    id: 15,
    quote: "We must all suffer one of two things: the pain of discipline or the pain of regret.",
    author: "Jim Rohn",
    category: "Discipline"
  },
  {
    id: 16,
    quote: "Discipline equals freedom.",
    author: "Jocko Willink",
    category: "Discipline"
  },
  {
    id: 17,
    quote: "Self-discipline begins with the mastery of your thoughts. If you don't control what you think, you can't control what you do.",
    author: "Napoleon Hill",
    category: "Discipline"
  },
  {
    id: 18,
    quote: "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.",
    author: "John C. Maxwell",
    category: "Discipline"
  },
  {
    id: 19,
    quote: "Motivation gets you started; discipline keeps you going.",
    author: "Jim Ryun",
    category: "Discipline"
  },
  {
    id: 20,
    quote: "Without self-discipline, success is impossible, period.",
    author: "Lou Holtz",
    category: "Discipline"
  },
  {
    id: 21,
    quote: "Rule your mind or it will rule you.",
    author: "Horace",
    category: "Discipline"
  },
  {
    id: 22,
    quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    category: "Discipline"
  },
  {
    id: 23,
    quote: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln",
    category: "Discipline"
  },
  {
    id: 24,
    quote: "Success is nothing more than a few simple disciplines, practiced every day.",
    author: "Jim Rohn",
    category: "Discipline"
  },
  {
    id: 25,
    quote: "Mastering others is strength. Mastering yourself is true power.",
    author: "Lao Tzu",
    category: "Discipline"
  },
  {
    id: 26,
    quote: "The first and greatest victory is to conquer yourself.",
    author: "Plato",
    category: "Discipline"
  },

  // Habits (12)
  {
    id: 27,
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear",
    category: "Habits"
  },
  {
    id: 28,
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Will Durant",
    category: "Habits"
  },
  {
    id: 29,
    quote: "Changes that seem small and unimportant at first will compound into remarkable results if you stick with them.",
    author: "James Clear",
    category: "Habits"
  },
  {
    id: 30,
    quote: "Drop by drop is the water pot filled. Likewise, the wise, gathering it little by little, fills themselves with good.",
    author: "Buddha",
    category: "Habits"
  },
  {
    id: 31,
    quote: "First we make our habits, then our habits make us.",
    author: "Charles C. Noble",
    category: "Habits"
  },
  {
    id: 32,
    quote: "The secret of your future is hidden in your daily routine.",
    author: "Mike Murdock",
    category: "Habits"
  },
  {
    id: 33,
    quote: "Your habits shape your identity, and your identity shapes your habits.",
    author: "James Clear",
    category: "Habits"
  },
  {
    id: 34,
    quote: "In a year from now you may wish you had started today.",
    author: "Karen Lamb",
    category: "Habits"
  },
  {
    id: 35,
    quote: "Consistency is the DNA of mastery.",
    author: "Robin Sharma",
    category: "Habits"
  },
  {
    id: 36,
    quote: "Success is the product of daily habits—not once-in-a-lifetime transformations.",
    author: "James Clear",
    category: "Habits"
  },
  {
    id: 37,
    quote: "Continuous improvement is better than delayed perfection.",
    author: "Mark Twain",
    category: "Habits"
  },
  {
    id: 38,
    quote: "Habits are the compound interest of self-improvement.",
    author: "James Clear",
    category: "Habits"
  },

  // Nutrition (12)
  {
    id: 39,
    quote: "Let food be thy medicine and medicine be thy food.",
    author: "Hippocrates",
    category: "Nutrition"
  },
  {
    id: 40,
    quote: "Eat food. Not too much. Mostly plants.",
    author: "Michael Pollan",
    category: "Nutrition"
  },
  {
    id: 41,
    quote: "The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison.",
    author: "Ann Wigmore",
    category: "Nutrition"
  },
  {
    id: 42,
    quote: "Your diet is a bank account. Good food choices are good investments.",
    author: "Bethenny Frankel",
    category: "Nutrition"
  },
  {
    id: 43,
    quote: "Don't dig your grave with your own knife and fork.",
    author: "English Proverb",
    category: "Nutrition"
  },
  {
    id: 44,
    quote: "Every time you eat or drink, you are either feeding disease or fighting it.",
    author: "Heather Morgan",
    category: "Nutrition"
  },
  {
    id: 45,
    quote: "Nutrition is the foundation that enables every cellular recovery in the body.",
    author: "Dr. Max Gerson",
    category: "Nutrition"
  },
  {
    id: 46,
    quote: "Exercise is king. Nutrition is queen. Put them together and you've got a kingdom.",
    author: "Jack LaLanne",
    category: "Nutrition"
  },
  {
    id: 47,
    quote: "If you keep good food in your fridge, you will eat good food.",
    author: "Errick McAdams",
    category: "Nutrition"
  },
  {
    id: 48,
    quote: "Water is the driving force of all nature. Hydrate before you fuel.",
    author: "Leonardo da Vinci",
    category: "Nutrition"
  },
  {
    id: 49,
    quote: "A well-nourished body is resilient, clear-minded, and energized.",
    author: "T. Colin Campbell",
    category: "Nutrition"
  },
  {
    id: 50,
    quote: "Respect your body when it asks for nourishment, and discipline it when it asks for comfort.",
    author: "Mindful Health Wisdom",
    category: "Nutrition"
  }
];

export const getRandomQuote = (): MotivationalQuote => {
  const index = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[index];
};
