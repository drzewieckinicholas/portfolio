import type { ReactNode } from 'react';

type CardProps = {
  content?: ReactNode;
  footer?: ReactNode;
  heading: string;
};

export default function Card({ content, footer, heading }: CardProps) {
  return (
    <article className='grid gap-4 rounded-xl border border-neutral-700 bg-neutral-900 p-4'>
      <header>
        <h3>{heading}</h3>
      </header>
      {content && <div>{content}</div>}
      {footer && <footer>{footer}</footer>}
    </article>
  );
}
