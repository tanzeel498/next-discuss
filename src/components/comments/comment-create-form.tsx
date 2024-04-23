'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref} noValidate>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(', ')}
        />

        {formState.errors._form ? (
          <div className="rounded-md p-2 bg-[#f31260] bg-opacity-15 text-xs text-[#f31260]">
            {formState.errors._form?.join(', ')}
          </div>
        ) : null}

        <FormButton>Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
