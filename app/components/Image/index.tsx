import type { ComponentProps } from 'react';

type ImageProps = {
  alt: string;
  height: number;
  src: string;
  width: number;
} & Omit<ComponentProps<'img'>, 'alt' | 'height' | 'src' | 'width'>;

export default function Image({
  alt,
  height,
  src,
  width,
  ...props
}: ImageProps) {
  return (
    <img
      alt={alt}
      decoding='async'
      height={height}
      loading='lazy'
      src={src}
      width={width}
      {...props}
    />
  );
}
