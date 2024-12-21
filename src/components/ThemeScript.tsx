import Script from 'next/script';

export function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme') || 'cupcake';
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {
              document.documentElement.setAttribute('data-theme', 'cupcake');
            }
          })();
        `,
      }}
    />
  );
}
