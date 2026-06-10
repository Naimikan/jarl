import { IconHeart } from '@tabler/icons-react';

import { OWNER_URL } from '@/constants';

import './Footer.css';

export const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <p className="footer-paragraph">
        <span className="footer-text">
          Made with
          <IconHeart className="heart-icon" />
          by{' '}
          <a className="footer-owner" href={OWNER_URL} rel="noopener,noreferrer" target="_blank">
            Naimikan
          </a>
        </span>
      </p>
    </div>
  </footer>
);
