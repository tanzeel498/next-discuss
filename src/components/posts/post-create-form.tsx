'use client';

import { useFormState } from 'react-dom';
import { Button } from '@nextui-org/button';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { Input, Textarea } from '@nextui-org/input';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';

export default function PostCreateForm({ slug }: { slug: string }) {
  const [state, formAction] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );

  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={formAction} noValidate>
          <div className="flex flex-col w-80 p-4 gap-4">
            <h2 className="text-lg">Create a Post</h2>

            <Input
              name="title"
              label="Title"
              placeholder="Title"
              labelPlacement="outside"
              isInvalid={!!state.errors.title}
              errorMessage={state.errors.title?.join(', ')}
            />
            <Textarea
              name="content"
              label="Content"
              placeholder="Content"
              labelPlacement="outside"
              isInvalid={!!state.errors.content}
              errorMessage={state.errors.content?.join(', ')}
            />

            {state.errors._form ? (
              <div className="rounded-md p-2 bg-[#f31260] bg-opacity-15 text-xs text-[#f31260]">
                {state.errors._form.join(', ')}
              </div>
            ) : null}

            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
