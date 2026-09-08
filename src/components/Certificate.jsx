import { useEffect, useState } from "react";
import "./Certificate.css";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");

// Sertifikat maydonlari foydalanuvchi/admin tomonidan kiritilgan matn bo'lishi
// mumkin (masalan, ism yoki mutaxassislik) — chop etish oynasiga HTML sifatida
// qo'yishdan oldin har doim escape qilinadi (XSS'dan himoya).
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

export default function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/certificates`)
      .then((res) => {
        if (!res.ok) throw new Error("Sertifikatlarni yuklab bo'lmadi.");
        return res.json();
      })
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sertifikatlarni yuklashda xato:", err);
        setError("Sertifikatlarni yuklab bo'lmadi. Sahifani qayta yuklab ko'ring.");
        setLoading(false);
      });
  }, []);

  const handleDownloadPDF = (certificate) => {
    setDownloadError("");
    const safe = {
      fullName: escapeHtml(certificate.fullName),
      profession: escapeHtml(certificate.profession),
      eventTitle: escapeHtml(certificate.eventTitle),
      speaker: escapeHtml(certificate.speaker),
      hoursAttended: escapeHtml(certificate.hoursAttended),
      id: escapeHtml(certificate.id),
      issueDate: (() => {
        try {
          return new Date(certificate.issueDate).toLocaleDateString("uz-UZ");
        } catch {
          return escapeHtml(certificate.issueDate);
        }
      })(),
    };
    const certHTML = `
      <!DOCTYPE html>
      <html lang="uz">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sertifikat - ${safe.fullName}</title>
        <style>
          @media print {
            body { margin: 0; padding: 0; }
          }
          body {
            font-family: 'Georgia', serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f0f0f0;
            padding: 20px;
          }
          .certificate {
            width: 900px;
            height: 600px;
            background: linear-gradient(135deg, #fff9e6 0%, #ffe6cc 100%);
            padding: 60px;
            border: 3px solid #d4af37;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
            text-align: center;
          }
          .certificate::before {
            content: '🏆';
            position: absolute;
            top: 20px;
            font-size: 50px;
            opacity: 0.1;
          }
          .certificate h1 {
            color: #d4af37;
            font-size: 2.5em;
            margin: 0 0 20px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .certificate p {
            margin: 10px 0;
            font-size: 1.1em;
            color: #333;
          }
          .recipient {
            font-size: 1.8em;
            font-weight: bold;
            color: #d4af37;
            margin: 30px 0;
            text-decoration: underline;
          }
          .details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin: 30px 0;
            font-size: 0.95em;
            color: #555;
          }
          .detail-item {
            border-top: 1px solid #d4af37;
            padding-top: 10px;
          }
          .detail-label {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
          }
          .signature-line {
            border-top: 2px solid #333;
            display: inline-block;
            width: 200px;
            margin-top: 40px;
          }
          .footer {
            font-size: 0.9em;
            color: #666;
            margin-top: 20px;
          }
          @media print {
            body { padding: 0; }
            .certificate { box-shadow: none; margin: 0; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <h1>Sertifikat</h1>
          <p style="font-size: 1.3em; font-weight: bold; color: #333;">Sharaf bilan bermoqda</p>

          <div class="recipient">${safe.fullName}</div>

          <p style="font-size: 1.1em; color: #333;">
            <strong>${safe.profession}</strong> kasbiga ega bo'lganingiz uchun
          </p>

          <p style="margin: 20px 0; font-size: 1em; color: #555;">
            quyidagi xalqaro master-classga ishtirok etganingizni tasdiqlaydi:
          </p>

          <p style="font-size: 1.2em; font-weight: bold; color: #d4af37; margin: 20px 0;">
            ${safe.eventTitle}
          </p>

          <div class="details">
            <div class="detail-item">
              <div class="detail-label">O'qituvchi:</div>
              <div>${safe.speaker}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Davomiyligi:</div>
              <div>${safe.hoursAttended} soat</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Sertifikat raqami:</div>
              <div>${safe.id}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Berilgan sana:</div>
              <div>${safe.issueDate}</div>
            </div>
          </div>

          <div class="signature-line"></div>
          <p style="margin-top: 10px; color: #666;">Raisning imzosi</p>

          <div class="footer">
            <p>Bu sertifikat master-classga to'liq ishtirok etganligini tasdiqlaydi</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "", "width=900,height=600");
    if (!printWindow) {
      setDownloadError(
        "Sertifikat oynasini ochib bo'lmadi. Brauzeringizda pop-up bloklanmaganini tekshiring."
      );
      return;
    }
    printWindow.document.write(certHTML);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) return <div className="cert-loading">Sertifikatlar yuklanmoqda...</div>;
  if (error) return <div className="cert-loading">{error}</div>;

  return (
    <section className="certificate-section">
      <div className="certificate-container">
        <h2 className="certificate-title">🎓 Sertifikatlar</h2>
        {downloadError && <p className="cert-loading">{downloadError}</p>}

        {certificates.length === 0 ? (
          <div className="no-certificates">
            <p>Sertifikat topilmadi.</p>
            <p>Master-classga ishtirok etgandan keyin sertifikat olib olishingiz mumkin!</p>
          </div>
        ) : (
          <div className="certificates-grid">
            {certificates.map((cert) => (
              <div key={cert.id} className="certificate-card">
                <div className="cert-badge">🏆</div>
                <h3 className="cert-name">{cert.fullName}</h3>
                <p className="cert-profession">{cert.profession}</p>

                <div className="cert-info">
                  <p>
                    <strong>O'qituvchi:</strong> <br />
                    {cert.speaker}
                  </p>
                  <p>
                    <strong>Davomiyligi:</strong> <br />
                    {cert.hoursAttended} soat
                  </p>
                  <p>
                    <strong>Sana:</strong> <br />
                    {new Date(cert.issueDate).toLocaleDateString("uz-UZ")}
                  </p>
                </div>

                <button
                  className="download-btn"
                  onClick={() => handleDownloadPDF(cert)}
                >
                  📄 PDF Yuklab olish
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
