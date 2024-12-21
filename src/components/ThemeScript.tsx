import Script from 'next/script';

export function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          try {
            let theme = localStorage.getItem('theme');
            if (!theme) {
              theme = 'cupcake';
              localStorage.setItem('theme', theme);
            }
            document.documentElement.setAttribute('data-theme', theme);
          } catch (e) {
            document.documentElement.setAttribute('data-theme', 'cupcake');
          }
        `,
      }}
    />
  );
}
