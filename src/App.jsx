import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from './data/portfolioData';
import { AboutSection } from './sections/AboutSection';
import { AtlasSection } from './sections/AtlasSection';
import { CapabilitiesSection } from './sections/CapabilitiesSection';
import { ContactSection } from './sections/ContactSection';
import { CredentialsSection } from './sections/CredentialsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { FeaturedSection } from './sections/FeaturedSection';
import { Footer } from './sections/Footer';
import { HeroSection } from './sections/HeroSection';
import { StatsBand } from './sections/StatsBand';
import { StudioSection } from './sections/StudioSection';
import { CommandPalette } from './components/CommandPalette';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Preloader } from './components/Preloader';
import { ProjectModal } from './components/ProjectModal';
import { Toast } from './components/Toast';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sectionCommands = [
  ['About', '#about'],
  ['Capabilities', '#capabilities'],
  ['Experience', '#experience'],
  ['Featured work', '#featured'],
  ['Brand & commerce', '#studio'],
  ['Project atlas', '#atlas'],
  ['Credentials', '#credentials'],
  ['Contact', '#contact'],
];

function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const appRef = useRef(null);
  const progressBarRef = useRef(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    document.title = portfolioData.meta.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', portfolioData.meta.description);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((index) => (index + 1) % portfolioData.hero.roles.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let loaded = document.readyState === 'complete';
    let timeoutId;

    const markLoaded = () => {
      loaded = true;
    };

    window.addEventListener('load', markLoaded);

    const interval = setInterval(() => {
      setPreloadProgress((current) => {
        const ceiling = loaded ? 100 : 92;
        const increment = loaded ? Math.max((100 - current) * 0.3, 1.5) : Math.random() * 8 + 2;
        const next = Math.min(ceiling, current + increment);

        if (loaded && next >= 100) {
          clearInterval(interval);
          timeoutId = window.setTimeout(() => {
            setReady(true);
          }, 320);
        }

        return next;
      });
    }, 70);

    return () => {
      clearInterval(interval);
      window.clearTimeout(timeoutId);
      window.removeEventListener('load', markLoaded);
    };
  }, []);

  useEffect(() => {
    const shouldLockScroll = !ready || commandOpen || Boolean(selectedProject) || mobileOpen;
    document.documentElement.classList.toggle('is-locked', shouldLockScroll);
    document.body.classList.toggle('is-locked', shouldLockScroll);
  }, [ready, commandOpen, selectedProject, mobileOpen]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.min(100, Math.max(0, percent))}%`;
      }

      const goingDown = window.scrollY > lastScroll.current;
      setHeaderHidden(goingDown && window.scrollY > 140);
      lastScroll.current = window.scrollY;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const isTypingTarget = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '');
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
        return;
      }

      if (!isTypingTarget && event.key === '/') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!ready) return undefined;

    const nodes = Array.from(document.querySelectorAll('.tilt-card, .spotlight-card'));
    const cleanups = [];

    nodes.forEach((node) => {
      const handleMove = (event) => {
        const rect = node.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((y / rect.height) - 0.5) * -12;
        node.style.setProperty('--rx', `${rotateX}deg`);
        node.style.setProperty('--ry', `${rotateY}deg`);
        node.style.setProperty('--sx', `${(x / rect.width) * 100}%`);
        node.style.setProperty('--sy', `${(y / rect.height) * 100}%`);
      };

      const reset = () => {
        node.style.setProperty('--rx', '0deg');
        node.style.setProperty('--ry', '0deg');
        node.style.setProperty('--sx', '50%');
        node.style.setProperty('--sy', '50%');
      };

      node.addEventListener('mousemove', handleMove);
      node.addEventListener('mouseleave', reset);
      cleanups.push(() => {
        node.removeEventListener('mousemove', handleMove);
        node.removeEventListener('mouseleave', reset);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [ready]);

  useGSAP(
    () => {
      if (!ready) return undefined;

      gsap.set('.reveal', { opacity: 0, y: 46 });

      ScrollTrigger.batch('.reveal', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.08,
          });
        },
      });

      gsap.from('.hero__title-word', {
        yPercent: 112,
        duration: 1.2,
        stagger: 0.055,
        ease: 'power4.out',
        delay: 0.05,
      });

      gsap.from('.hero__summary, .hero__meta, .hero__actions, .hero__links, .hero__hint', {
        opacity: 0,
        y: 28,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.35,
      });

      gsap.from('.hero__visual-shell', {
        opacity: 0,
        y: 50,
        scale: 0.94,
        duration: 1.15,
        ease: 'power3.out',
        delay: 0.25,
      });

      gsap.utils.toArray('.studio-card__media img, .studio-card__media video').forEach((image) => {
        gsap.to(image, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            scrub: 1,
            start: 'top bottom',
            end: 'bottom top',
          },
        });
      });

      gsap.to('.hero__orb-label', {
        y: 'random(-10, 10)',
        x: 'random(-8, 8)',
        repeat: -1,
        yoyo: true,
        duration: 'random(2.4, 4.2)',
        ease: 'sine.inOut',
        stagger: 0.08,
      });

      gsap.to('.noise-layer', {
        opacity: 0.16,
        repeat: -1,
        yoyo: true,
        duration: 4.5,
        ease: 'sine.inOut',
      });

      ScrollTrigger.refresh();
      return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    },
    { scope: appRef, dependencies: [ready] },
  );

  const commands = useMemo(() => {
    const sectionItems = sectionCommands.map(([label, hash]) => ({
      group: 'Sections',
      label,
      meta: hash,
      keywords: label,
      action: () => scrollToHash(hash),
    }));

    const contactItems = [
      {
        group: 'Contact',
        label: 'Email Muhammad Malik',
        meta: portfolioData.contact.email,
        action: () => {
          window.location.href = `mailto:${portfolioData.contact.email}`;
        },
      },
      {
        group: 'Contact',
        label: 'Open GitHub profile',
        meta: 'External link',
        action: () => window.open(portfolioData.contact.github, '_blank', 'noopener,noreferrer'),
      },
      {
        group: 'Contact',
        label: 'Open LinkedIn profile',
        meta: 'External link',
        action: () => window.open(portfolioData.contact.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        group: 'Contact',
        label: 'Download CV',
        meta: 'PDF',
        action: () => window.open(portfolioData.contact.cv, '_blank', 'noopener,noreferrer'),
      },
    ];

    const featuredItems = portfolioData.featured.map((item) => ({
      group: 'Featured work',
      label: item.title,
      meta: item.eyebrow,
      keywords: `${item.title} ${item.stack.join(' ')}`,
      action: () => {
        scrollToHash('#featured');
        if (item.cta?.href) {
          window.setTimeout(() => window.open(item.cta.href, '_blank', 'noopener,noreferrer'), 450);
        }
      },
    }));

    const projectItems = portfolioData.projects.slice(0, 10).map((project) => ({
      group: 'Project atlas',
      label: project.title,
      meta: project.category,
      keywords: `${project.summary} ${(project.stack || []).join(' ')}`,
      action: () => {
        setActiveFilter('all');
        setSearch(project.title);
        scrollToHash('#atlas');
        window.setTimeout(() => setSelectedProject(project), 350);
      },
    }));

    return [...sectionItems, ...contactItems, ...featuredItems, ...projectItems];
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.contact.email);
      setToastMessage('Email copied to clipboard');
      setToastVisible(true);
    } catch {
      setToastMessage('Unable to copy automatically — email shown on screen');
      setToastVisible(true);
    }
  };

  useEffect(() => {
    if (!toastVisible) return undefined;
    const timeout = window.setTimeout(() => setToastVisible(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [toastVisible]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressBarRef} />
      </div>
      <div className="noise-layer" aria-hidden="true" />
      <CustomCursor />
      <Preloader progress={preloadProgress} done={ready} />
      <Header
        hidden={headerHidden}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onOpenPalette={() => setCommandOpen(true)}
      />

      <div ref={appRef}>
        <main>
          <HeroSection
            hero={portfolioData.hero}
            rotatingRole={portfolioData.hero.roles[roleIndex]}
            metrics={portfolioData.metrics}
            onOpenPalette={() => setCommandOpen(true)}
          />
          <StatsBand metrics={portfolioData.metrics} />
          <AboutSection about={portfolioData.about} />
          <CapabilitiesSection capabilities={portfolioData.capabilities} />
          <ExperienceSection experience={portfolioData.experience} />
          <FeaturedSection featured={portfolioData.featured} />
          <StudioSection studio={portfolioData.studio} />
          <AtlasSection
            projects={portfolioData.projects}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            search={search}
            setSearch={setSearch}
            onOpenProject={setSelectedProject}
          />
          <CredentialsSection credentials={portfolioData.credentials} />
          <ContactSection contact={portfolioData.contact} onCopyEmail={copyEmail} />
        </main>
        <Footer />
      </div>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} commands={commands} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <Toast visible={toastVisible} message={toastMessage} />
    </>
  );
}
