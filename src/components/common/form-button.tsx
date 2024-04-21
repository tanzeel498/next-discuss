'use client';

import { Button } from '@nextui-org/button';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  children: React.ReactNode;
}

export default function FormButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isDisabled={pending} isLoading={pending}>
      {children}
    </Button>
  );
}
