import { CalendarBlank } from '@phosphor-icons/react';

import { FormattedDate, Image } from '~/components';

type HeaderProps = {
  date?: Date;
  heading: string;
  imageAlt?: string;
  imageUrl?: string;
};

export default function Header({
  date,
  heading,
  imageAlt,
  imageUrl,
}: HeaderProps) {
  return (
    <header className='flex min-h-[30vb] flex-col items-center justify-center gap-4 text-center'>
      {imageUrl && (
        <Image
          alt={imageAlt || `Featured photograph for ${heading}`}
          className='h-32 w-32 rounded-full object-cover'
          height={128}
          src={imageUrl}
          width={128}
        />
      )}
      <h1 className='leading-normal'>{heading}</h1>
      {date && (
        <span className='flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 p-4 text-neutral-400'>
          <CalendarBlank aria-hidden={true} />
          <FormattedDate date={date} />
        </span>
      )}
    </header>
  );
}
