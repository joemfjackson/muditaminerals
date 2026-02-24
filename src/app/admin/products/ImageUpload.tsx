"use client";

import { useRef, useState, useCallback } from "react";
import { Camera, X, Loader2, ImagePlus, Crosshair } from "lucide-react";

interface Props {
  initialImages?: string[];
  initialFocalPoint?: { x: number; y: number };
}

export function ImageUpload({ initialImages = [], initialFocalPoint }: Props) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [focalPoint, setFocalPoint] = useState<{ x: number; y: number }>(
    initialFocalPoint ?? { x: 50, y: 50 }
  );

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(undefined);
    setUploading(true);

    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Upload failed");
          continue;
        }

        newUrls.push(data.url);
      } catch {
        setError("Upload failed. Check your connection.");
      }
    }

    if (newUrls.length > 0) {
      setImages((prev) => [...prev, ...newUrls]);
    }
    setUploading(false);

    // Reset input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFocalPointClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      setFocalPoint({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    },
    []
  );

  const firstImage = images.length > 0 && images[0].startsWith("http") ? images[0] : null;

  return (
    <div>
      <label className="block text-sm text-[var(--color-bone)] mb-2">
        Images
      </label>

      {/* Hidden inputs for form submission */}
      <input type="hidden" name="images" value={images.join("\n")} />
      <input type="hidden" name="focal_point" value={JSON.stringify(focalPoint)} />

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-square">
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover rounded border border-[var(--color-stone)]"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 p-1 bg-black/70 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-[var(--color-gold)]/90 text-[#0A0A0A] text-[9px] font-bold uppercase rounded">
                  Card image
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <div className="flex gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 border border-dashed border-[var(--color-stone)] rounded text-sm text-[var(--color-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-bone)] transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              <ImagePlus className="w-4 h-4" />
              Add Image
            </>
          )}
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleUpload(e.target.files)}
      />

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

      <p className="text-xs text-[var(--color-muted)] mt-2">
        Tap to take a photo or choose from your device. Max 10MB per image.
      </p>

      {/* Focal point picker — only shown when there's at least one image */}
      {firstImage && (
        <div className="mt-5 border-t border-[var(--color-stone)] pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Crosshair className="w-4 h-4 text-[var(--color-gold)]" />
            <label className="text-sm text-[var(--color-bone)]">
              Card Crop Position
            </label>
          </div>
          <p className="text-xs text-[var(--color-muted)] mb-3">
            Click on the image to set the focus point for the shop card crop. The crosshair shows what will be centered in the square card view.
          </p>

          <div className="flex gap-4 items-start">
            {/* Clickable full image */}
            <div className="flex-1 max-w-xs">
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1.5">Click to set focus</p>
              <div
                className="relative cursor-crosshair overflow-hidden rounded border border-[var(--color-stone)] bg-[var(--color-charcoal)]"
                onClick={handleFocalPointClick}
              >
                <img
                  src={firstImage}
                  alt="Set focal point"
                  className="w-full h-auto block"
                  draggable={false}
                />
                {/* Crosshair marker */}
                <div
                  className="absolute w-6 h-6 pointer-events-none"
                  style={{
                    left: `${focalPoint.x}%`,
                    top: `${focalPoint.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-[var(--color-gold)] shadow-[0_0_6px_rgba(197,165,90,0.6)]" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-gold)] -translate-x-1/2" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--color-gold)] -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* 4:3 Preview */}
            <div className="flex-1 max-w-xs">
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1.5">Card preview (square)</p>
              <div className="relative aspect-square overflow-hidden rounded border border-[var(--color-stone)] bg-[var(--color-charcoal)]">
                <img
                  src={firstImage}
                  alt="Card preview"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: `${focalPoint.x}% ${focalPoint.y}%` }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
