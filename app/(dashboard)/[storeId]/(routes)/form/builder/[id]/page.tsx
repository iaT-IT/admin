import { GetFormById } from '@/actions/form';
import FormBuilder from '@/components/(form)/FormBuilder';

const BuilderPage = async ({
  params,
}: {
  params: { id: string; storeId: string };
}) => {
  const { id, storeId } = params;
  console.log('❄️ ~ file: page.tsx:6 ~ id:', id);
  const form = await GetFormById(id);
  if (!form) {
    throw new Error('form not found');
  }

  return (
    <FormBuilder
      form={form}
      storeId={storeId}
    />
  );
};
export default BuilderPage;
