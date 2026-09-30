import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Bell, Plus, Clock, Droplets, Utensils, Apple, 
  Dumbbell, Moon, Zap, Trash2, Sparkles, 
  Volume2, ShieldCheck, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReminderCategory } from '../../types';
import { REMINDER_PRESETS } from '../../services/reminderPresets';

interface ReminderHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReminderHubModal: React.FC<ReminderHubModalProps> = ({ isOpen, onClose }) => {
  const { 
    reminders, 
    addReminder, 
    deleteReminder, 
    toggleReminder, 
    applyPreset, 
    triggerTestNotification,
    desktopNotificationPermission,
    requestDesktopNotificationPermission
  } = useApp();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<ReminderCategory | 'All'>('All');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form State for Adding Custom Reminder
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('14:00');
  const [newCategory, setNewCategory] = useState<ReminderCategory>('Hydration');
  const [newNotes, setNewNotes] = useState('');

  if (!isOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addReminder({
      title: newTitle.trim(),
      time: newTime,
      category: newCategory,
      notes: newNotes.trim(),
      enabled: true,
    });

    setNewTitle('');
    setNewNotes('');
    setIsAddingNew(false);
  };

  const getCategoryDetails = (cat: ReminderCategory) => {
    switch (cat) {
      case 'Hydration':
        return {
          icon: Droplets,
          color: 'text-sky-400',
          bg: 'bg-sky-950/70 border-sky-500/30',
          badgeColor: 'text-sky-300 bg-sky-950/90 border-sky-800/60',
        };
      case 'Meals':
        return {
          icon: Utensils,
          color: 'text-emerald-400',
          bg: 'bg-emerald-950/70 border-emerald-500/30',
          badgeColor: 'text-emerald-300 bg-emerald-950/90 border-emerald-800/60',
        };
      case 'Snacks':
        return {
          icon: Apple,
          color: 'text-amber-400',
          bg: 'bg-amber-950/70 border-amber-500/30',
          badgeColor: 'text-amber-300 bg-amber-950/90 border-amber-800/60',
        };
      case 'Workouts':
        return {
          icon: Dumbbell,
          color: 'text-indigo-400',
          bg: 'bg-indigo-950/70 border-indigo-500/30',
          badgeColor: 'text-indigo-300 bg-indigo-950/90 border-indigo-800/60',
        };
      case 'Sleep':
        return {
          icon: Moon,
          color: 'text-purple-400',
          bg: 'bg-purple-950/70 border-purple-500/30',
          badgeColor: 'text-purple-300 bg-purple-950/90 border-purple-800/60',
        };
    }
  };

  const filteredReminders = reminders
    .filter(r => activeCategoryFilter === 'All' || r.category === activeCategoryFilter)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-slate-900/95 border border-emerald-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl emerald-glow-lg max-h-[90vh] flex flex-col backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-emerald-900/40 gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-950 border border-emerald-800/60 text-emerald-400 shadow-md">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Daily Schedule & Reminders</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-semibold">
                    10s Exact Engine
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Targeted alerts for Hydration, Meals, Snacks, Workouts & Sleep
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Test Notification Now Button */}
              <button
                type="button"
                onClick={triggerTestNotification}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold transition-all shadow-md emerald-glow-sm flex items-center gap-1.5 cursor-pointer"
                title="Preview the on-screen glassmorphic alert and chime"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Test Alert</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1 custom-scrollbar">
            {/* Desktop Notification Permission Banner */}
            {desktopNotificationPermission !== 'granted' && (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-emerald-900/40 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-800/50 text-emerald-400 shrink-0">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Desktop System Alerts</p>
                    <p className="text-[11px] text-slate-400">Enable native background push notifications outside this tab</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={requestDesktopNotificationPermission}
                  className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-emerald-900/60 border border-emerald-700/40 text-emerald-300 font-bold text-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  Enable Alerts
                </button>
              </div>
            )}

            {/* One-Click Presets Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  One-Click Schedule Presets
                </h4>
                <span className="text-[10px] text-slate-500">Replaces schedule with verified routines</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {REMINDER_PRESETS.map((preset) => (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => applyPreset(preset.key)}
                    className={`p-3 rounded-2xl bg-slate-950/70 border ${preset.borderColor} text-left space-y-1.5 hover:bg-slate-950 transition-all cursor-pointer group relative overflow-hidden`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${preset.badgeColor}`}>
                        {preset.badge}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <h5 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {preset.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Pills & Add Button */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(['All', 'Hydration', 'Meals', 'Snacks', 'Workouts', 'Sleep'] as (ReminderCategory | 'All')[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeCategoryFilter === cat
                          ? 'bg-emerald-600 text-white shadow-md font-bold'
                          : 'bg-slate-950 border border-emerald-900/40 text-slate-400 hover:text-white hover:border-emerald-700/50'
                      }`}
                    >
                      {cat === 'All' && 'All Daily Reminders'}
                      {cat === 'Hydration' && '💧 Hydration'}
                      {cat === 'Meals' && '🍽️ Meals'}
                      {cat === 'Snacks' && '🍎 Snacks'}
                      {cat === 'Workouts' && '💪 Workouts'}
                      {cat === 'Sleep' && '🌙 Sleep'}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingNew(!isAddingNew)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isAddingNew
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-emerald-950 border border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/50'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  {isAddingNew ? 'Close Form' : 'Add Custom Reminder'}
                </button>
              </div>

              {/* Add Custom Reminder Form */}
              <AnimatePresence>
                {isAddingNew && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddSubmit}
                    className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-emerald-900/30">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5 text-emerald-400" />
                        Create New Daily Health Reminder
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Reminder Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Creatine & Water Boost"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full p-2 rounded-xl bg-slate-900 border border-emerald-900/40 text-xs text-white focus:border-emerald-400 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Scheduled Time (24h)</label>
                        <input
                          type="time"
                          required
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="w-full p-2 rounded-xl bg-slate-900 border border-emerald-900/40 text-xs text-white text-center font-bold focus:border-emerald-400 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Category</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as ReminderCategory)}
                          className="w-full p-2 rounded-xl bg-slate-900 border border-emerald-900/40 text-xs text-white focus:border-emerald-400 outline-none"
                        >
                          <option value="Hydration">💧 Hydration</option>
                          <option value="Meals">🍽️ Meals</option>
                          <option value="Snacks">🍎 Snacks</option>
                          <option value="Workouts">💪 Workouts</option>
                          <option value="Sleep">🌙 Sleep</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Notes / Guidance (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. 500ml water with pinch of pink salt"
                          value={newNotes}
                          onChange={(e) => setNewNotes(e.target.value)}
                          className="w-full p-2 rounded-xl bg-slate-900 border border-emerald-900/40 text-xs text-white focus:border-emerald-400 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md emerald-glow-sm cursor-pointer"
                      >
                        Save Reminder
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Reminders List (Category Cards) */}
              <div className="space-y-2">
                {filteredReminders.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-950/60 border border-emerald-900/30 space-y-2">
                    <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">No reminders found in this category.</p>
                    <button
                      type="button"
                      onClick={() => applyPreset('STANDARD_WELLNESS')}
                      className="text-xs text-emerald-400 font-bold hover:underline"
                    >
                      Load Standard Wellness Preset
                    </button>
                  </div>
                ) : (
                  filteredReminders.map((rem) => {
                    const catDetails = getCategoryDetails(rem.category);
                    const CatIcon = catDetails.icon;

                    return (
                      <div
                        key={rem.id}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          rem.enabled
                            ? 'bg-slate-950/85 border-emerald-900/40 hover:border-emerald-500/40'
                            : 'bg-slate-950/40 border-slate-900 opacity-60'
                        }`}
                      >
                        {/* Left Category Icon & Details */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${catDetails.bg} ${catDetails.color}`}>
                            <CatIcon className="w-5 h-5" />
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white tracking-wide">
                                {rem.time}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full border ${catDetails.badgeColor}`}>
                                {rem.category}
                              </span>
                            </div>

                            <h5 className="text-xs font-bold text-slate-100 truncate">
                              {rem.title}
                            </h5>

                            {rem.notes && (
                              <p className="text-[10px] text-slate-400 truncate max-w-sm sm:max-w-md">
                                {rem.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right Toggle & Delete Action */}
                        <div className="flex items-center gap-2.5 shrink-0">
                          {/* Toggle Switch */}
                          <button
                            type="button"
                            onClick={() => toggleReminder(rem.id)}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative ${
                              rem.enabled ? 'bg-emerald-500' : 'bg-slate-800'
                            }`}
                            aria-label={`Toggle reminder ${rem.title}`}
                          >
                            <motion.div
                              animate={{ x: rem.enabled ? 20 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              className="w-5 h-5 rounded-full bg-white shadow-sm"
                            />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => deleteReminder(rem.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                            aria-label="Delete Reminder"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-3 border-t border-emerald-900/40 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Automated 10s background scanner • Guarantees once-per-day triggering
            </span>
            <span className="text-slate-500 font-medium">
              {reminders.filter(r => r.enabled).length} active alerts scheduled
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
