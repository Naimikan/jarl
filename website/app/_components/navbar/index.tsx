import { Navbar as NextraNavbar } from 'nextra-theme-docs';

import { REPOSITORY_URL } from '../../constants';

export const Navbar = () => {
  return <NextraNavbar logo={<span>Jarl</span>} projectLink={REPOSITORY_URL} />;
};
