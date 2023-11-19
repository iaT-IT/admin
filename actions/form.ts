'use server';

import prismadb from '@/lib/prismadb';
import { formSchema, formSchemaType } from '@/types/form';

const userId = process.env.NEXT_PUBLIC_USER_ID!;
export async function GetFormStats() {
  const stats = prismadb.form.aggregate({
    where: {
      userId,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });
  const visits = (await stats)._sum.visits ?? 0;
  const submissions = (await stats)._sum.submissions ?? 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;
  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  console.log(validation);
  if (!validation.success) {
    throw new Error('form not valid');
  }

  const form = await prismadb.form.create({
    data: {
      userId,
      name: data.name,
      description: data.description,
    },
  });
  if (!form) {
    throw new Error('something went wrong');
  }
  return form.id;
}

export async function GetForms() {
  return await prismadb.form.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function GetFormById(id: string) {
  return await prismadb.form.findUnique({
    where: {
      id,
      userId,
    },
  });
}

export async function UpdateFormContent(id: string, jsonContent: string) {
  console.log('❄️ ~ file: form.ts:75 ~ id:', id);
  const res = await prismadb.form.update({
    where: {
      userId,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
  console.log('❄️ ~ file: form.ts:85 ~ res:', res);
  return res;
}

export async function PublishForm(id: string, jsonContent: string) {
  return await prismadb.form.update({
    where: {
      userId,
      id,
    },
    data: {
      published: true,
      content: jsonContent,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prismadb.form.update({
    where: {
      userId,
      shareURL: formUrl,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    select: {
      content: true,
      name: true,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prismadb.form.update({
    where: {
      shareURL: formUrl,
    },
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
      published: true,
    },
  });
}

export async function GetFormWithSubmissions(id: string) {
  return await prismadb.form.findUnique({
    where: {
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}
