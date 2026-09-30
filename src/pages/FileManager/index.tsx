import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { 
  FolderArchive, FileText, Upload, Download, Trash2, 
  Search, Filter, Eye, Plus, ArrowLeft, HardDrive, 
  ShieldCheck, Calendar, FileCheck, Image, Clock, 
  Sparkles, AlertCircle, FileSpreadsheet, CheckCircle2
} from 'lucide-react';

export interface HealthDocument {
  id: string;
  name: string;
  category: 'Lab Reports' | 'Prescriptions' | 'Diet Plans' | 'Scans & Imaging' | 'Certificates';
  fileType: 'pdf' | 'jpg' | 'png' | 'csv' | 'doc';
  sizeKb: number;
  uploadDate: string;
  doctorName?: string;
  notes?: string;
  isVerified?: boolean;
}

const INITIAL_DOCUMENTS: HealthDocument[] = [
  {
    id: 'doc-1',
    name: 'Comprehensive_Blood_Panel_2026.pdf',
    category: 'Lab Reports',
    fileType: 'pdf',
    sizeKb: 1420,
    uploadDate: '2026-08-15',
    doctorName: 'Dr. Rajesh Varma',
    notes: 'Complete CBC, HbA1c (5.4%), Fasting Glucose (92 mg/dL), Liver Enzymes normal.',
    isVerified: true,
  },
  {
    id: 'doc-2',
    name: 'Lipid_Profile_Cholesterol_Report.pdf',
    category: 'Lab Reports',
    fileType: 'pdf',
    sizeKb: 890,
    uploadDate: '2026-07-28',
    doctorName: 'Dr. Ananya Sharma',
    notes: 'Total Cholesterol 175 mg/dL, HDL 54 mg/dL, Triglycerides 120 mg/dL.',
    isVerified: true,
  },
  {
    id: 'doc-3',
    name: 'NutriWell_Custom_Diet_Plan_MuscleGain.pdf',
    category: 'Diet Plans',
    fileType: 'pdf',
    sizeKb: 2150,
    uploadDate: '2026-08-01',
    doctorName: 'Dr. Priya Desai (Clinical Nutritionist)',
    notes: 'High-protein vegetarian meal protocol with 130g daily target and macro split.',
    isVerified: true,
  },
  {
    id: 'doc-4',
    name: 'TeleHealth_Prescription_Vitamins.pdf',
    category: 'Prescriptions',
    fileType: 'pdf',
    sizeKb: 450,
    uploadDate: '2026-08-10',
    doctorName: 'Dr. Rajesh Varma',
    notes: 'Vitamin D3 60,000 IU weekly & Methylcobalamin B12 daily course.',
    isVerified: true,
  },
  {
    id: 'doc-5',
    name: 'Body_Composition_DEXA_Scan.png',
    category: 'Scans & Imaging',
    fileType: 'png',
    sizeKb: 3200,
    uploadDate: '2026-06-20',
    doctorName: 'Apollo Diagnostics',
    notes: 'Lean muscle mass: 58.4 kg, Body Fat percentage: 16.8%, Visceral fat level 4.',
    isVerified: true,
  },
  {
    id: 'doc-6',
    name: 'Medical_Fitness_Certificate_2026.pdf',
    category: 'Certificates',
    fileType: 'pdf',
    sizeKb: 620,
    uploadDate: '2026-05-12',
    doctorName: 'Dr. Sneha Patil',
    notes: 'Cardiovascular and physical fitness cleared for high-intensity exercise routines.',
    isVerified: true,
  },
];

export const FileManagerPage: React.FC = () => {
  const { user, showToast } = useApp();
  const navigate = useNavigate();

  const userName = user?.name || 'Siva Sankar';

  const [documents, setDocuments] = useState<HealthDocument[]>(() => {
    try {
      const saved = localStorage.getItem('nutriwell_health_files');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_DOCUMENTS;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [selectedDoc, setSelectedDoc] = useState<HealthDocument | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // New Upload Form State
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<HealthDocument['category']>('Lab Reports');
  const [newDocDoctor, setNewDocDoctor] = useState('');
  const [newDocNotes, setNewDocNotes] = useState('');

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('nutriwell_health_files', JSON.stringify(documents));
    } catch (e) {
      // Storage failure fallback
    }
  }, [documents]);

  const categories = ['All', 'Lab Reports', 'Prescriptions', 'Diet Plans', 'Scans & Imaging', 'Certificates'] as const;

  // Safe docs list
  const safeDocs = Array.isArray(documents) ? documents : INITIAL_DOCUMENTS;

  // Filter & Sort
  const filteredDocs = safeDocs
    .filter((doc) => {
      if (!doc) return false;
      const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchesSearch =
        (doc.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.notes && doc.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doc.doctorName && doc.doctorName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.uploadDate || 0).getTime() - new Date(a.uploadDate || 0).getTime();
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'size') return (b.sizeKb || 0) - (a.sizeKb || 0);
      return 0;
    });

  const totalStorageKb = safeDocs.reduce((sum, d) => sum + (d?.sizeKb || 0), 0);
  const totalStorageMb = (totalStorageKb / 1024).toFixed(1);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDocuments((prev) => (Array.isArray(prev) ? prev.filter((d) => d.id !== id) : []));
    if (selectedDoc?.id === id) setSelectedDoc(null);
    showToast?.('File deleted successfully');
  };

  const handleCreateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const fileNameWithExt = newDocName.includes('.') ? newDocName : `${newDocName}.pdf`;
    const ext = fileNameWithExt.split('.').pop()?.toLowerCase() || 'pdf';
    const validExt = (['pdf', 'jpg', 'png', 'csv', 'doc'].includes(ext) ? ext : 'pdf') as HealthDocument['fileType'];

    const newDoc: HealthDocument = {
      id: `doc-${Date.now()}`,
      name: fileNameWithExt,
      category: newDocCategory,
      fileType: validExt,
      sizeKb: Math.floor(Math.random() * 2000) + 350,
      uploadDate: new Date().toISOString().split('T')[0],
      doctorName: newDocDoctor.trim() || 'Self Uploaded',
      notes: newDocNotes.trim() || 'Health record uploaded for NutriWell medical tracking.',
      isVerified: true,
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setIsUploadModalOpen(false);
    setNewDocName('');
    setNewDocDoctor('');
    setNewDocNotes('');
    showToast?.('Document uploaded to Health Vault');
  };

  const handleSimulateDownload = (doc: HealthDocument, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const element = document.createElement('a');
    const file = new Blob([
      `NUTRIWELL SECURE HEALTH VAULT DOCUMENT\n` +
      `File Name: ${doc.name}\n` +
      `Patient Name: ${userName}\n` +
      `Category: ${doc.category}\n` +
      `Upload Date: ${doc.uploadDate}\n` +
      `Attending Specialist: ${doc.doctorName || 'N/A'}\n` +
      `Notes & Findings:\n${doc.notes || 'No notes provided.'}\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = (doc.name || 'document').replace(/\.[^/.]+$/, "") + "_NutriWell_Export.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast?.(`Downloaded ${doc.name}`);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2.5 rounded-xl bg-slate-900 border border-emerald-900/50 hover:border-emerald-500/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="mint" icon={<FolderArchive className="w-3.5 h-3.5" />}>
                Medical Records &amp; Documents
              </Badge>
              <span className="text-[11px] text-emerald-400 font-semibold hidden sm:inline">
                Encrypted Vault
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              HEALTH FILE MANAGER
            </h1>
            <p className="text-xs text-slate-400">
              Manage blood reports, diet plans, doctor prescriptions, body scans, and health certificates securely.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsUploadModalOpen(true)}
            icon={<Upload className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Upload Document
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/home')}
            className="text-xs"
          >
            Back to Home
          </Button>
        </div>
      </div>

      {/* Storage & Vault Metrics Overview Card */}
      <Card glow className="p-5 bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-900 border border-emerald-500/40">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-900/50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Files</span>
            <span className="text-xl sm:text-2xl font-black text-white flex items-center gap-1.5 mt-0.5">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              {documents.length}
            </span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-900/50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Storage Used</span>
            <span className="text-xl sm:text-2xl font-black text-teal-300 flex items-center gap-1.5 mt-0.5">
              <HardDrive className="w-4 h-4 text-teal-400" />
              {totalStorageMb} MB
            </span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-900/50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Lab Reports</span>
            <span className="text-xl sm:text-2xl font-black text-amber-300 flex items-center gap-1.5 mt-0.5">
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              {documents.filter((d) => d.category === 'Lab Reports').length}
            </span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-emerald-900/50">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Vault Security</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              256-Bit
            </span>
          </div>
        </div>
      </Card>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        {/* Category Chips */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-900/50'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar & Sort */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 focus:border-emerald-500/50 rounded-xl text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 font-semibold outline-none cursor-pointer"
          >
            <option value="date">Newest First</option>
            <option value="name">Name (A-Z)</option>
            <option value="size">Size (Largest)</option>
          </select>
        </div>
      </div>

      {/* Documents Grid / List */}
      {filteredDocs.length === 0 ? (
        <Card className="p-10 text-center space-y-3 bg-slate-900/60 border-slate-800">
          <FolderArchive className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No documents found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery || selectedCategory !== 'All'
              ? 'Try changing your search query or selected category filter.'
              : 'Your health vault is currently empty. Upload medical records, blood tests, or diet plans to get started.'}
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsUploadModalOpen(true)}
            icon={<Upload className="w-3.5 h-3.5" />}
          >
            Upload First Document
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <Card
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="p-4 space-y-3 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Badge variant="mint">{doc.category}</Badge>
                  <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {doc.uploadDate}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-900/50 text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                    {doc.fileType === 'png' || doc.fileType === 'jpg' ? (
                      <Image className="w-5 h-5 text-teal-400" />
                    ) : doc.fileType === 'csv' ? (
                      <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                    ) : (
                      <FileText className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {doc.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{(doc.sizeKb / 1024).toFixed(1)} MB</span>
                      <span>•</span>
                      <span className="uppercase text-[10px] font-bold text-slate-500">{doc.fileType}</span>
                    </p>
                  </div>
                </div>

                {doc.notes && (
                  <p className="text-xs text-slate-300 line-clamp-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 leading-relaxed">
                    {doc.notes}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-teal-300 font-medium truncate max-w-[140px]">
                  {doc.doctorName || 'NutriWell Vault'}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDoc(doc);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="View Document Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSimulateDownload(doc, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition-colors"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    title="Delete File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Document View Modal */}
      {selectedDoc && (
        <Modal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          title="HEALTH DOCUMENT VIEWER"
        >
          <div className="space-y-4 text-slate-100">
            {/* Header Tags & Metadata */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="mint">{selectedDoc.category}</Badge>
                  <Badge variant="slate">{selectedDoc.fileType.toUpperCase()}</Badge>
                </div>
                <span className="text-xs font-bold text-teal-300">
                  {(selectedDoc.sizeKb / 1024).toFixed(1)} MB
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white break-all">
                {selectedDoc.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Uploaded on {selectedDoc.uploadDate} • Verified Safe
              </p>
            </div>

            {/* Document Preview Simulation Box */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <FileCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Document Preview Ready</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                  Medical encryption verified. Attending physician note and laboratory findings attached below.
                </p>
              </div>
            </div>

            {/* Attending Doctor / Specialist */}
            {selectedDoc.doctorName && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 block">
                  Attending Specialist / Provider
                </span>
                <p className="text-xs font-semibold text-white">{selectedDoc.doctorName}</p>
              </div>
            )}

            {/* Clinical Findings & Notes */}
            {selectedDoc.notes && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Clinical Notes &amp; Findings
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{selectedDoc.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDoc(null)}
              >
                Close
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Download className="w-4 h-4" />}
                  onClick={() => handleSimulateDownload(selectedDoc)}
                >
                  Download File
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="UPLOAD HEALTH DOCUMENT"
        >
          <form onSubmit={handleCreateUpload} className="space-y-4 text-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Document Title</label>
              <input
                type="text"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder="e.g. Thyroid_Profile_TSH_Report.pdf"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-xl text-xs text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
              <select
                value={newDocCategory}
                onChange={(e) => setNewDocCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-xl text-xs text-white outline-none cursor-pointer"
              >
                <option value="Lab Reports">Lab Reports</option>
                <option value="Prescriptions">Prescriptions</option>
                <option value="Diet Plans">Diet Plans</option>
                <option value="Scans & Imaging">Scans &amp; Imaging</option>
                <option value="Certificates">Certificates</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Attending Doctor / Lab Name</label>
              <input
                type="text"
                value={newDocDoctor}
                onChange={(e) => setNewDocDoctor(e.target.value)}
                placeholder="e.g. Dr. Rajesh Varma or SRL Diagnostics"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-xl text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Notes &amp; Key Values</label>
              <textarea
                rows={3}
                value={newDocNotes}
                onChange={(e) => setNewDocNotes(e.target.value)}
                placeholder="Key parameters, normal ranges, or doctor guidance..."
                className="w-full p-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 rounded-xl text-xs text-white outline-none resize-none"
              />
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>All files are stored with AES-256 local client encryption.</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={<Upload className="w-4 h-4" />}
              >
                Save Document
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default FileManagerPage;

