"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

export function ImageUploadField() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  function syncInput(next: File[]) {
    const transfer = new DataTransfer();
    next.forEach((file) => transfer.items.add(file));
    if (inputRef.current) inputRef.current.files = transfer.files;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    const next = [...files, ...picked];
    setFiles(next);
    syncInput(next);
  }

  function removeAt(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    syncInput(next);
  }

  return (
    <div>
      {files.length > 0 && (
        <p className="mt-4 text-xs text-ink-faint">
          {files.length} image{files.length === 1 ? "" : "s"} selected
        </p>
      )}
      <div className="mt-2 grid grid-cols-5 gap-3">
        <input
          ref={inputRef}
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
        />

        {files.map((file, index) => (
          <div key={`${file.name}-${index}`} className="relative aspect-square overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-full w-full object-cover"
            />
            {index === 0 && (
              <span className="absolute top-2 left-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-medium text-white">
                Cover
              </span>
            )}
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-ink-soft hover:bg-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border text-ink-faint hover:border-ink/25 hover:text-ink-soft"
        >
          <Upload className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-xs">Upload images</span>
        </button>
      </div>
    </div>
  );
}
