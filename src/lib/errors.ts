export class AppError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function handleApiError(e: unknown) {
  if (e instanceof AppError) {
    return new Response(JSON.stringify({ error: e.message }), { status: e.status });
  }
  console.error('Unhandled API Error:', e);
  return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
}