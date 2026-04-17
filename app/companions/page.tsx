import { getAllCompanions } from '@/lib/actions/companion.actions';
import CompanionCard from '@/components/CompanionCard';
import { getSubjectColor } from '@/lib/utils';
import SubjectFilter from '@/components/SubjectFilter';
import SearchInput from '@/components/SearchInput';
import Link from 'next/link';

const CompanionLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic });

  return (
    <main>
      <section className="page-header">
        <div className="flex flex-col gap-1">
          <h1 style={{ color: 'var(--text)' }}>Companion Library</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {companions.length} companion{companions.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <SearchInput />
          <SubjectFilter />
          <Link href="/companions/new">
            <button className="btn-primary">
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
              New
            </button>
          </Link>
        </div>
      </section>

      {companions.length === 0 ? (
        <section className="flex flex-col items-center justify-center py-24 gap-4">
          <div
            className="size-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--text-muted)' }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <p className="font-semibold" style={{ color: 'var(--text)' }}>
            No companions found
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Try a different search or filter
          </p>
        </section>
      ) : (
        <section className="companions-grid">
          {companions.map(companion => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default CompanionLibrary;
