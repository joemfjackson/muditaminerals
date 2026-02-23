"use client";

import { useRef, useState } from "react";
import { Camera, X, Loader2, ImagePlus } from "lucide-react";

interface Props {
  initialImages?: string[];
}

export function ImageUpload({ initialImages = [] }: Props) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div>
      <label className="block text-sm text-[var(--color-bone)] mb-2">
        Images
      </label>

      {/* Hidden input that submits the URLs with the form */}
      <input type="hidden" name="images" value={images.join("\n")} />

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

      {/* Hidden file input — accept="image/*" with capture lets mobile users take a photo */}
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
    </div>
  );
}
