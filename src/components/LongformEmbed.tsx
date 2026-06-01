'use client';

type LongformEmbedProps = {
  src?: string;
  srcDoc?: string;
  title: string;
};

export default function LongformEmbed({ src, srcDoc, title }: LongformEmbedProps) {
  return (
    <iframe
      src={srcDoc ? undefined : src}
      srcDoc={srcDoc}
      title={title}
      className="w-full border-0 block"
      style={{ height: '100vh' }}
    />
  );
}
