import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
function App() {


  






  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';


  const {user, setUser, projects, setProjects, skills, setSkills} = useContext(DataContext);

  useEffect(() => {
    setIsLoaded(true);

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Fetch content from backend API (if available)
    const fetchData = async () => {
      try {
        const [userRes, projectsRes, skillsRes] = await Promise.all([
          fetch(`${API_BASE}/api/user`).then(r => r.ok ? r.json() : null),
          fetch(`${API_BASE}/api/projects`).then(r => r.ok ? r.json() : null),
          fetch(`${API_BASE}/api/skills`).then(r => r.ok ? r.json() : null)
        ]);

        if (userRes) setUser(userRes);
        if (projectsRes) setProjects(projectsRes);
        if (skillsRes) setSkills(skillsRes);
      } catch (e) {
        // backend not available — keep sample data
        console.warn('Could not fetch from backend:', e.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  
  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gray-50 text-gray-900'
      }`}>
      {/* Animated Background Elements */}
      <FloatingParticles isDarkMode={isDarkMode}/>
      <CursorFollower mousePosition={mousePosition} isDarkMode={isDarkMode} />

  {/* Header Section */}
  <Header name={user?.name || ''} isDarkMode={isDarkMode} activeSection={activeSection} isMenuOpen={isMenuOpen} scrollToSection={scrollToSection} toggleDarkMode={toggleDarkMode} setIsMenuOpen={setIsMenuOpen}/>

      {/* Hero Section */}
  <Hero user={user} isDarkMode={isDarkMode} isLoaded={isLoaded} scrollToSection={scrollToSection} />

      {/* About Section */}
  <About user={user} isDarkMode={isDarkMode} />
      {/* Projects Section */}
  <Projects user={user} isDarkMode={isDarkMode} projects={projects} />
      {/* Skills Section */}
   <Skills isDarkMode={isDarkMode} skills={skills} />
      {/* Contact Section */}
  <Contact user={user} isDarkMode={isDarkMode}/>
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
