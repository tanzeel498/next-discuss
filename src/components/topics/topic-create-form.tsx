'use client';

import { useFormState } from 'react-dom';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

export default function TopicCreateForm() {
  const [state, formAction] = useFormState(actions.createTopic, { errors: {} });

  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form action={formAction} noValidate>
          <div className="flex flex-col w-80 p-4 gap-4">
            <h3 className="text-lg">Create a Topic</h3>

            <Input
              name="name"
              labelPlacement="outside"
              label="Name"
              placeholder="Name"
              isInvalid={!!state.errors.name}
              errorMessage={state.errors.name?.join(', ')}
            />
            <Textarea
              name="description"
              labelPlacement="outside"
              label="Description"
              placeholder="Describe your topic"
              isInvalid={!!state.errors.description}
              errorMessage={state.errors.description?.join(', ')}
            />

            {state.errors._form ? (
              <div className="rounded-md p-2 bg-[#f31260] border bg-opacity-15 text-xs text-[#f31260]">
                {state.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
