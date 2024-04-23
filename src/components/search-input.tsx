'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/input';
import * as actions from '@/actions';

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={actions.search} noValidate>
      <Input name="term" defaultValue={searchParams.get('term') || undefined} />
    </form>
  );
}
