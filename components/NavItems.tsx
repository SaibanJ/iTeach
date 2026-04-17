'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
];

const NavItems = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1">
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
  );
};

export default NavItems;
