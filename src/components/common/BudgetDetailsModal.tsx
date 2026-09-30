import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { Badge } from './Badge';
import { Wallet, Trash2, Plus, Sparkles, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';

export const BudgetDetailsModal: React.FC = () => {
  const { 
    user, 
    budgetItems, 
    removeBudgetItem, 
    addBudgetItem, 
    resetBudgetItems,
    isBudgetModalOpen, 
    setIsBudgetModalOpen 
  } = useApp();

  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const dailyBudget = user?.dailyFoodBudgetInr || 150;
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.cost, 0);
  const remainingBudget = dailyBudget - totalSpent;
  const spentPct = Math.min(100, Math.round((totalSpent / dailyBudget) * 100));

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const costNum = parseFloat(newItemCost);
    if (!newItemName.trim() || isNaN(costNum) || costNum <= 0) return;

    addBudgetItem({
      name: newItemName.trim(),
      cost: costNum,
      category: 'User Added Item',
      portion: 'Custom Portion',
    });

    setNewItemName('');
    setNewItemCost('');
    setShowAddForm(false);
  };

  return (
    <Modal
      isOpen={isBudgetModalOpen}
      onClose={() => setIsBudgetModalOpen(false)}
      title="MY CURRENT BUDGET"
    >
      <div className="space-y-5 text-slate-100">
        {/* Header Summary Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/80 border border-emerald-500/30 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Daily Food Target</p>
                <p className="text-xl font-black text-white">₹{dailyBudget}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Remaining</p>
              <p className={`text-xl font-black ${remainingBudget >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ₹{remainingBudget}
              </p>
            </div>
          </div>

          {/* Budget Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-slate-300">Total Spent: <strong className="text-amber-300">₹{totalSpent}</strong></span>
              <span className={spentPct > 90 ? 'text-rose-400' : 'text-emerald-400'}>{spentPct}% allocated</span>
            </div>
            <div className="h-2 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-emerald-900/50">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  spentPct > 100 
                    ? 'bg-rose-500' 
                    : spentPct > 80 
                    ? 'bg-amber-400' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                }`}
                style={{ width: `${Math.min(100, spentPct)}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            Removing items immediately recalculates your daily remaining balance and updates all dashboard indicators.
          </p>
        </div>

        {/* Selected Items List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>Selected Items ({budgetItems.length})</span>
            </h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/40 hover:border-emerald-500/50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Item
              </button>
              {budgetItems.length === 0 && (
                <button
                  type="button"
                  onClick={resetBudgetItems}
                  className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Sample
                </button>
              )}
            </div>
          </div>

          {/* Quick Add Form */}
          {showAddForm && (
            <form onSubmit={handleAddItem} className="p-3 rounded-xl bg-slate-900/90 border border-emerald-800/40 space-y-3 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Item name (e.g. Boiled Eggs)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-emerald-900/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  required
                />
                <input
                  type="number"
                  placeholder="Cost in ₹ (e.g. 30)"
                  value={newItemCost}
                  onChange={(e) => setNewItemCost(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-emerald-900/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  required
                  min="1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Add to Budget
                </Button>
              </div>
            </form>
          )}

          {budgetItems.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">No items currently deducted!</p>
              <p className="text-xs text-slate-400">All ₹{dailyBudget} remains available in your food budget.</p>
              <Button variant="outline" size="sm" onClick={resetBudgetItems} className="mt-2">
                Restore Sample Budget Items
              </Button>
            </div>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {budgetItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-emerald-950 hover:border-emerald-800/40 transition-all group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-400">{item.category} • {item.portion}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-extrabold text-amber-300">₹{item.cost}</span>
                    <button
                      type="button"
                      onClick={() => removeBudgetItem(item.id)}
                      className="px-2.5 py-1 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-800/40 hover:bg-rose-900 hover:text-white hover:border-rose-600 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title={`Remove ${item.name} from budget`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        <div className="pt-3 border-t border-emerald-900/30 flex items-center justify-between text-xs">
          <span className="text-slate-400">Status: {remainingBudget >= 0 ? '✅ Within Daily Limit' : '⚠️ Over Budget'}</span>
          <Button variant="primary" size="sm" onClick={() => setIsBudgetModalOpen(false)}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
