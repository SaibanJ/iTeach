import CompanionForm from '@/components/CompanionForm';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  return (
    <main className="max-w-[700px]! mx-auto! items-stretch!">
      <div className="flex flex-col gap-2">
        <h1 style={{ color: 'var(--text)' }}>Companion Builder</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Configure your AI tutor — name it, set the subject, and choose a voice style.
        </p>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <CompanionForm />
      </div>
    </main>
  );
};

export default NewCompanion;
