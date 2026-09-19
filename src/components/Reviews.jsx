import { useEffect, useRef, useState } from "react";
import Tilt from "../effects/Tilt";
import TextReveal from "../effects/TextReveal";
import "./Reviews.css";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");
const MIN_SUBMIT_SECONDS = 3; // 3 soniyadan tez yuborilgan forma bot deb hisoblanadi

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    hpFax: "", // honeypot — nomi atayin noodatiy, brauzer avto-to'ldirishidan qochish uchun
  });
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const mountedAt = useRef(null);
  if (mountedAt.current === null) mountedAt.current = Date.now();

  const fetchReviews = () => {
    setLoading(true);
    setLoadError(null);
    fetch(`${API_BASE_URL}/reviews`)
      .then((res) => {
        if (!res.ok) throw new Error("Sharhlarni yuklab bo'lmadi.");
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sharhlarni yuklashda xato:", error);
        setLoadError("Sharhlarni yuklab bo'lmadi. Sahifani qayta yuklab ko'ring.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!newReview.comment.trim()) {
      setSubmitError("Iltimos, sharh yozing!");
      return;
    }

    // Spam himoyasi: honeypot maydoni to'ldirilgan bo'lsa yoki forma juda
    // tez yuborilgan bo'lsa (bot xatti-harakati), jimgina to'xtatiladi.
    if (newReview.hpFax) {
      setNewReview({ rating: 5, comment: "", hpFax: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      return;
    }
    const elapsedSeconds = (Date.now() - mountedAt.current) / 1000;
    if (elapsedSeconds < MIN_SUBMIT_SECONDS) {
      setSubmitError("Iltimos, formani qayta tekshirib yuboring.");
      return;
    }

    const review = {
      rating: parseInt(newReview.rating, 10) || 5,
      comment: newReview.comment.trim(),
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);
    fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Sharh yuborishda xatolik yuz berdi.");
        return res.json();
      })
      .then((data) => {
        setReviews((prev) => [data, ...prev]);
        setNewReview({ rating: 5, comment: "", hpFax: "" });
        setSubmitted(true);
        setSubmitting(false);
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch((error) => {
        console.error("Sharh yuborishda xato:", error);
        setSubmitError("Sharh yuborishda xatolik yuz berdi. Qayta urinib ko'ring.");
        setSubmitting(false);
      });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : "0.0";

  if (loading) return <div className="reviews-loading">Sharhlar yuklanmoqda...</div>;
  if (loadError) return <div className="reviews-loading">{loadError}</div>;

  return (
    <section className="reviews">
      <div className="reviews-container">
        <h2 className="reviews-title">
          <TextReveal as="span" text="⭐ Ishtirokchilar Sharhları" variant="kinetic" />
        </h2>

        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="average-rating">
            <span className="average-number">{averageRating}</span>
            <div className="stars">{renderStars(Math.round(averageRating))}</div>
            <p className="rating-count">({reviews.length} sharh)</p>
          </div>
        </div>

        {/* Submit Review Form */}
        <div className="review-form-wrapper">
          <h3>Siz ham sharh qoldiring</h3>
          <form onSubmit={handleSubmitReview} className="review-form" noValidate>
            <input
              type="text"
              name="hp_fax_confirm"
              value={newReview.hpFax}
              onChange={(e) => setNewReview({ ...newReview, hpFax: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            />
            <div className="form-group">
              <label htmlFor="rating">Baholash:</label>
              <select
                id="rating"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: e.target.value })
                }
              >
                <option value="5">⭐⭐⭐⭐⭐ Ajoyib (5)</option>
                <option value="4">⭐⭐⭐⭐ Juda yaxshi (4)</option>
                <option value="3">⭐⭐⭐ Yaxshi (3)</option>
                <option value="2">⭐⭐ Qandaydur (2)</option>
                <option value="1">⭐ Yomon (1)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Sharh yozing:</label>
              <textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                placeholder="Master-class haqida fikringizni baham ko'ring..."
                rows="4"
              />
            </div>

            {submitError && <p className="field-error">{submitError}</p>}

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? "Yuborilmoqda..." : "Sharh yuborish ➤"}
            </button>
          </form>

          {submitted && (
            <div className="success-message">✓ Sharh muvaffaqiyatli yuborildi!</div>
          )}
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">Hali sharh yo'q. Birinchi bo'ling! 😊</p>
          ) : (
            reviews.map((review) => (
              <Tilt key={review.id} max={5} glare={false} scale={1.015}>
                <div className="review-card">
                  <div className="review-header">
                    <div className="stars">{renderStars(review.rating)}</div>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString("uz-UZ")}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              </Tilt>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
