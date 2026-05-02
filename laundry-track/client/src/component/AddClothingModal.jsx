import React, { useEffect, useRef, useState } from 'react';
import { X, Upload, Camera, Check, RefreshCw, Plus } from 'lucide-react';

export const DEFAULT_TAGS = [
  { id: 'travel', label: 'Travel' },
  { id: 'night-suit', label: 'Night Suit' },
  { id: 'exercise', label: 'Exercise' },
  { id: 'casual', label: 'Casual' },
  { id: 'formal', label: 'Formal' },
  { id: 'work', label: 'Work' },
];

const slugify = (s) =>
  s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function AddClothingModal({
  isOpen,
  onClose,
  onConfirm,
  collectionName,
  customTags = [],
  onAddCustomTag,
}) {
  const [mode, setMode] = useState('choose');
  const [imageData, setImageData] = useState(null);
  const [selectedTag, setSelectedTag] = useState('');
  const [note, setNote] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTagLabel, setNewTagLabel] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const resetState = () => {
    stopCamera();
    setMode('choose');
    setImageData(null);
    setSelectedTag('');
    setNote('');
    setCameraError('');
    setShowTagInput(false);
    setNewTagLabel('');
  };

  useEffect(() => {
    if (!isOpen) resetState();
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError('');
    setMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      setCameraError(
        'Cannot access camera. Please allow camera permission or use upload instead.'
      );
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setImageData(dataUrl);
    stopCamera();
    setMode('preview');
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
      setMode('preview');
    };
    reader.readAsDataURL(file);
  };

  const handleAddCustomTag = () => {
    const label = newTagLabel.trim();
    if (!label) return;
    const id = slugify(label) || `custom-${Date.now()}`;
    const exists =
      DEFAULT_TAGS.some((t) => t.id === id) || customTags.some((t) => t.id === id);
    if (!exists) {
      onAddCustomTag?.({ id, label });
    }
    setSelectedTag(id);
    setNewTagLabel('');
    setShowTagInput(false);
  };

  const handleConfirm = () => {
    if (!imageData || !selectedTag) return;
    onConfirm({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      image: imageData,
      tag: selectedTag,
      note,
      createdAt: new Date().toISOString(),
      returned: false,
      returnedAt: null,
    });
    resetState();
    onClose();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!isOpen) return null;

  const allTags = [...DEFAULT_TAGS, ...customTags];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Add Clothing Item
            </h2>
            {collectionName && (
              <p className="text-sm text-slate-500 mt-0.5">
                to <span className="font-medium">{collectionName}</span>
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Step 1: choose source */}
          {mode === 'choose' && !imageData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-300 hover:border-teal-400 hover:bg-teal-50 rounded-xl p-8 transition-colors"
              >
                <Upload className="w-10 h-10 text-teal-500" />
                <span className="font-medium text-slate-900">Upload from device</span>
                <span className="text-xs text-slate-500">JPG, PNG up to ~5MB</span>
              </button>
              <button
                onClick={startCamera}
                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-300 hover:border-teal-400 hover:bg-teal-50 rounded-xl p-8 transition-colors"
              >
                <Camera className="w-10 h-10 text-teal-500" />
                <span className="font-medium text-slate-900">Take a photo</span>
                <span className="text-xs text-slate-500">Use your camera</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}

          {/* Step 2: live camera */}
          {mode === 'camera' && (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
              </div>
              {cameraError && (
                <p className="text-sm text-red-600">{cameraError}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    stopCamera();
                    setMode('choose');
                  }}
                  className="flex-1 border border-slate-200 text-slate-700 font-medium py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  disabled={!!cameraError}
                  className="flex-1 bg-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capture
                </button>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {/* Step 3: preview + tag selection */}
          {mode === 'preview' && imageData && (
            <div className="space-y-5">
              <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-video">
                <img
                  src={imageData}
                  alt="Clothing preview"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => {
                    setImageData(null);
                    setMode('choose');
                  }}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1 shadow"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retake
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Tag <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => setSelectedTag(tag.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        selectedTag === tag.id
                          ? 'bg-teal-400 text-white border-teal-400'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}

                  {!showTagInput && (
                    <button
                      type="button"
                      onClick={() => setShowTagInput(true)}
                      className="px-3 py-2 rounded-full text-sm font-medium border border-dashed border-slate-300 text-slate-600 hover:border-teal-400 hover:text-teal-500 flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add tag
                    </button>
                  )}
                </div>

                {showTagInput && (
                  <div className="mt-3 flex gap-2">
                    <input
                      autoFocus
                      type="text"
                      value={newTagLabel}
                      onChange={(e) => setNewTagLabel(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomTag();
                        }
                        if (e.key === 'Escape') {
                          setShowTagInput(false);
                          setNewTagLabel('');
                        }
                      }}
                      placeholder="e.g. School Uniform"
                      maxLength={30}
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomTag}
                      disabled={!newTagLabel.trim()}
                      className="px-4 py-2 text-sm font-medium bg-teal-400 text-white rounded-lg hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowTagInput(false);
                        setNewTagLabel('');
                      }}
                      className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Note (optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Blue cotton t-shirt"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="flex-1 border border-slate-200 text-slate-700 font-medium py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!selectedTag}
                  className="flex-1 bg-teal-400 text-white font-medium py-3 px-4 rounded-lg hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Confirm Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddClothingModal;
