
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Spinner } from './components/Spinner';
import { generateTryOnImage } from './services/geminiService';

const App: React.FC = () => {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!personImage || !clothingImage) {
      setError("Please upload both a person and a clothing item.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateTryOnImage(personImage, clothingImage);
      setGeneratedImage(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate image. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [personImage, clothingImage]);
  
  const handleReset = useCallback(() => {
    setPersonImage(null);
    setClothingImage(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const isGenerateDisabled = !personImage || !clothingImage || isLoading;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            Virtual <span className="text-indigo-500">Try-On</span>
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Upload a photo of a person and a clothing item to see the magic.
          </p>
        </header>
        
        {!generatedImage && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ImageUploader 
              id="person-uploader"
              label="Upload Person"
              image={personImage}
              onImageChange={setPersonImage}
              onImageRemove={() => setPersonImage(null)}
            />
            <ImageUploader 
              id="clothing-uploader"
              label="Upload Clothing"
              image={clothingImage}
              onImageChange={setClothingImage}
              onImageRemove={() => setClothingImage(null)}
            />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!generatedImage && !isLoading && (
          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={isGenerateDisabled}
              className={`px-8 py-4 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
                isGenerateDisabled
                  ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800'
              }`}
            >
              Generate Try-On
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <Spinner />
            <p className="mt-4 text-lg font-semibold text-indigo-500 animate-pulse">
              Generating your virtual try-on...
            </p>
             <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              This may take a moment.
            </p>
          </div>
        )}

        {generatedImage && (
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in text-center">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Your Virtual Try-On!</h2>
            <div className="max-w-2xl mx-auto">
              <img 
                src={generatedImage} 
                alt="Generated virtual try-on"
                className="rounded-lg shadow-2xl w-full object-contain"
              />
            </div>
            <button
              onClick={handleReset}
              className="mt-8 px-8 py-3 text-md font-semibold rounded-lg shadow-md transition-all duration-300 bg-slate-600 hover:bg-slate-700 text-white focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-800"
            >
              Start Over
            </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
