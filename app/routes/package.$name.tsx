import { Package } from '@phosphor-icons/react';
import { LoaderFunctionArgs, json, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data.collected.metadata.name} | Package IQ` }
  ]
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.name) {
    const response = await fetch(`https://api.npms.io/v2/package/${encodeURIComponent(params.name)}`);
    const data = await response.json();

    if (data.code === 'NOT_FOUND') {
      throw new Response(null, {
        status: 404,
        statusText: 'Package not found'
      });
    }

    return json(data);
  }

  return json({});
}

export default function PackageDashboard() {
  const { collected } = useLoaderData<typeof loader>();

  return (
    <div>
      <div>
        <h2 className="text-2xl flex items-center">
          <Package className="mr-1" size={24} weight="duotone" />
          {collected.metadata.name}
        </h2>
        <p className="text-sm">{collected.metadata.description}</p>
      </div>
    </div>
  );
}