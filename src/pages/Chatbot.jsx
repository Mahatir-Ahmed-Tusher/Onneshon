import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../Components/Main/Main";
import "./PageStyles.css";
import "./Chatbot.css";
import OpenAI from 'openai';

const Chatbot = () => {
  const { getText } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (editingMessageId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingMessageId]);

  const detectLanguage = (text) => {
    const bengaliRegex = /[\u0980-\u09FF]/;
    return bengaliRegex.test(text) ? 'bn' : 'en';
  };

  const getBengaliSystemPrompt = () => {
    return `আপনি কথাকুঞ্জ AI, অন্বেষণ টিমের তৈরি একটি উন্নত কৃত্রিম বুদ্ধিমত্তা সহায়ক। অন্বেষণ হল একটি বাংলা সার্চ ইঞ্জিন, এবং কথাকুঞ্জ অন্বেষণের একটি অংশ।

আপনার বৈশিষ্ট্য:
- আপনি বাংলা ভাষায় অত্যন্ত দক্ষ এবং বাংলা ব্যবহারকারীদের জন্য বিশেষভাবে ডিজাইন করা
- ব্যবহারকারী বাংলায় প্রশ্ন করলে বাংলায় উত্তর দিন, ইংরেজিতে করলে ইংরেজিতে উত্তর দিন
- ChatGPT বা DeepSeek এর মতো আচরণ করুন কিন্তু বাংলা সংস্কৃতি ও প্রসঙ্গের প্রতি বিশেষ মনোযোগ দিন
- সহায়ক, তথ্যপূর্ণ এবং বন্ধুত্বপূর্ণ হন
- জটিল বিষয়গুলো সহজ ভাষায় ব্যাখ্যা করুন
- বাংলাদেশ ও পশ্চিমবঙ্গের সংস্কৃতি, ইতিহাস ও প্রসঙ্গ সম্পর্কে ভালো জ্ঞান রাখুন

সর্বদা মনে রাখুন আপনি অন্বেষণ পরিবারের সদস্য এবং বাংলা ভাষাভাষী মানুষদের সেবা করাই আপনার প্রধান লক্ষ্য।`;
  };

  const getEnglishSystemPrompt = () => {
    return `You are Kothakunjo AI, an advanced artificial intelligence assistant created by the Onneshon team. Onneshon is a Bengali search engine, and Kothakunjo is part of the Onneshon family.

Your characteristics:
- You are highly proficient in Bengali and specifically designed for Bengali users
- Respond in Bengali if the user asks in Bengali, respond in English if they ask in English
- Behave like ChatGPT or DeepSeek but with special attention to Bengali culture and context
- Be helpful, informative, and friendly
- Explain complex topics in simple language
- Have good knowledge about Bangladesh and West Bengal culture, history, and context

Always remember you are a member of the Onneshon family and your primary goal is to serve Bengali-speaking people.`;
  };

  const sendMessage = async (messageText = null, isEdit = false, editMessageId = null) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    let updatedMessages;
    
    if (isEdit && editMessageId) {
      // Update the edited message and remove all subsequent messages
      updatedMessages = messages.map(msg => {
        if (msg.id === editMessageId) {
          return { ...msg, text: textToSend, timestamp: new Date() };
        }
        return msg;
      });
      
      // Remove all bot messages after the edited user message
      const editedMessageIndex = updatedMessages.findIndex(msg => msg.id === editMessageId);
      updatedMessages = updatedMessages.slice(0, editedMessageIndex + 1);
      
      setMessages(updatedMessages);
      setEditingMessageId(null);
    } else {
      // Add new user message
      const userMessage = {
        id: Date.now(),
        text: textToSend,
        sender: 'user',
        timestamp: new Date()
      };
      
      updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue("");
    }

    setIsLoading(true);

    try {
      if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
        throw new Error('OpenRouter API key not found');
      }

      const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const userLanguage = detectLanguage(textToSend);
      const systemPrompt = userLanguage === 'bn' ? getBengaliSystemPrompt() : getEnglishSystemPrompt();

      // Get conversation history for context (last 10 messages)
      const conversationHistory = updatedMessages
        .slice(-10)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          ...conversationHistory
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const botMessage = {
        id: Date.now() + 1,
        text: completion.choices[0].message.content,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      
      let errorMessage;
      if (error.message.includes('API key')) {
        errorMessage = getText(
          'API কী সমস্যা। অনুগ্রহ করে API কী যাচাই করুন।',
          'API key issue. Please verify your API key.'
        );
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        errorMessage = getText(
          'API সীমা অতিক্রম করেছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
          'API quota exceeded. Please try again later.'
        );
      } else {
        errorMessage = getText(
          'দুঃখিত, কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
          'Sorry, something went wrong. Please try again.'
        );
      }

      const errorBotMessage = {
        id: Date.now() + 1,
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEditSubmit();
    }
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const startEdit = (messageId, currentText) => {
    setEditingMessageId(messageId);
    setEditValue(currentText);
  };

  const handleEditSubmit = () => {
    if (editValue.trim()) {
      sendMessage(editValue, true, editingMessageId);
      setEditValue("");
    }
  };

  const handleEditCancel = () => {
    setEditingMessageId(null);
    setEditValue("");
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const newChat = () => {
    setMessages([]);
    setEditingMessageId(null);
    setEditValue("");
    inputRef.current?.focus();
  };

  const handleExampleClick = (exampleText) => {
    setInputValue(exampleText);
    inputRef.current?.focus();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-content">
        <div className="chatbot-header">
          <div className="header-left">
            <h1 className="chatbot-title">
              <i className="ri-robot-line"></i>
              {getText('কথাকুঞ্জ', 'Kothakunjo')}
            </h1>
          </div>
          <button className="new-chat-btn" onClick={newChat}>
            <i className="ri-add-line"></i>
            {getText('নতুন চ্যাট', 'New chat')}
          </button>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <div className="welcome-icon">
                <i className="ri-robot-line"></i>
              </div>
              <h2 className="welcome-title">
                {getText('কথাকুঞ্জে স্বাগতম', 'Welcome to Kothakunjo')}
              </h2>
              <p className="welcome-text">
                {getText(
                  'আমি কথাকুঞ্জ AI, অন্বেষণ টিমের তৈরি আপনার বুদ্ধিমান সহায়ক। আমি বাংলা ও ইংরেজি দুই ভাষায়ই কথা বলতে পারি। আপনার যে কোনো প্রশ্ন বা সাহায্যের জন্য আমি এখানে আছি।',
                  'I am Kothakunjo AI, your intelligent assistant created by the Onneshon team. I can communicate in both Bengali and English. I\'m here to help with any questions or assistance you need.'
                )}
              </p>
              <div className="example-questions">
                <button 
                  className="example-btn"
                  onClick={() => handleExampleClick(getText('বাংলাদেশের ইতিহাস সম্পর্কে বলো', 'Tell me about the history of Bangladesh'))}
                >
                  {getText('বাংলাদেশের ইতিহাস সম্পর্কে বলো', 'Tell me about the history of Bangladesh')}
                </button>
                <button 
                  className="example-btn"
                  onClick={() => handleExampleClick(getText('একটি বাংলা কবিতা লিখো', 'Write a Bengali poem'))}
                >
                  {getText('একটি বাংলা কবিতা লিখো', 'Write a Bengali poem')}
                </button>
                <button 
                  className="example-btn"
                  onClick={() => handleExampleClick(getText('বাংলা ভাষার গুরুত্ব ব্যাখ্যা করো', 'Explain the importance of Bengali language'))}
                >
                  {getText('বাংলা ভাষার গুরুত্ব ব্যাখ্যা করো', 'Explain the importance of Bengali language')}
                </button>
                <button 
                  className="example-btn"
                  onClick={() => handleExampleClick(getText('আজকের দিনটি কেমন কাটানো যায়?', 'How can I make today productive?'))}
                >
                  {getText('আজকের দিনটি কেমন কাটানো যায়?', 'How can I make today productive?')}
                </button>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-wrapper">
                    <div className="message-avatar">
                      {message.sender === 'user' ? (
                        <i className="ri-user-line"></i>
                      ) : (
                        <i className="ri-robot-line"></i>
                      )}
                    </div>
                    <div className="message-content">
                      {editingMessageId === message.id ? (
                        <div className="edit-form">
                          <textarea
                            ref={editInputRef}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleEditKeyPress}
                            className="edit-textarea"
                            placeholder={getText(
                              'আপনার বার্তা সম্পাদনা করুন...',
                              'Edit your message...'
                            )}
                          />
                          <div className="edit-actions">
                            <button className="edit-btn" onClick={handleEditSubmit}>
                              <i className="ri-check-line"></i>
                              {getText('পাঠান', 'Send')}
                            </button>
                            <button className="edit-btn cancel" onClick={handleEditCancel}>
                              <i className="ri-close-line"></i>
                              {getText('বাতিল', 'Cancel')}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className={`message-text ${message.isError ? 'error' : ''}`}>
                            {message.text}
                          </div>
                          <div className="message-actions">
                            {message.sender === 'user' && (
                              <button 
                                className="action-btn"
                                onClick={() => startEdit(message.id, message.text)}
                                title={getText('সম্পাদনা করুন', 'Edit message')}
                              >
                                <i className="ri-edit-line"></i>
                                {getText('সম্পাদনা', 'Edit')}
                              </button>
                            )}
                            <button 
                              className="action-btn"
                              onClick={() => copyMessage(message.text)}
                              title={getText('কপি করুন', 'Copy message')}
                            >
                              <i className="ri-file-copy-line"></i>
                              {getText('কপি', 'Copy')}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="message bot">
                  <div className="message-wrapper">
                    <div className="message-avatar">
                      <i className="ri-robot-line"></i>
                    </div>
                    <div className="message-content">
                      <div className="thinking-indicator">
                        <div className="thinking-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span className="thinking-text">
                          {getText('চিন্তা করছি...', 'Thinking...')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="input-wrapper">
            <div className="chat-input-box">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={getText(
                  'কথাকুঞ্জের সাথে কথা বলুন... (Enter চাপুন পাঠাতে)',
                  'Message Kothakunjo... (Press Enter to send)'
                )}
                className="chat-input"
                rows="1"
                disabled={isLoading}
              />
              <button 
                className="send-btn" 
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isLoading}
                title={getText('বার্তা পাঠান', 'Send message')}
              >
                <i className="ri-send-plane-2-line"></i>
              </button>
            </div>
            <div className="input-footer">
              <span className="powered-by">
                <i className="ri-sparkling-line"></i>
                {getText('অন্বেষণ দ্বারা চালিত', 'Powered by Onneshon')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;