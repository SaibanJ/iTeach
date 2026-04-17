import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, getSubjectColor } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => (
  <article className={cn('companion-list', classNames)}>
    <h2 className="font-bold text-xl mb-4" style={{ color: 'var(--text)' }}>
      {title}
    </h2>

    <Table>
      <TableHeader>
        <TableRow style={{ borderColor: 'var(--border)' }}>
          <TableHead className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Lesson
          </TableHead>
          <TableHead className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Subject
          </TableHead>
          <TableHead
            className="text-sm font-semibold text-right"
            style={{ color: 'var(--text-secondary)' }}
          >
            Duration
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companions
          ?.filter(companion => companion !== undefined)
          .map(({ id, subject, name, topic, duration }) => {
            const color = getSubjectColor(subject);
            return (
              <TableRow
                key={id}
                style={{ borderColor: 'var(--border)' }}
                className="group transition-colors hover:bg-white/[0.02]"
              >
                <TableCell>
                  <Link href={`/companions/${id}`}>
                    <div className="flex items-center gap-3">
                      <div
                        className="size-10 flex items-center justify-center rounded-lg shrink-0 max-md:hidden"
                        style={{ backgroundColor: color + '22', border: `1px solid ${color}33` }}
                      >
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={20} height={20} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p
                          className="font-semibold text-sm group-hover:text-purple-400 transition-colors"
                          style={{ color: 'var(--text)' }}
                        >
                          {name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {topic}
                        </p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="subject-badge w-fit max-md:hidden">{subject}</div>
                  <div
                    className="flex items-center justify-center rounded-lg w-fit p-1.5 md:hidden"
                    style={{ backgroundColor: color + '22' }}
                  >
                    <Image src={`/icons/${subject}.svg`} alt={subject} width={16} height={16} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 w-full justify-end">
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {duration}
                      <span className="max-md:hidden"> min</span>
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </article>
);

export default CompanionsList;
