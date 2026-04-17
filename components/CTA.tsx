import Link from 'next/link';

const Cta = () => (
  <section className="cta-section">
    <div className="cta-badge">Start learning your way</div>
    <h2 className="text-2xl font-bold leading-snug" style={{ color: 'var(--text)' }}>
      Build Your Own AI Tutor
    </h2>
    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
      Pick a name, subject &amp; personality — then learn through voice conversations that feel
      natural.
    </p>
    <div className="w-full h-px my-1" style={{ background: 'var(--border)' }} />
    <Link href="/companions/new" className="w-full">
      <button className="btn-primary w-full justify-center text-sm">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Build a Companion
      </button>
    </Link>
  </section>
);

export default Cta;
