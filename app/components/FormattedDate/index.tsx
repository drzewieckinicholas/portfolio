type FormattedDateProps = {
  className?: string;
  date: Date;
};

export default function FormattedDate({ className, date }: FormattedDateProps) {
  return (
    <time className={className} dateTime={date.toISOString()}>
      {date.toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
        year: 'numeric',
      })}
    </time>
  );
}
