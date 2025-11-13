export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://your-production-domain.com/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}