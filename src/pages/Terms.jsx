import { useLanguage } from "../Components/Main/Main";
import "./PageStyles.css";

const Terms = () => {
  const { getText } = useLanguage();

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">
            {getText('সেবার শর্তাবলী', 'Terms of Service')}
          </h1>
          <div className="page-divider"></div>
        </div>

        <div className="page-body">
          <section className="content-section">
            <h2 className="section-title">
              {getText('সেবা ব্যবহারের শর্তাবলী', 'Terms of Use')}
            </h2>
            <p className="section-text">
              {getText(
                'আমাদের পরিষেবা ব্যবহার করে, আপনি এই শর্তাবলী মেনে চলতে সম্মত হন। আমরা আমাদের প্ল্যাটফর্মে সঠিক এবং আপ-টু-ডেট তথ্য প্রদানের চেষ্টা করি, তবে কোনও ত্রুটি বা ভুলের জন্য আমরা দায়ী থাকব না।',
                'By using our services, you agree to abide by these terms. We strive to provide accurate and up-to-date information on our platform, but we are not liable for any errors or inaccuracies.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('ব্যবহারকারীর দায়িত্ব', 'User Responsibilities')}
            </h2>
            <p className="section-text">
              {getText(
                'ব্যবহারকারীদের আমাদের সাইটে আপত্তিকর বা বেআইনি কন্টেন্ট পোস্ট করা থেকে বিরত থাকতে হবে। আপনি দায়বদ্ধ থাকবেন আপনার অ্যাকাউন্ট এবং পাসওয়ার্ডের নিরাপত্তার জন্য।',
                'Users must refrain from posting offensive or illegal content on our site. You are responsible for maintaining the security of your account and password.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('বুদ্ধিবৃত্তিক সম্পত্তি', 'Intellectual Property')}
            </h2>
            <p className="section-text">
              {getText(
                'এই ওয়েবসাইটের সমস্ত কন্টেন্ট, ডিজাইন এবং ট্রেডমার্ক আমাদের মালিকানাধীন বা লাইসেন্সপ্রাপ্ত। অনুমতি ছাড়া কোনো কন্টেন্ট কপি বা বিতরণ করা নিষিদ্ধ।',
                'All content, design, and trademarks on this website are owned by us or licensed. Copying or distributing any content without permission is prohibited.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('সেবা পরিবর্তন', 'Service Modifications')}
            </h2>
            <p className="section-text">
              {getText(
                'আমরা যেকোনো সময় আমাদের সেবা পরিবর্তন, স্থগিত বা বন্ধ করার অধিকার সংরক্ষণ করি। এই ধরনের পরিবর্তনের জন্য আমরা পূর্ব নোটিশ দেওয়ার চেষ্টা করব।',
                'We reserve the right to modify, suspend, or discontinue our services at any time. We will try to provide advance notice of such changes.'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('দায়বদ্ধতার সীমাবদ্ধতা', 'Limitation of Liability')}
            </h2>
            <p className="section-text">
              {getText(
                'আমাদের সেবা ব্যবহারের ফলে যেকোনো প্রত্যক্ষ বা পরোক্ষ ক্ষতির জন্য আমরা দায়ী থাকব না। আমাদের সর্বোচ্চ দায়বদ্ধতা আপনার দেওয়া ফি (যদি থাকে) এর সমান।',
                'We shall not be liable for any direct or indirect damages resulting from the use of our services. Our maximum liability is limited to the fees you have paid (if any).'
              )}
            </p>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('যোগাযোগ', 'Contact')}
            </h2>
            <p className="section-text">
              {getText(
                'শর্তাবলী সংক্রান্ত কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন: ',
                'If you have any questions about these terms, contact us at: '
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

export default Terms;