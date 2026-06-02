import { Anchor } from 'nextra/components';

import type { Heading } from 'nextra';

export interface TableOfContentsProps {
  contents: Heading[];
}

export const TableOfContents = ({ contents }: TableOfContentsProps) => {
  return (
    <aside style={{ background: 'lightblue', padding: 20 }}>
      <h3>Table of Contents</h3>
      <nav>
        <ul>
          {contents.map((heading) => (
            <li key={heading.id}>
              <Anchor href={`#${heading.id}`} key={heading.id} style={{ textDecoration: 'none' }}>
                {heading.value}
              </Anchor>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
