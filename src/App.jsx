import { useState } from 'react';
import './index.css';
import './App.css';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import Work from './components/Work/Work';
import ColorLab from './components/ColorLab/ColorLab';
import Software from './components/Software/Software';
import About from './components/About/About';
import Contact from './components/About/Contact';
import VideoModal from './components/Modal/VideoModal';
import CursorGlow from './components/Cursor/CursorGlow';

function App() {
  const [modalProject, setModalProject] = useState(null);

  const handleOpenShowreel = (reelData) => {
    setModalProject(reelData);
  };

  const handleSelectProject = (project) => {
    setModalProject(project);
  };

  const handleCloseModal = () => {
    setModalProject(null);
  };

  return (
    <>
      {/* Interactive Desktop Ambient Cursor Spotlight */}
      <CursorGlow />

      {/* Subtle 35mm film grain overlay */}
      <div className="film-grain" aria-hidden="true" />

      <Nav />
      <main>
        <Hero onOpenShowreel={handleOpenShowreel} />
        <Marquee />
        <Work onSelectProject={handleSelectProject} />
        <ColorLab />
        <Software />
        <About />
        <Contact />
      </main>

      {modalProject && (
        <VideoModal project={modalProject} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
