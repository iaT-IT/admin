import { GetFormContentByUrl } from '@/actions/form';
import { FormElementInstance } from '@/components/(form)/FormElements';
import FormSubmitComponent from '@/components/(form)/FormSubmit';

const SubmitPage = async ({
  params: { formUrl },
}: {
  params: { formUrl: string };
}) => {
  const form = await GetFormContentByUrl(formUrl);
  if (!form) {
    throw new Error('Form not found');
  }
  const formContent = JSON.parse(form.content) as FormElementInstance[];
  return (
    <FormSubmitComponent
      name={form.name}
      formUrl={formUrl}
      content={formContent}
    />
  );
};
export default SubmitPage;
