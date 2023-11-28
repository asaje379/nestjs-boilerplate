import { Request } from 'express';

export function formatRequest(request: Request) {
  const method = request.method.toUpperCase();
  const baseUrl = request.originalUrl;

  return `[@${request.ip}] ${method} ${baseUrl}
${
  request.body && Object.keys(request.body).length > 0
    ? JSON.stringify(request.body, null, 2)
    : ''
}
`;
}
