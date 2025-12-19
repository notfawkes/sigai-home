// PublicationsRibbon.jsx
import "./PublicationsRibbon.css";

const PublicationsRibbon = ({ position = "top" }) => {
  return (
    <div className={`pub-ribbon pub-ribbon--${position}`}>
      <div className="pub-ribbon__track">
        {Array.from({ length: 40 }).map((_, i) => (
          <span className="pub-ribbon__item" key={i}>
            PUBLICATIONS <span className="pub-ribbon__star">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PublicationsRibbon;
