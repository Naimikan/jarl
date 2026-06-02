import { HeartIcon } from '@heroicons/react/24/solid';

import { OWNER_URL } from '../../../constants';

import styles from './index.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <p className={styles['footer-paragraph']}>
        <span className={styles['footer-text']}>
          Made with
          <HeartIcon className={styles['heart-icon']} />
          by{' '}
          <a
            className={styles['footer-owner']}
            href={OWNER_URL}
            rel="noopener,noreferrer"
            target="_blank"
          >
            Naimikan
          </a>
        </span>
      </p>
    </div>
  </footer>
);
