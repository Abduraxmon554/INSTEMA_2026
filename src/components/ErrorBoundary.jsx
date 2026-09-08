import { Component } from "react";
import "./ErrorBoundary.css";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Ishlab chiqarishda bu yerga xatolarni kuzatish xizmatiga (Sentry va h.k.)
    // yuborish mumkin. Hozircha konsolga chiqaramiz.
    console.error("Kutilmagan xatolik:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-inner">
            <span className="error-boundary-icon" aria-hidden="true">
              ⚠️
            </span>
            <h1>Nimadir xato ketdi</h1>
            <p>Sahifani yuklashda kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko'ring.</p>
            <button className="btn btn-primary" onClick={this.handleReload}>
              Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
