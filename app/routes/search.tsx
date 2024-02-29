import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');

  if (q) {
    const searchUrl = new URL('https://api.npms.io/v2/search');
    searchUrl.searchParams.append('q', q);

    const response = await fetch(searchUrl);
    const data = await response.json();
    return json({ data, q });
  }

  return json({});
}

export default function Search() {
  const { data } = useLoaderData();

  if (!data) {
    return (
      <p>Enter a search term.</p>
    )
  }

  return (
    <ul>
      {data.results.map(result => (
        <li key={result.package.name}>
          {result.package.name}
        </li>
      ))}
    </ul>
  );
}
