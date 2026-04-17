import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserCompanions, getUserSessions } from '@/lib/actions/companion.actions';
import Image from 'next/image';
import CompanionsList from '@/components/CompanionsList';

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);

  return (
    <main className="min-lg:3/4">
      <section className="flex justify-between gap-6 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={72}
            height={72}
            className="rounded-2xl"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="stat-card">
            <div className="flex gap-2 items-center">
              <div
                className="size-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.15)' }}
              >
                <Image src="/icons/check.svg" alt="checkmark" width={16} height={16} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                {sessionHistory.length}
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Lessons Completed
            </p>
          </div>
          <div className="stat-card">
            <div className="flex gap-2 items-center">
              <div
                className="size-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(34,211,238,0.12)' }}
              >
                <Image src="/icons/cap.svg" alt="cap" width={16} height={16} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                {companions.length}
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Companions Created
            </p>
          </div>
        </div>
      </section>

      <Accordion type="multiple" className="flex flex-col gap-3">
        <AccordionItem
          value="recent"
          className="rounded-2xl px-5"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <AccordionTrigger
            className="text-base font-semibold hover:no-underline py-4"
            style={{ color: 'var(--text)' }}
          >
            Recent Sessions
            <span
              className="ml-auto mr-2 text-xs font-normal"
              style={{ color: 'var(--text-secondary)' }}
            >
              {sessionHistory.length}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title=""
              companions={sessionHistory}
              classNames="border-0 p-0 bg-transparent"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="companions"
          className="rounded-2xl px-5"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <AccordionTrigger
            className="text-base font-semibold hover:no-underline py-4"
            style={{ color: 'var(--text)' }}
          >
            My Companions
            <span
              className="ml-auto mr-2 text-xs font-normal"
              style={{ color: 'var(--text-secondary)' }}
            >
              {companions.length}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title=""
              companions={companions}
              classNames="border-0 p-0 bg-transparent"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
