'use server';

import type { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, 'Must be lower case letters or dashes without space'),
  description: z.string().min(10),
});

interface CreateTopicState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  state: CreateTopicState,
  formData: FormData
): Promise<CreateTopicState> {
  console.log(state);

  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: { _form: ['You must be signed In to do this.'] },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    } else {
      return { errors: { _form: ['Something went wrong!'] } };
    }
  }

  revalidatePath('/');
  // redirecting outside try/catch because it redirects by throwing error
  redirect(paths.topicShow(topic.slug));
}
