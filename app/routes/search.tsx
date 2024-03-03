import { LoaderFunctionArgs, json, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { Package } from '@phosphor-icons/react';

type SearchResult = {
  package: {
    name: string;
    description: string;
  }
}

export const meta: MetaFunction = () => [
  { title: 'Search | Package IQ' }
];

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
    <ul className="flex flex-col gap-4">
      {data.results.map((result: SearchResult) => (
        <li className="pb-4 border-b border-b-stone-300" key={result.package.name}>
          <Link 
            className="font-bold text-xl flex items-center gap-1 hover:underline" 
            to={`/package/${encodeURIComponent(result.package.name)}`}
          >
            <Package weight="duotone" />
            {result.package.name}
          </Link>
          <p>{result.package.description}</p>
        </li>
      ))}
      {data.total === 0 && (
        <p className="text-2xl">No packages found</p>
      )}
    </ul>
  );
}
