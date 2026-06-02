'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@jarl/button';
import { cx } from '@jarl/utils';

import styles from './index.module.scss';

export const ThemeSwitch = () => {
  const [themeSelected, setThemeSelected] = useState<'light' | 'dark' | undefined>(undefined);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const theme = document.documentElement.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
      setThemeSelected(storedTheme);
    } else {
      const isDark = theme === 'dark' || (!theme && prefersDark);

      window.localStorage.setItem('theme', isDark ? 'dark' : 'light');

      setThemeSelected(isDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newValue = themeSelected === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newValue);
    window.localStorage.setItem('theme', newValue);

    setThemeSelected(newValue);
  }, [themeSelected]);

  return (
    <Button
      className={cx(styles.themeSwitch, { [styles.loading]: !themeSelected })}
      disabled={!themeSelected}
      onClick={toggleTheme}
      type="button"
    >
      {themeSelected === 'dark' && <SunIcon className={styles.switchIcon} color="currentColor" />}
      {themeSelected === 'light' && <MoonIcon className={styles.switchIcon} color="currentColor" />}
    </Button>
  );
};
