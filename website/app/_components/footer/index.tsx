import { HeartIcon } from '@heroicons/react/24/solid';
import { Footer as NextraFooter } from 'nextra-theme-docs';

import { OWNER_URL } from '../../constants';

import styles from './index.module.scss';

export const Footer = () => (
  <NextraFooter
    className={`${styles.footer} x:w-full x:flex x:items-center x:justify-start x:text-center`}
  >
    <p className={`${styles['footer-paragraph']} x:m-0`}>
      <span className={`${styles['footer-text']} x:inline-flex x:items-center`}>
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
  </NextraFooter>
);
