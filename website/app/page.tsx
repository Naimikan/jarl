import { Button } from '@jarl/button';

const IndexPage = () => (
  <main
    style={{
      height: 'calc(100dvh - 64px - 43px - 44px)',
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
      <h1 style={{ fontSize: '48px' }}>
        Build faster with <span style={{ color: 'var(--jarl-colors-blue-400)' }}>Jarl</span> |
        dependency-free, headless and accessible React components
      </h1>
      <div>
        <Button
          as="a"
          href="/jarl/docs/installation"
          style={{ '--jarl-button-py': '12px', '--jarl-button-px': '24px' } as React.CSSProperties}
        >
          Get Started
        </Button>
      </div>
    </div>
  </main>
);

export default IndexPage;
