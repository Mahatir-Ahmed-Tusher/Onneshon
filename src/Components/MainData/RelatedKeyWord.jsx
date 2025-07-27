import PropTypes from "prop-types";
import "./RelatedKeyWord.css";
import { useLanguage } from "../Main/Main";

const RelatedKeyWord = ({ sendDataParam }) => {
  RelatedKeyWord.propTypes = {
    sendDataParam: PropTypes.any.isRequired,
  };
  
  const { getText } = useLanguage();

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "600",
          fontSize: "1.5rem",
          color: "#4c1d95",
          fontFamily: "'Hind Siliguri', sans-serif"
        }}
      >
        {sendDataParam?.related_keywords?.keywords?.length
          ? getText('সম্পর্কিত কীওয়ার্ড', 'Related Keywords')
          : ""}
      </h3>
      <div className="RelatedKeyWord-container">
        <div>
          {sendDataParam?.related_keywords?.keywords?.map((result, key) => {
            return (
              <p className="RelatedKeyWord" key={key}>
                {result?.keyword}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RelatedKeyWord;
