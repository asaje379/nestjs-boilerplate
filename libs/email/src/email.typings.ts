export class FileAttachment {
  filename: string;
  path: string;
}

export class CreateEmail {
  to: string;
  subject: string;
  content?: string;
  template?: string;
  data?: any;
  from?: string;
  cc?: string;
  attachments?: FileAttachment[];
  host?: string;
  user?: string;
  pass?: string;
}
