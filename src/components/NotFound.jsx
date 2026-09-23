import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./NotFound.css";

export default function NotFound() {
  const { t } = useLanguage();
  const { notFound } = t;

  return (
    <div className="not-found">
      <div className="not-found-inner">
        <span className="not-found-code">404</span>
        <h1>{notFound.title}</h1>
        <p>{notFound.text}</p>
        <Link to="/" className="btn btn-primary">
          {notFound.cta}
        </Link>
      </div>
    </div>
  );
}
