'use client';

import { useState } from 'react';
import { Analyzer, AnalysisResult } from 'haircare-ingredients-analyzer';
import AnalysisResults from './AnalysisResults';
import { ChatBubbleRobot, ChatBubble, ChatFooter } from './ChatBubbleRobot';
import ChatBubbleUser from './ChatBubbleUser';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  onImageUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<string>;
  isProcessing: boolean;
}

export default function AdvancedIngredientForm({
  onImageUpload,
  isProcessing,
}: Props) {
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUploadAndProcess = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const text = await onImageUpload(event);
    if (text) {
      setIngredients(text);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredients(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedIngredients = ingredients.trim();
    if (!trimmedIngredients) {
      return;
    }

    const url = `/analyzer?ingredients=${encodeURIComponent(
      trimmedIngredients,
    )}`;
    try {
      await router.push(url);
    } catch (error) {
      setError('Failed to redirect to analysis page');
    }
  };

  return (
    <div className="space-y-6">
      <>
        <ChatBubbleRobot imageUrl="/sunglasses.svg">
          <ChatBubble status="ok">
            Hi! I&apos;m the cooler new 𝙰𝚍𝚟𝚊𝚗𝚌𝚎𝚍 CurlsBot. You can upload a
            photo of your product&apos;s ingredients list, or paste the text
            manually below.
          </ChatBubble>

          <ChatFooter>
            <Link href="/analyzer">Go to standard version</Link>
          </ChatFooter>
        </ChatBubbleRobot>

        <ChatBubbleUser>
          {' '}
          <span className="label-text font-semibold m-5">
            For best results, please crop the image to only include the
            ingredients list.
          </span>
          <label className="btn btn-primary gap-2 mb-5">
            <Camera className="w-5 h-5" />
            {isProcessing ? 'Processing...' : 'Upload Image'}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUploadAndProcess}
              disabled={isProcessing}
            />
          </label>
          {isProcessing && (
            <div className="loading loading-spinner loading-md text-primary"></div>
          )}
        </ChatBubbleUser>
        <ChatBubbleUser>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-control w-full">
              <label htmlFor="ingredients-input" className="label">
                <span className="label-text font-semibold">
                  Edit anything that doesn&apos;t look like an ingredient&apos;s
                  list
                </span>
              </label>

              <textarea
                id="ingredients-input"
                className="textarea ed bg-base-100 text-base-content h-48 w-full"
                value={ingredients}
                onChange={handleTextChange}
                placeholder="Enter ingredients, ideally from a brand's website or a retailer such as Ulta Beauty"
                aria-label="ingredients"
              />
            </div>

            <button
              type="submit"
              className="btn btn-secondary w-full mt-4"
              disabled={!ingredients.trim()}
            >
              Analyze Ingredients
            </button>
          </form>
        </ChatBubbleUser>
      </>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
