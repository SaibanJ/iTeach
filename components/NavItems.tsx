'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
];

const NavItems = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden sm:flex items-center gap-1">
        {navItems.map(({ label, href }) => (
          <Link
            href={href}
            key={label}
            className={cn('nav-link px-3 py-1.5 rounded-md', pathname === href && 'active')}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 rounded-lg transition-colors"
        style={{ color: 'rgba(255,255,255,0.7)' }}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span
          className="block h-0.5 w-5 rounded-full transition-all duration-300 origin-center"
          style={{
            background: 'currentColor',
            transform: open ? 'translateY(8px) rotate(45deg)' : undefined,
          }}
        />
        <span
          className="block h-0.5 w-5 rounded-full transition-all duration-300"
          style={{
            background: 'currentColor',
            opacity: open ? 0 : 1,
            transform: open ? 'scaleX(0)' : undefined,
          }}
        />
        <span
          className="block h-0.5 w-5 rounded-full transition-all duration-300 origin-center"
          style={{
            background: 'currentColor',
            transform: open ? 'translateY(-8px) rotate(-45deg)' : undefined,
          }}
        />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div
          className="sm:hidden fixed inset-0 top-[60px] z-[49] flex flex-col"
          style={{ background: '#000000' }}
        >
          <nav className="flex flex-col p-6 gap-2">
            {navItems.map(({ label, href }) => (
              <Link
                href={href}
                key={label}
                className={cn(
                  'text-lg font-semibold px-4 py-3 rounded-xl transition-colors',
                  pathname === href
                    ? 'text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                )}
                style={
                  pathname === href
                    ? { background: 'rgba(168,85,247,0.12)', color: '#c084fc' }
                    : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="h-px mx-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

          <div className="p-6">
            <SignedOut>
              <SignInButton>
                <button className="btn-signin w-full">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3">
                <UserButton />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Account
                </span>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
