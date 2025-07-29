import { useState } from "react";
import { useLanguage } from "../Components/Main/Main";
import "./PageStyles.css";
import "./News.css";

const News = () => {
  const { getText } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Bengali Newspaper Data
  const newspapers = [
    // National Dailies
    {
      id: 1,
      name: "প্রথম আলো",
      nameEn: "Prothom Alo",
      url: "https://www.prothomalo.com/",
      category: "national",
      type: "daily",
      description: "বাংলাদেশের শীর্ষস্থানীয় দৈনিক পত্রিকা",
      logo: "/news/prothomalo.png"
    },
    {
      id: 2,
      name: "কালের কণ্ঠ",
      nameEn: "Kaler Kantho",
      url: "https://www.kalerkantho.com/",
      category: "national",
      type: "daily",
      description: "জনপ্রিয় বাংলা দৈনিক",
      logo: "/news/kalerkantho.png"
    },
    {
      id: 3,
      name: "যুগান্তর",
      nameEn: "Jugantor",
      url: "https://www.jugantor.com/",
      category: "national",
      type: "daily",
      description: "বাংলাদেশের অন্যতম প্রধান দৈনিক",
      logo: "/news/jugantor.png"
    },
    {
      id: 4,
      name: "ইত্তেফাক",
      nameEn: "Ittefaq",
      url: "https://www.ittefaq.com.bd/",
      category: "national",
      type: "daily",
      description: "বাংলাদেশের ঐতিহ্যবাহী দৈনিক",
      logo: "/news/ittefaq.png"
    },
    {
      id: 5,
      name: "জনকণ্ঠ",
      nameEn: "Janakantha",
      url: "https://www.janakantha.bd/",
      category: "national",
      type: "daily",
      description: "জনপ্রিয় বাংলা দৈনিক পত্রিকা",
      logo: "/news/janakantha.png"
    },
    {
      id: 6,
      name: "সমকাল",
      nameEn: "Samakal",
      url: "https://samakal.com/",
      category: "national",
      type: "daily",
      description: "আধুনিক বাংলা দৈনিক",
      logo: "/news/samakal.png"
    },
    {
      id: 7,
      name: "বাংলাদেশ প্রতিদিন",
      nameEn: "Bangladesh Pratidin",
      url: "https://www.bd-pratidin.com/",
      category: "national",
      type: "daily",
      description: "জনপ্রিয় জাতীয় দৈনিক",
      logo: "/news/bangladeshpratidin.png"
    },
    {
      id: 8,
      name: "আমাদের সময়",
      nameEn: "Amader Somoy",
      url: "https://www.amadershomoy.com/",
      category: "national",
      type: "daily",
      description: "বাংলাদেশের প্রভাবশালী দৈনিক",
      logo: "/news/amadersomoy.png"
    },
    {
      id: 9,
      name: "মানবজমিন",
      nameEn: "Manabzamin",
      url: "https://mzamin.com/",
      category: "national",
      type: "daily",
      description: "জনপ্রিয় বাংলা দৈনিক",
      logo: "/news/manabzamin.png"
    },
    {
      id: 10,
      name: "নয়া দিগন্ত",
      nameEn: "Naya Diganta",
      url: "https://www.dailynayadiganta.com/",
      category: "national",
      type: "daily",
      description: "ইসলামিক দৃষ্টিভঙ্গির দৈনিক",
      logo: "/news/nayadiganta.png"
    },
    // English Dailies
    {
      id: 11,
      name: "The Daily Star",
      nameEn: "The Daily Star",
      url: "https://www.thedailystar.net/",
      category: "english",
      type: "daily",
      description: "Bangladesh's leading English daily",
      logo: "/news/thedailystar.png"
    },
    {
      id: 12,
      name: "Dhaka Tribune",
      nameEn: "Dhaka Tribune",
      url: "https://www.dhakatribune.com/",
      category: "english",
      type: "daily",
      description: "Modern English daily newspaper",
      logo: "/news/dhakatribune.png"
    },
    {
      id: 13,
      name: "New Age",
      nameEn: "New Age",
      url: "https://www.newagebd.net/",
      category: "english",
      type: "daily",
      description: "Independent English daily",
      logo: "/news/newage.png"
    },
    {
      id: 14,
      name: "The Business Standard",
      nameEn: "The Business Standard",
      url: "https://www.tbsnews.net/",
      category: "english",
      type: "daily",
      description: "Leading English newspaper",
      logo: "/news/tbsnews.png"
    },
    // Online News Portals
    {
      id: 15,
      name: "বিডিনিউজ২৪",
      nameEn: "bdnews24.com",
      url: "https://bangla.bdnews24.com/",
      category: "online",
      type: "portal",
      description: "অনলাইন সংবাদ পোর্টাল",
      logo: "/news/bdnews24.png"
    },
    {
      id: 16,
      name: "রাইজিংবিডি বাংলা",
      nameEn: "Risingbd",
      url: "https://www.risingbd.com/",
      category: "online",
      type: "portal",
      description: "জনপ্রিয় অনলাইন নিউজ পোর্টাল",
      logo: "/news/risingbd.png"
    },
    {
      id: 17,
      name: "বাংলানিউজ২৪",
      nameEn: "Banglanews24",
      url: "https://www.banglanews24.com/",
      category: "online",
      type: "portal",
      description: "২৪ ঘন্টার অনলাইন সংবাদ",
      logo: "/news/banglanews24.png"
    },
    {
      id: 18,
      name: "যায়যায়দিন",
      nameEn: "Jay Jay Din",
      url: "https://www.jaijaidinbd.com/",
      category: "online",
      type: "portal",
      description: "অনলাইন সংবাদ মাধ্যম",
      logo: "/news/jajabadin.png"
    },
    {
      id: 19,
      name: "দ্যা বেঙ্গল লেন্স",
      nameEn: "The Bengal Lens",
      url: "https://thebengallens.com/",
      category: "online",
      type: "portal",
      description: "প্রগতিশীল অনলাইন সংবাদ মাধ্যম",
      logo: "/news/tblense.png"
    },
    // Sports Newspapers
    {
      id: 20,
      name: "খেলাযোগ-একাত্তর",
      nameEn: "Khelajog-Ekattor",
      url: "https://ekattor.tv/khelajog",
      category: "sports",
      type: "daily",
      description: "ক্রীড়া বিষয়ক দৈনিক",
      logo: "/news/khelajog-ekattor.png"
    },
    {
      id: 21,
      name: "টি স্পোর্টস",
      nameEn: "T-Sports",
      url: "https://www.tsports.com/",
      category: "sports",
      type: "daily",
      description: "ক্রীড়া সংবাদ পত্রিকা",
      logo: "/news/t-sports.png"
    },
    // Regional Newspapers
    {
      id: 22,
      name: "দৈনিক সিলেট",
      nameEn: "Daily Sylhet",
      url: "https://www.dailysylhet.com/",
      category: "regional",
      type: "daily",
      description: "সিলেট অঞ্চলের দৈনিক",
      logo: "/news/dailysylhet.png"
    },
    {
      id: 23,
      name: "চট্টগ্রাম প্রতিদিন",
      nameEn: "Chattogram Pratidin",
      url: "https://ctgpratidin.com/",
      category: "regional",
      type: "daily",
      description: "চট্টগ্রাম অঞ্চলের সংবাদ",
      logo: "/news/chattogramtoday.png"
    },
    {
      id: 24,
      name: "আজকের ময়মনসিংহ",
      nameEn: "Ajker Mymensingh",
      url: "https://dailyazkermymensingh.com/",
      category: "regional",
      type: "daily",
      description: "চট্টগ্রাম অঞ্চলের সংবাদ",
      logo: "/news/ajkermymensingh.png"
    },
    {
      id: 25,
      name: "রাজ টাইমস",
      nameEn: "Rajshahi Times",
      url: "https://rajtimes24.com/",
      category: "regional",
      type: "daily",
      description: "রাজশাহী অঞ্চলের দৈনিক",
      logo: "/news/rajshahitimes.png"
    },
    // West Bengal Newspapers
    {
      id: 26,
      name: "আনন্দবাজার পত্রিকা",
      nameEn: "Anandabazar Patrika",
      url: "https://www.anandabazar.com/",
      category: "westbengal",
      type: "daily",
      description: "পশ্চিমবঙ্গের শীর্ষ দৈনিক",
      logo: "/news/anandabazar.png"
    },
    {
      id: 27,
      name: "বর্তমান",
      nameEn: "Bartaman",
      url: "https://bartamanpatrika.com/",
      category: "westbengal",
      type: "daily",
      description: "কলকাতার জনপ্রিয় দৈনিক",
      logo: "/news/bartaman.png"
    },
    {
      id: 28,
      name: "গণশক্তি সারাক্ষণ",
      nameEn: "Ganashakti",
      url: "https://www.ganashakti.com/",
      category: "westbengal",
      type: "daily",
      description: "পশ্চিমবঙ্গের রাজনৈতিক দৈনিক",
      logo: "/news/ganashakti.png"
    },
     {
      id: 29,
      name: "সংবাদ প্রতিদিন",
      nameEn: "Sangbad Pratidin",
      url: "https://www.sangbadpratidin.in/",
      category: "westbengal",
      type: "daily",
      description: "পশ্চিমবঙ্গের অন্যতম জনপ্রিয় দৈনিক",
      logo: "/news/sangbadpratidin.png"
    },
    {
      id: 30,
      name: "এই সময়",
      nameEn: "EI Samay",
      url: "https://eisamay.com/",
      category: "westbengal",
      type: "daily",
      description: "পশ্চিমবঙ্গের জনপ্রিয় বাংলা দৈনিক",
      logo: "/news/eisamay.png"
    }
  ];

  const categories = [
    { id: 'all', name: getText('সকল', 'All'), icon: '📰' },
    { id: 'national', name: getText('জাতীয়', 'National'), icon: '🇧🇩' },
    { id: 'english', name: getText('ইংরেজি', 'English'), icon: '🇬🇧' }, 
    { id: 'online', name: getText('অনলাইন', 'Online'), icon: '💻' },
    { id: 'sports', name: getText('ক্রীড়া', 'Sports'), icon: '⚽' },
    { id: 'regional', name: getText('আঞ্চলিক', 'Regional'), icon: '🏘️' },
    { id: 'westbengal', name: getText('পশ্চিমবঙ্গ', 'West Bengal'), icon: <img src="/wb.png" alt="WB" className="category-icon-img" style={{width: '12px', height: '12px'}} /> }
  ];

  const filteredNewspapers = newspapers.filter(newspaper => {
    const matchesCategory = selectedCategory === 'all' || newspaper.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      newspaper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newspaper.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newspaper.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleNewspaperClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="news-container">
      <div className="news-content">
        <div className="news-header">
          <h1 className="news-title">
            {getText('বাংলা সংবাদপত্র', 'Bengali Newspapers')}
          </h1>
          <p className="news-subtitle">
            {getText('সকল বাংলা সংবাদপত্রের সংগ্রহ', 'Complete Collection of Bengali Newspapers')}
          </p>
        </div>

        <div className="news-filters">
          <div className="filter-section">
            <h3 className="filter-title">
              {getText('অনুসন্ধান', 'Search')}
            </h3>
            <div className="search-container">
              <div className="search-box">
                <i className="ri-search-line search-icon"></i>
                <input
                  type="text"
                  placeholder={getText('পত্রিকার নাম খুঁজুন...', 'Search newspapers...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">
              {getText('বিভাগ', 'Categories')}
            </h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="news-results">
          <div className="results-header">
            <p className="results-count">
              {getText(
                `${filteredNewspapers.length}টি সংবাদপত্র পাওয়া গেছে`,
                `${filteredNewspapers.length} newspapers found`
              )}
            </p>
          </div>

          <div className="newspapers-grid">
            {filteredNewspapers.map((newspaper) => (
              <div
                key={newspaper.id}
                className="newspaper-card"
                onClick={() => handleNewspaperClick(newspaper.url)}
              >
                <div className="newspaper-header">
                  <img
                    src={newspaper.logo}
                    alt={`${newspaper.nameEn} logo`}
                    className="newspaper-logo"
                  />
                  <div className="newspaper-info">
                    <h3 className="newspaper-name">
                      {newspaper.name}
                    </h3>
                    <p className="newspaper-name-en">
                      {newspaper.nameEn}
                    </p>
                  </div>
                  <div className="newspaper-type">
                    <span className={`type-badge ${newspaper.type}`}>
                      {getText(
                        newspaper.type === 'daily' ? 'দৈনিক' : 'পোর্টাল',
                        newspaper.type === 'daily' ? 'Daily' : 'Portal'
                      )}
                    </span>
                  </div>
                </div>

                <div className="newspaper-content">
                  <p className="newspaper-description">
                    {newspaper.description}
                  </p>
                </div>

                <div className="newspaper-footer">
                  <div className="newspaper-category">
                    <span className={`category-badge ${newspaper.category}`}>
                      {categories.find(cat => cat.id === newspaper.category)?.icon}
                      {categories.find(cat => cat.id === newspaper.category)?.name}
                    </span>
                  </div>
                  <div className="visit-link">
                    <i className="ri-external-link-line"></i>
                    <span>{getText('পড়ুন', 'Visit')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNewspapers.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">
                <i className="ri-newspaper-line"></i>
              </div>
              <h3 className="no-results-title">
                {getText('কোনো সংবাদপত্র পাওয়া যায়নি', 'No newspapers found')}
              </h3>
              <p className="no-results-text">
                {getText(
                  'অন্য কীওয়ার্ড দিয়ে অনুসন্ধান করুন বা বিভাগ পরিবর্তন করুন',
                  'Try searching with different keywords or change the category'
                )}
              </p>
            </div>
          )}
        </div>

        <div className="news-page-footer">
          <div className="footer-info">
            <p className="footer-text">
              {getText(
                'বাংলাদেশ ও পশ্চিমবঙ্গের প্রধান সংবাদপত্রগুলির সংগ্রহ',
                'Collection of major newspapers from Bangladesh and West Bengal'
              )}
            </p>
          </div>
          <a href="/" className="back-link">
            <i className="ri-arrow-left-line"></i>
            {getText('হোমে ফিরে যান', 'Back to Home')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default News;