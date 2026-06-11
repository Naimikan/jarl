'use client';

import { IconBrush, IconFeather, IconKeyboard } from '@tabler/icons-react';
import Link from 'next/link';

import { Button } from '@/components/wrappers/Button';

import './home.css';

export default function IndexPage() {
  return (
    <main className="home">
      <section className="intro">
        <div className="presentation">
          <p className="presentation__features">React · Headless · Zero dependency · Themeable</p>
          <h1 className="presentation__title">
            Accessible by default.
            <br />
            <span className="presentation__colored-text">Styled by CSS variables</span>
          </h1>
          <p className="presentation__description">
            A zero-dependency React library that handles the complex wireframe, keyboard navigation,
            and ARIA support. You just bring your custom properties and craft the perfect theme.
          </p>
          <div className="presentation__actions">
            <Button
              as={Link}
              color="blue"
              href="/docs/get-started/installation"
              style={
                { '--jarl-button-py': '12px', '--jarl-button-px': '24px' } as React.CSSProperties
              }
            >
              Get started
            </Button>
          </div>
        </div>
      </section>

      <hr className="home__divider" />

      <section className="features">
        <div className="features__container">
          <div className="features__feature-card">
            <IconBrush className="features__feature-card-icon" />
            <h3 className="features__feature-card-title">CSS Variables first</h3>
            <p className="features__feature-card-description">
              No complex styling runtimes or CSS-in-JS battles. Style everything instantly by
              overriding standard custom properties.
            </p>
          </div>

          <div className="features__feature-card">
            <IconKeyboard className="features__feature-card-icon" />
            <h3 className="features__feature-card-title">WAI-ARIA compliant</h3>
            <p className="features__feature-card-description">
              Focus management, screen reader support, and keyboard navigation are baked in.
              Out-of-the-box accessibility that just works.
            </p>
          </div>

          <div className="features__feature-card">
            <IconFeather className="features__feature-card-icon" />
            <h3 className="features__feature-card-title">Ultra-lightweight</h3>
            <p className="features__feature-card-description">
              Built strictly for modern React with zero third-party dependencies. Import only what
              you use and keep your bundle size clean.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
