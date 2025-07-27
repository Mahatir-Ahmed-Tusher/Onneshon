import PropTypes from "prop-types";
import "./MainData.css";
import { useLanguage } from "../Main/Main";

const MainData = ({ sendDataParam }) => {
  MainData.propTypes = {
    sendDataParam: PropTypes.any.isRequired, // or specify the correct prop type
  };

  const { getText } = useLanguage();
  const { knowledge_panel } = sendDataParam;

  return (
    <>
      <h3 className="Heading">
        {knowledge_panel
          ? getText(`${knowledge_panel?.name} এর জন্য ওয়েব ঘেঁটে যা পাওয়া গেলো`, `Web Search for ${knowledge_panel?.name}`)
          : getText("ওয়েব অনুসন্ধান", "Web Search")}
      </h3>
      <div className="MainData">
        <div className=" Basic-info">
          <p>
            {knowledge_panel?.description?.site}
            {"  "}
            <a
              href={knowledge_panel?.description?.url}
              target="_blank"
              rel="noreferrer"
              title="Open in new tab"
            >
              {knowledge_panel?.description?.url}
            </a>
          </p>

          <figure>
            <img
              src={knowledge_panel?.image?.url}
              alt={knowledge_panel?.name}
              width="100px"
            />
          </figure>
        </div>

        <div className="description-info">
          <div className="knowledge_panel-title">
            {" "}
            {knowledge_panel ? (
              <>
                <strong>{getText('শিরোনাম :-', 'Title :-')}</strong>
                {knowledge_panel?.name
                  ? knowledge_panel?.name
                  : getText("এ অংশে কোনো অনুসন্ধান ফলাফল নেই, নীচের আরও ফলাফল অংশটি দেখুন ", "No results found")}

                <div className="knowledge_panel-label">
                  {" "}
                  <strong>{getText('লেবেল :- ', 'Label :- ')}</strong>
                  {knowledge_panel?.label
                    ? knowledge_panel?.label
                    : getText("এ অংশে কোনো অনুসন্ধান ফলাফল নেই, নীচের আরও ফলাফল অংশটি দেখুন ", "No results found")}
                </div>
              </>
            ) : (
              <>{getText(" এ অংশে কোনো অনুসন্ধান ফলাফল নেই, নীচের আরও ফলাফল অংশটি দেখুন ", " No Search Results ")}</>
            )}
          </div>

          <p className="knowledge_panel-description">
            {knowledge_panel ? (
              <>
                <strong>{getText('বিবরণ :-', 'Description :-')}</strong>
                {knowledge_panel?.description
                  ? knowledge_panel?.description?.text
                  : getText("এ অংশে কোনো অনুসন্ধান ফলাফল নেই, নীচের আরও ফলাফল অংশটি দেখুন ", "No results found")}
              </>
            ) : (
              <>{""}</>
            )}
          </p>
        </div>

        <div className="knowledge_panel-Extra-info">
          <ul>
            {knowledge_panel?.info.map((item, index) => {
              return (
                <li key={index}>
                  {item?.title} :-{" "}
                  {item?.labels?.map((label, index) => (
                    <span
                      key={index}
                      className="knowledge_panel-label-extra-info"
                    >
                      {" "}
                      {label} ,
                    </span>
                  ))}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MainData;
