import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { scannerService, ScanResult } from '../../services/scannerService';
import { IfIEatThisModal } from './IfIEatThisModal';
import { 
  Camera, Upload, Check, RefreshCw, Sparkles, Coins, Zap, 
  HelpCircle, AlertCircle, Info, StopCircle, Image as ImageIcon,
  Key, ShieldCheck, Apple
} from 'lucide-react';

export const FoodScannerModal: React.FC = () => {
  const { isScannerOpen, setIsScannerOpen, addMeal, showToast, isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'results' | 'cost_prompt'>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [mealCost, setMealCost] = useState<number>(80);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Gemini API Key Drawer state
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [userApiKey, setUserApiKey] = useState(() => scannerService.getApiKey());

  // Image Upload State
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Live Camera State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isScannerOpen) {
      stopCamera();
      handleReset();
    } else {
      setUserApiKey(scannerService.getApiKey());
    }
  }, [isScannerOpen]);

  const handleSaveApiKey = () => {
    scannerService.setApiKey(userApiKey);
    setShowKeyConfig(false);
    showToast(userApiKey.trim() ? 'Gemini API Key saved!' : 'Gemini API Key cleared.');
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.warn('Unable to access webcam/device camera:', err);
      setCameraError('Camera access unavailable or permission denied. Please use the Photo Upload option.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      stopCamera();
      setPreviewImage(dataUrl);
      processImageAnalysis(dataUrl, 'image/jpeg');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setPreviewImage(dataUrl);
        processImageAnalysis(dataUrl, file.type || 'image/jpeg');
      };
      reader.readAsDataURL(file);
    }
  };

  const processImageAnalysis = async (imageDataUrl: string, mimeType: string = 'image/jpeg') => {
    setScanState('scanning');
    try {
      const scanRes = await scannerService.analyzeFoodImage(imageDataUrl, mimeType, userApiKey);
      setResult(scanRes);
      setMealCost(scanRes.food.costInr);
      setScanState('results');
    } catch (err: any) {
      console.error('Food scanning error:', err);
      const errMsg = err?.message || 'AI generation failed. Please try again.';
      showToast(errMsg, 'error');
      setScanState('idle');
    }
  };

  const handleConfirmEat = () => {
    setScanState('cost_prompt');
  };

  const handleSaveMeal = () => {
    if (!result) return;
    addMeal({
      foodName: result.food.name,
      mealType: 'Lunch',
      calories: result.food.calories,
      protein: result.food.protein,
      carbs: result.food.carbs,
      fat: result.food.fat,
      fiber: result.food.fiber,
      costInr: Number(mealCost),
      image: result.food.image,
    });

    if (isAuthenticated) {
      showToast(`Logged ${result.food.name} to Database & Timeline! 🚀`);
    } else {
      showToast(`Logged ${result.food.name} (${result.food.protein}g Protein) to timeline!`);
    }

    handleReset();
    setIsScannerOpen(false);
  };

  const handleReset = () => {
    stopCamera();
    setScanState('idle');
    setResult(null);
    setPreviewImage(null);
    setCameraError(null);
  };

  return (
    <>
      <Modal
        isOpen={isScannerOpen}
        onClose={() => {
          handleReset();
          setIsScannerOpen(false);
        }}
        title="NutriWell AI Vision Food, Fruit & Vegetable Scanner"
        maxWidth="lg"
      >
        {/* Off-screen canvas for frame capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Gemini API Key Bar */}
        <div className="mb-4 flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-emerald-900/40 text-xs">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-medium">
              Gemini Vision AI Status:{' '}
              <strong className={scannerService.getApiKey() ? 'text-emerald-400' : 'text-slate-400'}>
                {scannerService.getApiKey() ? 'Custom Key Set ⚡' : 'Backend Managed 🛡️'}
              </strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            className="text-[11px] font-bold text-emerald-400 hover:underline cursor-pointer"
          >
            {showKeyConfig ? 'Close Key Setup' : 'Configure Gemini API Key'}
          </button>
        </div>

        {/* Gemini Key Config Drawer */}
        {showKeyConfig && (
          <div className="mb-4 p-3.5 bg-slate-950/90 rounded-xl border border-emerald-500/40 text-xs space-y-3">
            <p className="text-slate-300 font-medium">Enter your Google Gemini API Key to enable live AI vision scanning:</p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={userApiKey}
                onChange={(e) => setUserApiKey(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-emerald-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
              <Button variant="primary" size="sm" onClick={handleSaveApiKey}>
                Save Key
              </Button>
            </div>
            <p className="text-[10px] text-slate-400">Key is stored locally in your browser and never sent to external servers.</p>
          </div>
        )}

        {/* Mode Selector Tabs (Photo Upload vs Live Camera) */}
        {scanState === 'idle' && (
          <div className="space-y-5">
            <div className="flex items-center justify-center p-1 bg-slate-950 rounded-xl border border-emerald-900/40">
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setActiveTab('upload');
                }}
                className={`flex-1 py-2 px-4 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo / Image</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('camera');
                  startCamera();
                }}
                className={`flex-1 py-2 px-4 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'camera'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Live Camera</span>
              </button>
            </div>

            {/* TAB 1: Photo Upload Option */}
            {activeTab === 'upload' && (
              <div className="text-center py-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />

                {previewImage ? (
                  <div className="relative w-full h-60 rounded-2xl bg-slate-950 border border-emerald-500/40 overflow-hidden mb-4 group">
                    <img src={previewImage} alt="Selected meal" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="primary"
                        size="md"
                        icon={<Sparkles className="w-4 h-4" />}
                        onClick={() => processImageAnalysis(previewImage)}
                      >
                        Analyze Image
                      </Button>
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Photo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-full h-56 rounded-2xl bg-slate-950 border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center p-6 mb-4 hover:border-emerald-400 hover:bg-emerald-950/20 transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform emerald-glow-sm">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-semibold text-slate-200">Click or Drag & Drop Food, Fruit, or Vegetable Photo</p>
                    <p className="text-xs text-slate-400 mt-1">Identifies Exact Protein, Fiber, Vitamins, Minerals & Calories</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                      <Upload className="w-3.5 h-3.5" /> Select Image File
                    </span>
                  </div>
                )}

                {previewImage && (
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    icon={<Zap className="w-4 h-4" />}
                    onClick={() => processImageAnalysis(previewImage)}
                  >
                    Analyze Photo with Gemini Vision AI
                  </Button>
                )}
              </div>
            )}

            {/* TAB 2: Live Camera Option */}
            {activeTab === 'camera' && (
              <div className="text-center py-2 space-y-4">
                <div className="relative w-full h-64 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 overflow-hidden flex flex-col items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
                  />

                  {!isCameraActive && (
                    <div className="p-6 text-center space-y-3">
                      {cameraError ? (
                        <div className="p-3 bg-red-950/60 border border-red-800/40 rounded-xl text-red-300 text-xs flex items-center justify-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{cameraError}</span>
                        </div>
                      ) : (
                        <>
                          <Camera className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
                          <p className="text-xs text-slate-300 font-medium">Point camera at any meal, fruit, or vegetable</p>
                        </>
                      )}
                      <Button variant="primary" size="md" icon={<Camera className="w-4 h-4" />} onClick={startCamera}>
                        Start Camera Stream
                      </Button>
                    </div>
                  )}

                  {/* Camera Reticle Overlay */}
                  {isCameraActive && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-emerald-400/70 rounded-2xl border-dashed animate-pulse" />
                    </div>
                  )}
                </div>

                {isCameraActive && (
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      icon={<Camera className="w-4 h-4" />}
                      onClick={captureCameraFrame}
                    >
                      Capture Photo & Analyze AI
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<StopCircle className="w-4 h-4" />}
                      onClick={stopCamera}
                    >
                      Stop Camera
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Scanning Beam & AI Processing View */}
        {scanState === 'scanning' && (
          <div className="py-8 text-center space-y-4">
            <div className="relative w-full h-64 rounded-2xl bg-slate-950 border border-emerald-500/50 overflow-hidden flex flex-col items-center justify-center">
              {previewImage && (
                <img src={previewImage} alt="Scanning frame" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              )}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-scanner-beam" />
              <div className="relative z-10 p-6 flex flex-col items-center">
                <Sparkles className="w-12 h-12 text-emerald-400 animate-spin mb-3" />
                <span className="text-emerald-300 font-bold text-base animate-pulse">
                  Analyzing food, protein, fiber & vitamins via Gemini AI...
                </span>
                <p className="text-xs text-slate-300 mt-2">Extracting exact macronutrients & micronutrient profile...</p>
              </div>
            </div>
          </div>
        )}

        {/* Results View */}
        {scanState === 'results' && result && (
          <div className="space-y-5">
            {/* Disclaimer Banner */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-800/40 text-[11px] text-emerald-300">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>AI Vision Analysis:</strong> Estimated portion breakdown for {result.food.name}.
              </span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
              <img
                src={result.food.image}
                alt={result.food.name}
                className="w-20 h-20 rounded-xl object-cover border border-emerald-800/40 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="mint">
                    AI ESTIMATION • {result.confidenceScore}% Confidence
                  </Badge>
                  <Badge variant="emerald">{result.healthRating}</Badge>
                  {result.food.protein >= 15 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700">
                      High Protein
                    </span>
                  )}
                  {result.food.fiber >= 4 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-900 text-teal-300 border border-teal-700">
                      High Fiber
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-bold text-white mt-1 truncate">{result.food.name}</h4>
                <p className="text-xs text-slate-400">{result.food.serving} • {result.food.dietType}</p>
              </div>
            </div>

            {/* Macro Breakdown with Highlighted Protein & Fiber */}
            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/50 bg-emerald-950/30">
                <span className="text-[10px] text-emerald-400 block font-bold uppercase">Protein</span>
                <span className="text-lg font-extrabold text-emerald-400">{result.food.protein}g</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-teal-500/40 bg-teal-950/30">
                <span className="text-[10px] text-teal-300 block font-bold uppercase">Fiber</span>
                <span className="text-lg font-extrabold text-teal-300">{result.food.fiber}g</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[10px] text-slate-400 block uppercase">Calories</span>
                <span className="text-base font-bold text-emerald-300">{result.food.calories}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[10px] text-slate-400 block uppercase">Carbs</span>
                <span className="text-base font-bold text-amber-300">{result.food.carbs}g</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-900/40">
                <span className="text-[10px] text-slate-400 block uppercase">Fat</span>
                <span className="text-base font-bold text-teal-300">{result.food.fat}g</span>
              </div>
            </div>

            {/* Vitamins & Minerals Section */}
            {(result.food.vitamins || result.food.minerals) && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2 text-xs">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Apple className="w-4 h-4 text-emerald-400" />
                  Vitamins & Minerals Detected:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.food.vitamins?.map((v, i) => (
                    <span key={`vit-${i}`} className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-medium">
                      🧪 {v}
                    </span>
                  ))}
                  {result.food.minerals?.map((m, i) => (
                    <span key={`min-${i}`} className="px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800 text-[11px] font-medium">
                      ⚡ {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Insight Box */}
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-xs text-emerald-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>{result.aiAdvice}</p>
            </div>

            {/* Action Choice: DID YOU EAT THIS? & IF I EAT THIS SIMULATE */}
            <div className="pt-3 border-t border-emerald-900/40 text-center space-y-3">
              <p className="text-xs font-bold text-white uppercase tracking-wider">DID YOU EAT THIS MEAL?</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="primary" size="md" icon={<Check className="w-4 h-4" />} onClick={handleConfirmEat}>
                  YES, I ATE THIS
                </Button>
                <Button variant="outline" size="md" icon={<HelpCircle className="w-4 h-4" />} onClick={() => setIsSimulatorOpen(true)}>
                  IF I EAT THIS? SIMULATE
                </Button>
                <Button variant="ghost" size="md" icon={<RefreshCw className="w-4 h-4" />} onClick={handleReset}>
                  NO, RESCAN
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Cost Input Prompt */}
        {scanState === 'cost_prompt' && result && (
          <div className="py-4 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center mx-auto mb-2 border border-amber-500/40">
              <Coins className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">How much did this meal cost?</h4>
            <p className="text-xs text-slate-400">Track your food expenditure against your daily budget target.</p>

            <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
              <span className="text-2xl font-bold text-emerald-400">₹</span>
              <input
                type="number"
                value={mealCost}
                onChange={(e) => setMealCost(Number(e.target.value))}
                className="w-32 text-center text-2xl font-bold bg-slate-950 border border-emerald-500/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <Button variant="primary" size="lg" onClick={handleSaveMeal}>
                Save to Database & Timeline
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* If I Eat This Simulator Modal */}
      {result && (
        <IfIEatThisModal
          food={result.food}
          isOpen={isSimulatorOpen}
          onClose={() => setIsSimulatorOpen(false)}
        />
      )}
    </>
  );
};
