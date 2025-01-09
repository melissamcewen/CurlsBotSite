export async function GET() {
  return new Response(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Clearing Cache...</title>
        <script>
          // Unregister service workers
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
              for(let registration of registrations) {
                registration.unregister();
              }
            });
          }

          // Clear caches
          if ('caches' in window) {
            caches.keys().then(function(names) {
              for (let name of names) {
                caches.delete(name);
              }
            });
          }

          // Clear local storage
          localStorage.clear();

          // Clear session storage
          sessionStorage.clear();

          // Redirect to home page after a brief delay
          setTimeout(() => {
            window.location.href = '/?nocache=' + new Date().getTime();
          }, 1000);
        </script>
      </head>
      <body>
        <h1>Clearing cache and redirecting...</h1>
      </body>
    </html>
    `,
    {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    },
  );
}
