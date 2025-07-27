import { useState } from "react";
import "./Footer.css";
import PropTypes from "prop-types"; // Added prop-types import

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

// Added prop types validation
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Footer = () => {
  const [modalState, setModalState] = useState({
    privacy: false,
    terms: false,
    contact: false,
  });

  const openModal = (modalType) => {
    setModalState((prev) => ({ ...prev, [modalType]: true }));
  };

  const closeModal = (modalType) => {
    setModalState((prev) => ({ ...prev, [modalType]: false }));
  };

  return (
    <footer>
      <div className="footer">
        <div>
          <div className="footer-brand">
            <h3>অন্বেষণ</h3>
            <p>An Endeavour of SlotHub</p>
          </div>
          <div className="footer-links">
            <button
              onClick={() => openModal("privacy")}
              className="footer-link"
            >
              গোপনীয়তা নীতি | Privacy Policy
            </button>
            <button
              onClick={() => openModal("terms")}
              className="footer-link"
            >
              সেবার শর্তাবলী | Terms of Service
            </button>
            <button
              onClick={() => openModal("contact")}
              className="footer-link"
            >
              যোগাযোগ | Contact
            </button>
          </div>
          <p className="copyright">© 2025 অন্বেষণ - SlotHub. সকল অধিকার সংরক্ষিত।</p>
        </div>
      </div>

      <Modal
        isOpen={modalState.privacy}
        onClose={() => closeModal("privacy")}
        title="গোপনীয়তা নীতি | Privacy Policy"
      >
        <p>
          আমরা আপনার গোপনীয়তাকে মূল্য দিই। এই ওয়েবসাইট ব্যবহারকারীদের তথ্য সংগ্রহ, সংরক্ষণ এবং প্রক্রিয়াকরণের জন্য শিল্প-মানক নিরাপত্তা ব্যবস্থা ব্যবহার করে। আমরা আপনার ব্যক্তিগত তথ্য যেমন নাম, ইমেল বা অন্যান্য বিবরণ তৃতীয় পক্ষের সাথে শেয়ার করি না, যদি না আইন দ্বারা প্রয়োজন হয়। আপনার ডেটা শুধুমাত্র আমাদের পরিষেবা উন্নত করতে এবং ব্যক্তিগতকৃত অভিজ্ঞতা প্রদানের জন্য ব্যবহৃত হয়।
        </p>
        <p>
          We value your privacy. This website uses industry-standard security measures to collect, store, and process user information. We do not share your personal information, such as name, email, or other details, with third parties unless required by law. Your data is used solely to improve our services and provide a personalized experience.
        </p>
      </Modal>

      <Modal
        isOpen={modalState.terms}
        onClose={() => closeModal("terms")}
        title="সেবার শর্তাবলী | Terms of Service"
      >
        <p>
          আমাদের পরিষেবা ব্যবহার করে, আপনি এই শর্তাবলী মেনে চলতে সম্মত হন। আমরা আমাদের প্ল্যাটফর্মে সঠিক এবং আপ-টু-ডেট তথ্য প্রদানের চেষ্টা করি, তবে কোনও ত্রুটি বা ভুলের জন্য আমরা দায়ী থাকব না। ব্যবহারকারীদের আমাদের সাইটে আপত্তিকর বা বেআইনি কন্টেন্ট পোস্ট করা থেকে বিরত থাকতে হবে।
        </p>
        <p>
          By using our services, you agree to abide by these terms. We strive to provide accurate and up-to-date information on our platform, but we are not liable for any errors or inaccuracies. Users must refrain from posting offensive or illegal content on our site.
        </p>
      </Modal>

      <Modal
        isOpen={modalState.contact}
        onClose={() => closeModal("contact")}
        title="যোগাযোগ | Contact"
      >
        <p>
          আমাদের সাথে যোগাযোগ করতে নিম্নলিখিত ইমেল ঠিকানায় পৌঁছান: <a href="mailto:mahatirtusher@gmail.com">mahatirtusher@gmail.com</a>। আমরা সাধারণত ২৪-৪৮ ঘণ্টার মধ্যে সাড়া দিই। আপনার প্রশ্ন বা মতামত আমাদের জন্য মূল্যবান।
        </p>
        <p>
          Reach out to us at the following email address: <a href="mailto:mahatirtusher@gmail.com">mahatirtusher@gmail.com</a>. We typically respond within 24-48 hours. Your questions or feedback are valuable to us.
        </p>
      </Modal>
    </footer>
  );
};

export default Footer;