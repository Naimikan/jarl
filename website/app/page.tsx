'use client';

import { Anchor } from 'nextra/components';

import { Button } from '@jarl/button';

const IndexPage = () => (
  <main
    style={{
      display: 'flex',
      padding: '48px',
      width: '100dvw',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '1024px',
      }}
    >
      <h1 style={{ fontSize: 'clamp(1rem, 8vw, 3rem)' }}>
        Build faster with <span style={{ color: 'var(--jarl-colors-blue-400)' }}>Jarl</span> |
        dependency-free, headless and accessible React components
      </h1>
      <div>
        <Button
          as={Anchor}
          href="/docs/installation"
          style={{ '--jarl-button-py': '12px', '--jarl-button-px': '24px' } as React.CSSProperties}
        >
          Get Started
        </Button>
      </div>
    </div>
  </main>
);

export default IndexPage;
