import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { twig } from 'twig';

async function getTemplateFileContent(name: string) {
  const filePath = resolve(__dirname, 'templates/emails');
  const fileName = join(filePath, `${name}.html.twig`);
  const content = await readFile(fileName, 'utf-8');
  return twig({ data: content });
}

export async function parseEmailTemplate(templateName: string, data: any) {
  return (await getTemplateFileContent(templateName)).render(data);
}
