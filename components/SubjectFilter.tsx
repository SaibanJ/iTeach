'use client';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { subjects } from '@/constants';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { useSearchParams, useRouter } from 'next/navigation';

const SubjectFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('subject');
  const [subject, setSubject] = useState(query || 'all');

  useEffect(() => {
    let newUrl = '';
    if (subject === 'all') {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject'],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'subject',
        value: subject,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [subject, searchParams, router]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger
        className="w-[160px] text-sm rounded-lg"
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border-bright)',
          color: 'var(--text)',
        }}
      >
        <SelectValue placeholder="All subjects" />
      </SelectTrigger>
      <SelectContent
        style={{ background: 'var(--surface-2)', border: '1px solid var(--border-bright)' }}
      >
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map(subject => (
          <SelectItem value={subject} key={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
