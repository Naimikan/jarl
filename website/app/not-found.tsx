import Link from 'next/link';

const NotFound = () => {
  return (
    <div
      style={{
        padding: '4rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/" style={{ textDecoration: 'underline' }}>
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
