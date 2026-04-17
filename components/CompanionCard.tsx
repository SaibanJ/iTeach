import Image from 'next/image';
import Link from 'next/link';

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => (
  <article className="companion-card group">
    <div className="flex justify-between items-start">
      <div
        className="size-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: color + '22', border: `1px solid ${color}44` }}
      >
        <Image src={`/icons/${subject}.svg`} alt={subject} width={24} height={24} />
      </div>
      <div className="subject-badge">{subject}</div>
    </div>

    <div className="flex flex-col gap-1.5">
      <h2 className="text-lg font-bold leading-tight" style={{ color: 'var(--text)' }}>
        {name}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {topic}
      </p>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13}
          height={13}
          style={{ opacity: 0.5 }}
        />
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {duration} min
        </span>
      </div>

      <Link href={`/companions/${id}`}>
        <button className="btn-primary text-xs px-3 py-1.5">Start Session</button>
      </Link>
    </div>
  </article>
);

export default CompanionCard;
