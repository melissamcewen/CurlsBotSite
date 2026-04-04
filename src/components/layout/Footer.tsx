import Link from 'next/link';
import Script from 'next/script';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  return (
    <>
      <footer className="footer md:footer-horizontal bg-base-300 text-base-content p-2 md:p-10">
        <aside>
          <h2 className="text-xl font-bold">CurlsBot</h2>
          <p className="text-sm opacity-80">
            Your hair care ingredient analyzer since 2017
          </p>
          <div className="mt-4 grid grid-flow-col gap-4">
            <a
              href="https://www.facebook.com/curlsbotdotcom/"
              className="hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/curlsbot"
              className="hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.reddit.com/r/curlsbot/"
              className="hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z" />
              </svg>
            </a>
          </div>
        </aside>
        <NewsletterForm />
        <nav>
          <Link href="/about" className="link link-hover">
            About
          </Link>
          <Link href="/brands" className="link link-hover">
            For Brands
          </Link>
          <Link href="/contact" className="link link-hover">
            Contact
          </Link>
          <Link href="/privacy" className="link link-hover">
            Privacy
          </Link>
          <Link href="/terms" className="link link-hover">
            Terms
          </Link>
        </nav>
      </footer>

      {/* Copyright and Disclaimer */}
      <div className="bg-base-300 py-6 px-4">
        <div className="max-w-360 mx-auto space-y-4">
          <div className="text-sm text-base-content/60 text-center">
            © {new Date().getFullYear()} CurlsBot. All rights reserved.
          </div>
          <p className="text-xs text-base-content/60 text-center max-w-3xl mx-auto">
            Disclaimer: We&apos;re here to have fun and learn about haircare
            ingredients! 🧪 While our tool can provide some basic insights,
            it&apos;s not a substitute for professional advice. Always consult
            with a hair care expert for personalized recommendations, especially
            if you have specific hair concerns or allergies. This web site is
            not endorsed by, directly affiliated with, maintained, authorized,
            or sponsored by The Curly Girl Method by Lorraine Massey™️ or her{' '}
            <a href="https://amzn.to/41G4IJQ" className="link link-hover">
              Curly Girl Handbook
            </a>
            . Some links on Curlsbot are Affiliate links. Shopping through these
            links supports the further development of Curlsbot.
          </p>
        </div>
      </div>
      <Script
        type="text/javascript"
        src="https://btloader.com/tag?o=5698917485248512&upapi=true&domain=curlsbot.com"
        async
      />
      <Script
        id="adblock-recovery"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              !function(){"use strict";var e;e=document,function(){var t,n;function r(){var t=e.createElement("script");t.src="https://cafemedia-com.videoplayerhub.com/galleryplayer.js",e.head.appendChild(t)}function a(){var t=e.cookie.match("(^|[^;]+)\\s*__adblocker\\s*=\\s*([^;]+)");return t&&t.pop()}function c(){clearInterval(n)}return{init:function(){var e;"true"===(t=a())?r():(e=0,n=setInterval((function(){100!==e&&"false" !== t || c(), "true" === t && (r(), c()), t = a(), e++}), 50))}}}().init()}();
            } catch (e) {
              console.debug('Raptive Ad Block Recovery script failed', e);
            }
          `,
        }}
      />
      <Script
        src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024"
        type="text/javascript"
      />
      <Script
        src="https://assets.mailerlite.com/jsonp/1500551/forms/153675641835750754/takel"
        type="text/javascript"
      />
    </>
  );
}
