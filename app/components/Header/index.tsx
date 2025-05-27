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
    <header className='grid min-h-[30vb] place-content-center gap-4 text-center'>
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
      {date && <FormattedDate className='text-neutral-400' date={date} />}
    </header>
  );
}
