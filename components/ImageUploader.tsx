
import React, { useRef } from 'react';

interface ImageUploaderProps {
  id: string;
  label: string;
  image: string | null;
  onImageChange: (imageDataUrl: string) => void;
  onImageRemove: () => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const PersonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const ClothingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" transform="scale(1, -1) translate(0, -24)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.91 8.76a4.502 4.502 0 00-8.82 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.5l-1-4h11l-1 4" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, image, onImageChange, onImageRemove }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
      <h3 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-300">{label}</h3>
      <div className="w-full h-64 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center relative bg-slate-50 dark:bg-slate-700/50 overflow-hidden">
        {image ? (
          <>
            <img src={image} alt={label} className="h-full w-full object-cover" />
            <button
              onClick={onImageRemove}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1.5 hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center cursor-pointer" onClick={() => inputRef.current?.click()}>
            {label === "Upload Person" ? <PersonIcon /> : <ClothingIcon />}
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Click to upload an image
            </p>
          </div>
        )}
      </div>
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
       <button
        onClick={() => inputRef.current?.click()}
        className="mt-4 w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors"
      >
        {image ? 'Change Image' : 'Select Image'}
      </button>
    </div>
  );
};
