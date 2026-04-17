import Link from 'next/link';
import NavItems from '@/components/NavItems';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => (
  <nav className="navbar">
    <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
      <div
        className="size-8 rounded-lg flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}
      >
        <span className="text-white font-bold text-sm">iT</span>
      </div>
      <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text)' }}>
        iTeach
      </span>
    </Link>

    <div className="flex items-center gap-6">
      <NavItems />
      <SignedOut>
        <SignInButton>
          <button className="btn-signin">Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </nav>
);

export default Navbar;
