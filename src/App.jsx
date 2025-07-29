import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import Chatbot from "./pages/Chatbot";
import News from "./pages/News";
import { useRef } from "react";

function App() {
  const mainRef = useRef(null);
  const currentPath = window.location.pathname;

  const handleLogoClick = () => {
    if (currentPath !== '/') {
      window.location.href = '/';
      return;
    }
    if (mainRef.current) {
      mainRef.current.resetToHome();
    }
  };

  // Route handling
  if (currentPath === '/privacy') {
    return (
      <>
        <Navbar onLogoClick={handleLogoClick} />
        <Privacy />
        <Footer />
      </>
    );
  }

  if (currentPath === '/terms') {
    return (
      <>
        <Navbar onLogoClick={handleLogoClick} />
        <Terms />
        <Footer />
      </>
    );
  }

  if (currentPath === '/contact') {
    return (
      <>
        <Navbar onLogoClick={handleLogoClick} />
        <Contact />
        <Footer />
      </>
    );
  }

  if (currentPath === '/settings') {
    return (
      <>
        <Navbar onLogoClick={handleLogoClick} />
        <Settings />
        <Footer />
      </>
    );
  }

  if (currentPath === '/chatbot') {
    return (
      <>
        <Navbar onLogoClick={handleLogoClick} />
        <Chatbot />
        <Footer />
      </>
    );
  }

  if (currentPath === '/news') {
    return (
      <>
        <Navbar onLogoClick={handleLogoClick} />
        <News />
        <Footer />
      </>
    );
  }

  // Default home page
  return (
    <>
      <Navbar onLogoClick={handleLogoClick} />
      <Main ref={mainRef} />
      <Footer />
    </>
  );
}

export default App;
