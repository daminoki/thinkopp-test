import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/assets/styles/globals.scss';
import '@/assets/styles/reset.scss';
import '@/assets/styles/variables.scss';

const helveticaSans = localFont({
  src: './fonts/HelveticaRegular.woff2',
  variable: '--font-helvetica-sans',
  weight: '400',
});

const helveticaNeueSans = localFont({
  src: './fonts/HelveticaNeueRegular.woff2',
  variable: '--font-helvetica-neue-sans',
  weight: '400',
});

const interTightSans = localFont({
  src: './fonts/InterTightVariable.woff2',
  variable: '--font-inter-tight-sans',
  weight: '600',
});

export const metadata: Metadata = {
  title: 'Thinkopp Test',
  description: 'Test task for Thinkopp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaSans.variable} ${helveticaNeueSans.variable} ${interTightSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
