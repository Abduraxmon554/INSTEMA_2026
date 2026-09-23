import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Tilt from "../effects/Tilt";
import Reveal from "./Reveal";
import "./Gallery.css";

function VideoCard({ video, playLabelPrefix, audioNote }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Tilt max={5} glare={false} scale={1.01}>
    <figure className="video-card">
      {playing ? (
        <video
          className="video-card-media"
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <button
          className="video-card-media video-card-trigger"
          onClick={() => setPlaying(true)}
          aria-label={`${playLabelPrefix}${video.caption}`}
        >
          <img src={video.poster} alt="" loading="lazy" />
          <span className="video-card-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
      <figcaption>
        {video.caption}
        <span className="video-card-audio-note">{audioNote}</span>
      </figcaption>
    </figure>
    </Tilt>
  );
}

export default function Gallery() {
  const { t } = useLanguage();
  const { gallery } = t;
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setLightbox(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <section id="amaliyot" className="section gallery-section">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">{gallery.kicker}</span>
          <h2 className="section-title">{gallery.title}</h2>
          <p className="section-lede">{gallery.lede}</p>
        </div>

        <div className="video-grid">
          {gallery.videos.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              playLabelPrefix={gallery.playLabelPrefix}
              audioNote={gallery.audioNote}
            />
          ))}
        </div>

        <div className="photo-grid">
          {gallery.photos.map((p) => (
            <button
              key={p.id}
              className="photo-tile"
              onClick={() => setLightbox(p)}
              aria-label={`${gallery.zoomLabelPrefix}${p.caption}`}
            >
              <Reveal variant="mask" as="span" className="photo-tile-mask">
                <img src={p.src} alt={p.caption} loading="lazy" />
              </Reveal>
              <span className="photo-tile-caption">{p.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label={gallery.closeLabel}
          >
            ✕
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} />
            <figcaption>{lightbox.caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
