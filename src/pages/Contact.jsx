import { useLanguage } from "../Components/Main/Main";
import "./PageStyles.css";

const Contact = () => {
  const { getText } = useLanguage();

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">
            {getText('যোগাযোগ', 'Contact')}
          </h1>
          <div className="page-divider"></div>
        </div>

        <div className="page-body">
          <section className="content-section">
            <h2 className="section-title">
              {getText('আমাদের সাথে যোগাযোগ করুন', 'Get in Touch')}
            </h2>
            <p className="section-text">
              {getText(
                'আমাদের সাথে যোগাযোগ করতে নিম্নলিখিত ইমেল ঠিকানায় পৌঁছান। আমরা সাধারণত ২৪-৪৮ ঘণ্টার মধ্যে সাড়া দিই। আপনার প্রশ্ন বা মতামত আমাদের জন্য মূল্যবান।',
                'Reach out to us at the following email address. We typically respond within 24-48 hours. Your questions or feedback are valuable to us.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('ইমেল ঠিকানা', 'Email Address')}
            </h2>
            <div className="contact-info">
              <div className="contact-item">
                <i className="ri-mail-line contact-icon"></i>
                <a href="mailto:mahatirtusher@gmail.com" className="contact-link">
                  mahatirtusher@gmail.com
                </a>
              </div>
            </div>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('প্রতিক্রিয়ার সময়', 'Response Time')}
            </h2>
            <p className="section-text">
              {getText(
                'আমরা আপনার ইমেলের উত্তর দেওয়ার জন্য সর্বোচ্চ চেষ্টা করি। সাধারণত আমরা ২৪-৪৮ ঘণ্টার মধ্যে প্রতিক্রিয়া জানাই। জরুরি বিষয়ের জন্য অনুগ্রহ করে ইমেইলের বিষয় লাইনে "জরুরি" উল্লেখ করুন।',
                'We make every effort to respond to your emails. We typically respond within 24-48 hours. For urgent matters, please mention "Urgent" in the email subject line.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('প্রতিক্রিয়া ও পরামর্শ', 'Feedback and Suggestions')}
            </h2>
            <p className="section-text">
              {getText(
                'আমরা আপনার মতামত এবং পরামর্শকে স্বাগত জানাই। আমাদের সেবা উন্নত করতে আপনার অভিজ্ঞতা এবং পরামর্শ আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। অনুগ্রহ করে আমাদের জানান কীভাবে আমরা আরও ভাল সেবা প্রদান করতে পারি।',
                'We welcome your feedback and suggestions. Your experience and recommendations are extremely important to us in improving our services. Please let us know how we can provide better service.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('প্রযুক্তিগত সহায়তা', 'Technical Support')}
            </h2>
            <p className="section-text">
              {getText(
                'যদি আপনি কোনো প্রযুক্তিগত সমস্যার সম্মুখীন হন, অনুগ্রহ করে আমাদের জানান। আমরা যত তাড়াতাড়ি সম্ভব সমস্যার সমাধান করার চেষ্টা করব। সমস্যার বিস্তারিত বিবরণ এবং স্ক্রিনশট (যদি সম্ভব হয়) পাঠালে আমাদের সাহায্য করবে।',
                'If you encounter any technical issues, please let us know. We will try to resolve the problem as quickly as possible. Detailed description of the problem and screenshots (if possible) will help us assist you better.'
              )}
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

export default Contact;