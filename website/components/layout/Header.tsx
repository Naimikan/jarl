import { IconBrandGithub } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { NavLinks } from './HeaderNavLinks';
import { ThemeSwitch } from './ThemeSwitch';

import { isProduction, REPOSITORY_URL } from '@/constants';

import './Header.css';

export const Header = () => (
  <header className="header">
    <nav className="header-navbar">
      <div className="logo-container">
        <Link className="anchor" href="/">
          <Image
            alt="logo"
            height={45}
            priority
            src={isProduction ? 'https://naimikan.github.io/jarl/jarl.png' : '/jarl.png'}
            width={45}
          />
        </Link>
      </div>

      <NavLinks />

      <a className="anchor" href={REPOSITORY_URL} rel="noreferrer" target="_blank">
        <IconBrandGithub className="github-icon" />
      </a>

      <ThemeSwitch />
    </nav>
  </header>
);
