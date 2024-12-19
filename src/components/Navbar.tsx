import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  return (
    <header className="navbar bg-accent/90 text-accent-content backdrop-blur-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-accent rounded-box w-52">
            <li>
              <details>
                <summary>Database</summary>
                <ul className="p-2 bg-accent rounded-t-none">
                  <li><Link href="/ingredients">Ingredients</Link></li>
                  <li><Link href="/categories">Categories</Link></li>
                  <li><Link href="/systems">Systems</Link></li>
                </ul>
              </details>
            </li>
            <li><Link href="/quiz">Porosity Quiz</Link></li>
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl gap-2"
        >
          <Image
            src="/logo.svg"
            alt="CurlsBot Logo"
            width={24}
            height={24}
          />
          CurlsBot
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Database</summary>
              <ul className="p-2 bg-accent rounded-t-none">
                <li><Link href="/ingredients">Ingredients</Link></li>
                <li><Link href="/categories">Categories</Link></li>
                <li><Link href="/systems">Systems</Link></li>
              </ul>
            </details>
          </li>
          <li><Link href="/quiz">Porosity Quiz</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
