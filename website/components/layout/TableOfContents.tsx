import Link from 'next/link';

import './TableOfContents.css';

export interface Heading {
  children?: Heading[];
  data: {
    id: string;
  };
  depth: number;
  value: string;
}

export interface TableOfContentsProps {
  contents: Heading[];
}

const RenderNodes = ({ nodes }: { nodes: Heading[] }) => {
  if (!nodes || nodes.length === 0) {
    return null;
  }

  return (
    <ul className="toc__options">
      {nodes.map((node) => {
        const id = node.value.toLowerCase().replace(/\s+/g, '-');
        const text = node.value;

        return (
          <li className="toc__item" key={id}>
            <Link className="toc__item-link" href={`#${id}`}>
              {text}
            </Link>

            {node.children && node.children.length > 0 && <RenderNodes nodes={node.children} />}
          </li>
        );
      })}
    </ul>
  );
};

export const TableOfContents = ({ contents }: TableOfContentsProps) => {
  const subHeadings = contents.flatMap((node) => node.children || []);

  return subHeadings.length > 0 ? (
    <aside className="toc">
      <div className="toc__content">
        <p className="toc__content-title">Contents</p>
        <nav>
          <RenderNodes nodes={subHeadings} />
        </nav>
      </div>
    </aside>
  ) : null;
};
