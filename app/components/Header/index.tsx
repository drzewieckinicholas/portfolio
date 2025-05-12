type HeaderProps = {
  heading: string;
};

export default function Header({ heading }: HeaderProps) {
  return (
    <header className='grid min-h-[30vb] place-content-center'>
      <h1 className='text-center leading-normal'>{heading}</h1>
    </header>
  );
}
