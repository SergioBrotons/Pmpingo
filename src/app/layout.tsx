import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PMPingo — Adaptive PMP 2026 Study Engine',
  description: 'Master the PMP Exam with an adaptive 28-day Duolingo-style learning engine, situational questions, and spaced repetition.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PMPingo',
  },
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0f19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (let registration of registrations) {
                    registration.update();
                  }
                });
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js?v=2').then(
                    function(reg) {
                      reg.onupdatefound = function() {
                        var installingWorker = reg.installing;
                        installingWorker.onstatechange = function() {
                          if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                              window.location.reload();
                            }
                          }
                        };
                      };
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
