import nextra from 'nextra';

const withNextra = nextra({});

export default withNextra({
  theme: 'nextra-theme-docs',
  output: 'export', // Necesario para GitHub Pages (Static Site Generation)
  basePath: process.env.NODE_ENV === 'production' ? '/jarl' : '',
  images: {
    unoptimized: true, // GitHub Pages no soporta optimización de imágenes dinámica
  },
});
