import { useLanguage } from "../Components/Main/Main";
import "./PageStyles.css";

const Privacy = () => {
  const { getText } = useLanguage();

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">
            {getText('গোপনীয়তা নীতি', 'Privacy Policy')}
          </h1>
          <div className="page-divider"></div>
        </div>

        <div className="page-body">
          <section className="content-section">
            <h2 className="section-title">
              {getText('তথ্য সংগ্রহ ও ব্যবহার', 'Information Collection and Use')}
            </h2>
            <p className="section-text">
              {getText(
                'আমরা আপনার গোপনীয়তাকে মূল্য দিই। এই ওয়েবসাইট ব্যবহারকারীদের তথ্য সংগ্রহ, সংরক্ষণ এবং প্রক্রিয়াকরণের জন্য শিল্প-মানের নিরাপত্তা ব্যবস্থা ব্যবহার করে। আমরা আপনার ব্যক্তিগত তথ্য যেমন নাম, ইমেল বা অন্যান্য বিবরণ তৃতীয় পক্ষের সাথে শেয়ার করি না, যদি না আইন দ্বারা প্রয়োজন হয়।',
                'We value your privacy. This website uses industry-standard security measures to collect, store, and process user information. We do not share your personal information, such as name, email, or other details, with third parties unless required by law.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('ডেটা ব্যবহার', 'Data Usage')}
            </h2>
            <p className="section-text">
              {getText(
                'আপনার ডেটা শুধুমাত্র আমাদের পরিষেবা উন্নত করতে এবং ব্যক্তিগতকৃত অভিজ্ঞতা প্রদানের জন্য ব্যবহৃত হয়। আমরা আপনার অনুসন্ধানের ইতিহাস বিশ্লেষণ করি শুধুমাত্র আরও ভাল ফলাফল প্রদানের জন্য।',
                'Your data is used solely to improve our services and provide a personalized experience. We analyze your search history only to provide better results and enhance your experience.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('কুকিজ ও ট্র্যাকিং', 'Cookies and Tracking')}
            </h2>
            <p className="section-text">
              {getText(
                'আমরা আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহার করি। এই কুকিজগুলি আপনার পছন্দ সংরক্ষণ করে এবং আপনাকে আরও প্রাসঙ্গিক বিষয়বস্তু প্রদান করতে সাহায্য করে। আপনি যেকোনো সময় আপনার ব্রাউজার সেটিংস থেকে কুকিজ নিষ্ক্রিয় করতে পারেন।',
                'We use cookies to enhance your browsing experience. These cookies store your preferences and help us provide more relevant content. You can disable cookies from your browser settings at any time.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('তৃতীয় পক্ষের সেবা', 'Third-Party Services')}
            </h2>
            <p className="section-text">
              {getText(
                'আমাদের সেবা তৃতীয় পক্ষের API এবং সেবা ব্যবহার করে যেমন Google Search API এবং Gemini AI। এই সেবাগুলির নিজস্ব গোপনীয়তা নীতি রয়েছে যা আমরা মেনে চলি।',
                'Our service uses third-party APIs and services such as Google Search API and Gemini AI. These services have their own privacy policies which we adhere to.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('যোগাযোগ', 'Contact')}
            </h2>
            <p className="section-text">
              {getText(
                'গোপনীয়তা সংক্রান্ত কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন: ',
                'If you have any questions about privacy, contact us at: '
              )}
              <a href="mailto:mahatirtusher@gmail.com" className="contact-link">
                mahatirtusher@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="page-footer">
          <a href="/" className="back-link">
            <i className="ri-arrow-left-line"></i>
            {getText('হোমে ফিরে যান', 'Back to Home')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Privacy;