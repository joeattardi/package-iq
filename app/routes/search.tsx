import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

type SearchResult = {
  package: {
    name: string;
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');

  if (q) {
    const searchUrl = new URL('https://api.npms.io/v2/search');
    searchUrl.searchParams.append('q', q);

    const response = await fetch(searchUrl);
    const data = await response.json();
    return json({ data, q });
  }

  return json({ data: { results: [] }, q });
}

export default function Search() {
  const { data, q } = useLoaderData<typeof loader>();

  if (!q) {
    return (
      <p>Enter a search term.</p>
    )
  }

  return (
    <ul>
      {data.results.map((result: SearchResult) => (
        <li key={result.package.name}>
          {result.package.name}
        </li>
      ))}
    </ul>
  );
}
