import { JournalEntry } from '../types';
import { mockJournalEntries } from '../data/mockJournal';

class JournalService {
  private entries: JournalEntry[] = [...mockJournalEntries];

  public getEntries(): JournalEntry[] {
    return this.entries;
  }

  public addEntry(entry: Omit<JournalEntry, 'id'>): JournalEntry {
    const newEntry: JournalEntry = {
      ...entry,
      id: `journal-${Date.now()}`
    };
    this.entries.unshift(newEntry);
    return newEntry;
  }

  public deleteEntry(id: string): void {
    this.entries = this.entries.filter(e => e.id !== id);
  }
}

export const journalService = new JournalService();
