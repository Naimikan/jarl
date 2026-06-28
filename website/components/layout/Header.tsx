import { IconBrandGithub } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

// import { Logo } from '@/components/ui/Logo';
import { isProduction, REPOSITORY_URL } from '@/constants';
import { NavLinks } from './HeaderNavLinks';
import { ThemeSwitch } from './ThemeSwitch';

import './Header.css';

export const Header = () => (
  <header className="header">
    <nav className="header-navbar">
      <div className="logo-container">
        <Link aria-label="Back to homepage" className="anchor" href="/">
          {/* <Logo /> */}
          <Image
            alt="logo"
            height={50}
            priority
            src={isProduction ? 'https://naimikan.github.io/jarl/jarl.png' : '/jarl.png'}
            width={50}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Jarl</span>
            <small>Just another React library</small>
          </div>
        </Link>
      </div>

      <NavLinks />

      <ThemeSwitch />

      <a
        aria-label="Github link"
        className="anchor"
        href={REPOSITORY_URL}
        rel="noreferrer"
        target="_blank"
      >
        <IconBrandGithub className="github-icon" />
      </a>
    </nav>
  </header>
);
