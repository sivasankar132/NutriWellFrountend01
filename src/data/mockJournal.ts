import { JournalEntry } from '../types';

export const mockJournalEntries: JournalEntry[] = [
  {
    id: 'j-1',
    date: '2026-09-07',
    mood: 'Good',
    energyLevel: 4,
    sleepHours: 7.5,
    foodNotes: 'Ate Paneer Tikka for dinner. Felt very full and energized throughout the evening.',
    lifestyleNotes: 'Walked 8,500 steps, drank 3.2L water.',
    tags: ['High Protein', 'Good Energy', 'Hydrated'],
  },
  {
    id: 'j-2',
    date: '2026-09-06',
    mood: 'Ecstatic',
    energyLevel: 5,
    sleepHours: 8,
    foodNotes: 'Had Moong Dal Chilla for lunch and fresh fruit bowl. No bloating.',
    lifestyleNotes: 'Morning yoga session 30 mins.',
    tags: ['Clean Eating', 'Yoga', 'High Sleep'],
  },
  {
    id: 'j-3',
    date: '2026-09-05',
    mood: 'Tired',
    energyLevel: 2,
    sleepHours: 5.5,
    foodNotes: 'Missed breakfast due to morning meetings. Had late spicy lunch.',
    lifestyleNotes: 'High stress work day.',
    tags: ['Missed Meal', 'Low Sleep', 'Work Stress'],
  }
];
