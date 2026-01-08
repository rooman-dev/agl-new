import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import './AIChatbot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Predefined responses for common questions
const getResponse = (message: string, isArabic: boolean): string => {
  const lowerMessage = message.toLowerCase();
  
  // English responses
  const responses: { [key: string]: { en: string; ar: string } } = {
    greeting: {
      en: "Hello! 👋 Welcome to AdsGeniusLab. I'm here to help you with digital marketing solutions. How can I assist you today?",
      ar: "مرحباً! 👋 أهلاً بك في AdsGeniusLab. أنا هنا لمساعدتك في حلول التسويق الرقمي. كيف يمكنني مساعدتك اليوم؟"
    },
    services: {
      en: "We offer comprehensive digital marketing services including:\n\n📈 SEO Optimization\n📱 Social Media Marketing\n✍️ Content Strategy\n💰 PPC Advertising\n📧 Email Marketing\n📊 Analytics & Reporting\n\nWould you like to know more about any specific service?",
      ar: "نقدم خدمات تسويق رقمي شاملة تشمل:\n\n📈 تحسين محركات البحث\n📱 التسويق عبر وسائل التواصل الاجتماعي\n✍️ استراتيجية المحتوى\n💰 إعلانات الدفع لكل نقرة\n📧 التسويق عبر البريد الإلكتروني\n📊 التحليلات والتقارير\n\nهل تريد معرفة المزيد عن أي خدمة محددة؟"
    },
    pricing: {
      en: "Our pricing varies based on your specific needs and goals. We offer customized packages starting from $1,000/month. For an accurate quote, I'd recommend scheduling a free consultation where we can discuss your requirements in detail. Would you like to book one?",
      ar: "تختلف أسعارنا بناءً على احتياجاتك وأهدافك المحددة. نقدم باقات مخصصة تبدأ من 1,000 دولار/شهر. للحصول على عرض سعر دقيق، أنصح بحجز استشارة مجانية حيث يمكننا مناقشة متطلباتك بالتفصيل. هل ترغب في الحجز؟"
    },
    consultation: {
      en: "Great! You can book a free consultation through our website. Our team will analyze your business needs and create a customized strategy. Visit our Consultation page or I can guide you there. Would you like me to help you get started?",
      ar: "رائع! يمكنك حجز استشارة مجانية من خلال موقعنا. سيقوم فريقنا بتحليل احتياجات عملك وإنشاء استراتيجية مخصصة. زر صفحة الاستشارة أو يمكنني توجيهك إليها. هل تريد أن أساعدك في البدء؟"
    },
    contact: {
      en: "You can reach us through:\n\n📧 Email: roomankhan2512@gmail.com\n📱 Phone: +92 318 1292628\n💬 WhatsApp: Available on our website\n\nOr visit our Contact page for more options. We typically respond within 24 hours!",
      ar: "يمكنك التواصل معنا من خلال:\n\n📧 البريد الإلكتروني: roomankhan2512@gmail.com\n📱 الهاتف: +92 318 1292628\n💬 واتساب: متاح على موقعنا\n\nأو زر صفحة التواصل لمزيد من الخيارات. نرد عادة خلال 24 ساعة!"
    },
    seo: {
      en: "Our SEO services help improve your website's visibility in search engines. We focus on:\n\n✅ Keyword Research & Strategy\n✅ On-Page Optimization\n✅ Technical SEO\n✅ Link Building\n✅ Content Optimization\n\nWe've helped clients achieve 300%+ growth in organic traffic!",
      ar: "تساعد خدمات تحسين محركات البحث لدينا في تحسين ظهور موقعك في محركات البحث. نركز على:\n\n✅ بحث الكلمات المفتاحية والاستراتيجية\n✅ تحسين الصفحة\n✅ SEO التقني\n✅ بناء الروابط\n✅ تحسين المحتوى\n\nلقد ساعدنا العملاء في تحقيق نمو بنسبة 300%+ في الزيارات العضوية!"
    },
    social: {
      en: "Our Social Media Marketing services include:\n\n📱 Platform Strategy (Instagram, Facebook, LinkedIn, TikTok)\n📝 Content Creation & Scheduling\n🎯 Paid Advertising Campaigns\n📊 Analytics & Reporting\n👥 Community Management\n\nWe help build your brand presence across all major platforms!",
      ar: "تشمل خدمات التسويق عبر وسائل التواصل الاجتماعي لدينا:\n\n📱 استراتيجية المنصات (إنستغرام، فيسبوك، لينكد إن، تيك توك)\n📝 إنشاء المحتوى والجدولة\n🎯 حملات الإعلانات المدفوعة\n📊 التحليلات والتقارير\n👥 إدارة المجتمع\n\nنساعد في بناء حضور علامتك التجارية عبر جميع المنصات الرئيسية!"
    },
    results: {
      en: "We're proud of our results:\n\n🏆 500+ Successful Campaigns\n⭐ 98% Client Satisfaction\n📈 300% Average Traffic Increase\n🎯 15+ Industries Served\n\nWe focus on measurable results and ROI for every client.",
      ar: "نحن فخورون بنتائجنا:\n\n🏆 أكثر من 500 حملة ناجحة\n⭐ رضا العملاء 98%\n📈 متوسط زيادة الزيارات 300%\n🎯 خدمة أكثر من 15 صناعة\n\nنركز على النتائج القابلة للقياس والعائد على الاستثمار لكل عميل."
    },
    default: {
      en: "Thank you for your question! For more specific information, I'd recommend speaking with our team directly. You can:\n\n1️⃣ Book a free consultation\n2️⃣ Contact us via email or phone\n3️⃣ Use WhatsApp for quick responses\n\nIs there anything else I can help you with?",
      ar: "شكراً على سؤالك! للحصول على معلومات أكثر تحديداً، أنصح بالتحدث مع فريقنا مباشرة. يمكنك:\n\n1️⃣ حجز استشارة مجانية\n2️⃣ التواصل عبر البريد الإلكتروني أو الهاتف\n3️⃣ استخدام واتساب للردود السريعة\n\nهل هناك شيء آخر يمكنني مساعدتك به؟"
    }
  };

  // Match patterns
  if (lowerMessage.match(/hello|hi|hey|مرحبا|اهلا|السلام/)) {
    return isArabic ? responses.greeting.ar : responses.greeting.en;
  }
  if (lowerMessage.match(/service|خدم|ماذا تقدم|what do you/)) {
    return isArabic ? responses.services.ar : responses.services.en;
  }
  if (lowerMessage.match(/price|cost|pricing|سعر|تكلفة|كم/)) {
    return isArabic ? responses.pricing.ar : responses.pricing.en;
  }
  if (lowerMessage.match(/consultation|consult|استشار|موعد/)) {
    return isArabic ? responses.consultation.ar : responses.consultation.en;
  }
  if (lowerMessage.match(/contact|reach|email|phone|تواصل|اتصال|بريد/)) {
    return isArabic ? responses.contact.ar : responses.contact.en;
  }
  if (lowerMessage.match(/seo|search engine|محركات البحث/)) {
    return isArabic ? responses.seo.ar : responses.seo.en;
  }
  if (lowerMessage.match(/social|instagram|facebook|تواصل اجتماعي|انستغرام|فيسبوك/)) {
    return isArabic ? responses.social.ar : responses.social.en;
  }
  if (lowerMessage.match(/result|success|نتائج|نجاح/)) {
    return isArabic ? responses.results.ar : responses.results.en;
  }
  
  return isArabic ? responses.default.ar : responses.default.en;
};

const AIChatbot = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: 1,
        text: isArabic 
          ? "مرحباً! 👋 أنا مساعدك الذكي في AdsGeniusLab. كيف يمكنني مساعدتك اليوم؟"
          : "Hello! 👋 I'm your AI assistant at AdsGeniusLab. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [isOpen, isArabic, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(inputValue, isArabic);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickQuestions = isArabic
    ? ['ما هي خدماتكم؟', 'كيف أتواصل معكم؟', 'أريد استشارة']
    : ['What services do you offer?', 'How can I contact you?', 'I want a consultation'];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <>
            <i className="fas fa-robot"></i>
            <span className="chat-badge"></span>
          </>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <i className="fas fa-robot"></i>
            </div>
            <div className="chatbot-header-text">
              <h4>{isArabic ? 'مساعد AdsGeniusLab' : 'AdsGeniusLab Assistant'}</h4>
              <span className="status-online">
                <span className="status-dot"></span>
                {isArabic ? 'متصل الآن' : 'Online'}
              </span>
            </div>
          </div>
          <button 
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender}`}
            >
              {message.sender === 'bot' && (
                <div className="message-avatar">
                  <i className="fas fa-robot"></i>
                </div>
              )}
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="message-content typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="quick-questions">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question-btn"
                onClick={() => {
                  setInputValue(question);
                  setTimeout(() => {
                    const form = document.querySelector('.chatbot-input-form') as HTMLFormElement;
                    if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
                  }, 100);
                }}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
            disabled={isTyping}
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            <i className={`fas ${isArabic ? 'fa-paper-plane fa-flip-horizontal' : 'fa-paper-plane'}`}></i>
          </button>
        </form>

        {/* Footer */}
        <div className="chatbot-footer">
          <span>{isArabic ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}</span>
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
