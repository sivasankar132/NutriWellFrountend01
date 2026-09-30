import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { BookOpen, Plus, Smile, Moon, Zap, Trash2 } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const { journalEntries, addJournalEntry, showToast } = useApp();
  const [mood, setMood] = useState<'Ecstatic' | 'Good' | 'Neutral' | 'Tired' | 'Stressed'>('Good');
  const [energyLevel, setEnergyLevel] = useState<number>(4);
  const [sleepHours, setSleepHours] = useState<number>(8);
  const [foodNotes, setFoodNotes] = useState<string>('');

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    addJournalEntry({
      date: new Date().toISOString().split('T')[0],
      mood,
      energyLevel,
      sleepHours: Number(sleepHours),
      foodNotes,
      lifestyleNotes: 'Walked 8,000 steps.',
      tags: ['Daily Log', mood]
    });
    setFoodNotes('');
  };

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="mint" icon={<BookOpen className="w-3.5 h-3.5" />}>Personal Health Diary</Badge>
        <h1 className="text-2xl font-bold text-white mt-1">Health & Energy Journal</h1>
        <p className="text-xs text-slate-400">Track mood, sleep duration, energy levels, and food reactions over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Add Entry Form */}
        <Card glow className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold text-white">Log Today's Entry</h3>
          <form onSubmit={handleSaveEntry} className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">Today's Mood</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value as any)}
                className="w-full p-2.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white"
              >
                <option value="Ecstatic">Ecstatic 😁</option>
                <option value="Good">Good 😊</option>
                <option value="Neutral">Neutral 😐</option>
                <option value="Tired">Tired 🥱</option>
                <option value="Stressed">Stressed 😓</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Energy (1-5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white text-center font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Sleep (Hours)</label>
                <input
                  type="number"
                  step={0.5}
                  value={sleepHours}
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white text-center font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Food & Lifestyle Notes</label>
              <textarea
                rows={3}
                value={foodNotes}
                onChange={(e) => setFoodNotes(e.target.value)}
                placeholder="How did you feel after eating? Any bloating or high energy?"
                className="w-full p-2.5 bg-slate-900 border border-emerald-900/40 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <Button variant="primary" size="md" className="w-full" icon={<Plus className="w-4 h-4" />}>
              SAVE JOURNAL ENTRY
            </Button>
          </form>
        </Card>

        {/* Entries Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-bold text-white">Recent Journal Logs</h3>
          <div className="space-y-3">
            {journalEntries.map((entry) => (
              <Card key={entry.id} className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="mint">{entry.mood}</Badge>
                    <span className="text-xs text-slate-400">{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Zap className="w-3.5 h-3.5" /> {entry.energyLevel}/5 Energy
                    </span>
                    <span className="flex items-center gap-1 text-teal-300">
                      <Moon className="w-3.5 h-3.5" /> {entry.sleepHours}h Sleep
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-200">{entry.foodNotes}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
