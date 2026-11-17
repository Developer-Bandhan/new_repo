'use client';

import React, { useEffect, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface ImagePickerProps {
  label: string;
  hint?: string;
  /** Aspect of the preview box, e.g. 'aspect-square' or 'aspect-[3/1]' */
  aspect?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
}

/** Local preview only. TODO(backend): upload the File to /upload (Cloudinary/S3) and store the URL. */
export const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  hint,
  aspect = 'aspect-square',
  accept = 'image/png,image/jpeg,image/webp',
  onChange,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file || !file.type.startsWith('image/')) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = (f: File | null) => {
    setFile(f);
    onChange?.(f);
  };

  return (
    <div className="font-bengali">
      <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>
      <label
        className={`relative ${aspect} w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-brand-orange flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden transition`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : file ? (
          <span className="px-2 text-xs text-slate-700 break-all">{file.name}</span>
        ) : (
          <>
            <ImagePlus className="w-6 h-6 text-slate-400" />
            <span className="mt-1 text-[11px] text-slate-500">ছবি বাছাই করুন</span>
          </>
        )}
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => pick(e.target.files?.[0] ?? null)}
        />
      </label>
      {file && (
        <button type="button" onClick={() => pick(null)} className="mt-1 inline-flex items-center gap-1 text-[11px] text-red-600">
          <X className="w-3 h-3" /> সরান
        </button>
      )}
      {hint && <p className="mt-1 text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
};
