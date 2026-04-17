import { getCompanion } from '@/lib/actions/companion.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getSubjectColor } from '@/lib/utils';
import Image from 'next/image';
import CompanionComponent from '@/components/CompanionComponent';

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();
  const { name, subject, topic, duration } = companion;

  if (!user) redirect('/sign-in');
  if (!name) redirect('/companions');

  const color = getSubjectColor(subject);

  return (
    <main>
      <article
        className="flex rounded-2xl justify-between p-5 gap-4 max-md:flex-col"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="size-14 flex items-center justify-center rounded-xl shrink-0"
            style={{ backgroundColor: color + '22', border: `1px solid ${color}33` }}
          >
            <Image
              src={`/icons/${subject.toLowerCase()}.svg`}
              alt={subject}
              width={28}
              height={28}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg" style={{ color: 'var(--text)' }}>
                {name}
              </p>
              <div className="subject-badge">{subject}</div>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {topic}
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 text-sm max-md:hidden"
          style={{ color: 'var(--text-muted)' }}
        >
          <Image
            src="/icons/clock.svg"
            alt="duration"
            width={14}
            height={14}
            style={{ opacity: 0.5 }}
          />
          {duration} minutes
        </div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession;
