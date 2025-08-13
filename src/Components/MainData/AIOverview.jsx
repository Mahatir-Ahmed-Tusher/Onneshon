import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AIOverview.css";
import { useLanguage } from "../Main/Main";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PacmanLoader from "react-spinners/PacmanLoader";

const AIOverview = ({ sendDataParam, searchQuery }) => {
  const { getText } = useLanguage();
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [references, setReferences] = useState([]);

  useEffect(() => {
    if (sendDataParam?.results?.length > 0 && searchQuery) {
      generateAISummary();
    }
  }, [sendDataParam, searchQuery]);

  const generateAISummary = async () => {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!geminiApiKey || geminiApiKey.trim() === '') {
      setError(getText(
        'AI সারসংক্ষেপের জন্য Gemini API কী প্রয়োজন। অনুগ্রহ করে .env ফাইলে VITE_GEMINI_API_KEY যোগ করুন।',
        'Gemini API key required for AI summary. Please add VITE_GEMINI_API_KEY to your .env file.'
      ));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Prepare numbered references from search results (optimized to use fewer results)
      const topResults = sendDataParam.results.slice(0, 6); // Optimized to 5-6 results as requested
      const numberedResults = topResults.map((result, index) => ({
        number: index + 1,
        title: result.title,
        description: result.description,
        url: result.url
      }));
      
      setReferences(numberedResults);
      
      // Create context with numbered references
      const resultsContext = numberedResults
        .map(result => `[${result.number}] ${result.title}: ${result.description}`)
        .join('\n\n');

      const prompt = getText(
        `নিম্নলিখিত অনুসন্ধান ফলাফলের উপর ভিত্তি করে "${searchQuery}" সম্পর্কে একটি বিস্তারিত এবং তথ্যপূর্ণ সারসংক্ষেপ প্রদান করুন। 

নির্দেশনা:
- সারসংক্ষেপটি অবশ্যই বাংলায় লিখুন
- প্রতিটি তথ্যের জন্য সংশ্লিষ্ট রেফারেন্স নম্বর ব্যবহার করুন (যেমন: [১], [২], [৩])
- ৩-৪ অনুচ্ছেদে বিভক্ত করুন
- মূল বিষয়গুলো তুলে ধরুন এবং গুরুত্বপূর্ণ তথ্য অন্তর্ভুক্ত করুন
- প্রাকৃতিক এবং পড়তে সহজ ভাষা ব্যবহার করুন

অনুসন্ধান ফলাফল:
${resultsContext}`,
        `Based on the following search results, provide a detailed and informative summary about "${searchQuery}".

Instructions:
- Write the summary in English
- Use inline references with numbers for each piece of information (e.g., [1], [2], [3])
- Structure it in 3-4 paragraphs
- Highlight key points and include important information
- Use natural and readable language

Search Results:
${resultsContext}`
      );

      const result = await model.generateContent(prompt);
      
      // Handle the response properly
      if (!result || !result.response) {
        throw new Error('Invalid response from AI model');
      }
      
      const response = await result.response;
      
      // Check if response has the expected structure
      if (!response) {
        throw new Error('Empty response from AI model');
      }
      
      // Get the text content
      let summary;
      try {
        summary = response.text();
      } catch (textError) {
        console.error('Error extracting text from response:', textError);
        throw new Error('Failed to extract text from AI response');
      }
      
      // Validate that we got actual content
      if (!summary || summary.trim().length === 0) {
        throw new Error('AI model returned empty summary');
      }

      setAiSummary(summary);
    } catch (err) {
      console.error('AI Summary Error:', err);
      
      // Handle different types of errors
      let errorMessage;
      
      if (err.message && (err.message.includes('overloaded') || err.message.includes('503'))) {
        errorMessage = getText(
          'AI মডেল অতিরিক্ত ব্যস্ত। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
          'AI model is overloaded. Please try again later.'
        );
      } else if (err.message && err.message.includes('API key')) {
        errorMessage = getText(
          'API কী সমস্যা। অনুগ্রহ করে API কী যাচাই করুন।',
          'API key issue. Please verify your API key.'
        );
      } else if (err.message && err.message.includes('quota')) {
        errorMessage = getText(
          'API সীমা অতিক্রম করেছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
          'API quota exceeded. Please try again in a few minutes.'
        );
      } else if (err.message && (err.message.includes('network') || err.message.includes('fetch'))) {
        setError(getText(
          'নেটওয়ার্ক সমস্যা। ইন্টারনেট সংযোগ যাচাই করুন।',
          'Network error. Please check your internet connection.'
        ));
      } else {
        errorMessage = getText(
          'AI সারসংক্ষেপ তৈরি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
          'Failed to generate AI summary. Please try again.'
        );
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRetry = () => {
    // Add a small delay before retrying to avoid immediate API overload
    setTimeout(() => {
      generateAISummary();
    }, 1000);
  };

  // Helper function to render paragraphs with clickable references
  const renderParagraphWithReferences = (paragraph) => {
    // Match reference patterns like [1], [2], etc.
    const referencePattern = /\[(\d+)\]/g;
    const parts = paragraph.split(referencePattern);
    
    return parts.map((part, index) => {
      // Check if this part is a number (reference)
      if (index % 2 === 1) {
        const refNumber = parseInt(part);
        const reference = references.find(ref => ref.number === refNumber);
        
        if (reference) {
          return (
            <a
              key={index}
              href={reference.url}
              target="_blank"
              rel="noreferrer"
              className="inline-reference"
              title={reference.title}
            >
              [{refNumber}]
            </a>
          );
        }
        return `[${part}]`;
      }
      return part;
    });
  };

  if (!sendDataParam?.results?.length || !searchQuery) return null;

  return (
    <div className="ai-overview-section">
      <div className="section-header">
        <h2 className="section-title">
          {getText('AI সারসংক্ষেপ', 'AI Overview')}
          <i className="ri-robot-line ai-icon"></i>
        </h2>
      </div>
      
      <div className="ai-overview-card">
        {loading ? (
          <div className="ai-loading">
            <PacmanLoader color="#10b981" size={15} />
            <p className="ai-loading-text">
              {getText('AI সারসংক্ষেপ তৈরি করা হচ্ছে...', 'Generating AI summary...')}
            </p>
          </div>
        ) : error ? (
          <div className="ai-error">
            <p className="ai-error-text">
              <i className="ri-error-warning-line"></i>
              {error}
            </p>
            <button 
              className="ai-retry-button" 
              onClick={handleRetry}
              disabled={loading}
            >
              <i className="ri-refresh-line"></i>
              {getText('আবার চেষ্টা করুন', 'Try Again')}
            </button>
          </div>
        ) : aiSummary ? (
          <div className="ai-content">
            <div className="ai-header">
              <div className="ai-badge">
                <i className="ri-sparkling-line"></i>
                {getText('অন্বেষণ AI দ্বারা চালিত', 'Powered by Onneshon AI')}
              </div>
            </div>
            
            <div className="ai-summary">
              {aiSummary.split('\n\n').map((paragraph, index) => (
                <p key={index}>{renderParagraphWithReferences(paragraph)}</p>
              ))}
            </div>
            
            {references.length > 0 && (
              <div className="ai-references">
                <h4 className="references-title">
                  {getText('তথ্যসূত্র', 'References')}
                </h4>
                <div className="references-list">
                  {references.map((ref) => (
                    <div key={ref.number} className="reference-item">
                      <span className="reference-number">[{ref.number}]</span>
                      <a 
                        href={ref.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="reference-link"
                      >
                        {ref.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="ai-footer">
              <div className="ai-powered">
                <i className="ri-robot-line"></i>
                <span>{getText('AI দ্বারা উৎপন্ন', 'AI Generated')}</span>
              </div>
              <div className="ai-disclaimer">
                {getText('তথ্যের নির্ভুলতা যাচাই করুন', 'Verify information accuracy')}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

AIOverview.propTypes = {
  sendDataParam: PropTypes.any.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default AIOverview;