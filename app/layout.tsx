import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Manzi Delphin | Software Engineer',
  description: 'Portfolio of Manzi Delphin, a full-stack developer and final-semester Software Engineering student in Kigali, Rwanda.',
  openGraph: { title: 'Manzi Delphin | Software Engineer', description: 'Full-stack development, enterprise systems, and practical software projects.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
