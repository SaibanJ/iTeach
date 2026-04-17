import React from 'react';
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import Link from 'next/link';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      {/* Hero */}
      <section className="flex flex-col gap-3 pt-4">
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold rounded-full px-3 py-1 w-fit"
          style={{
            background: 'rgba(139,92,246,0.1)',
            color: 'var(--primary)',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          <span
            className="size-1.5 rounded-full animate-pulse"
            style={{ background: 'var(--primary)' }}
          />
          AI-Powered Learning
        </div>
        <h1 className="text-4xl font-bold max-sm:text-3xl" style={{ color: 'var(--text)' }}>
          Learn anything with your <span className="text-gradient">AI tutor</span>
        </h1>
        <p className="text-base max-w-lg" style={{ color: 'var(--text-secondary)' }}>
          Voice-powered study sessions tailored to you. Pick a companion, start talking, and
          actually understand what you&#39;re learning.
        </p>
        <div className="flex gap-3 mt-2">
          <Link href="/companions/new">
            <button className="btn-primary">Build a Companion</button>
          </Link>
          <Link href="/companions">
            <button className="btn-ghost">Browse Library</button>
          </Link>
        </div>
      </section>

      {/* Popular Companions */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            Popular Companions
          </h2>
          <Link
            href="/companions"
            className="text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            View all →
          </Link>
        </div>
        <div className="companions-grid">
          {companions.map(companion => (
            <CompanionCard
              color={getSubjectColor(companion.subject)}
              key={companion.id}
              {...companion}
            />
          ))}
        </div>
      </section>

      {/* Recent Sessions + CTA */}
      <section className="home-section">
        <CompanionsList
          title="Recent Sessions"
          companions={recentSessionsCompanions}
          classNames="flex-1"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
