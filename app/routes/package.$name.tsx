import { Package } from '@phosphor-icons/react';
import { LoaderFunctionArgs, json, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import DownloadCharts from '~/components/DownloadCharts';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data.packageData.collected.metadata.name} | Package IQ` }
  ]
};

async function getPackage(name: string) {
  const response = await fetch(`https://api.npms.io/v2/package/${encodeURIComponent(name)}`);
  return response.json();
}

async function getDownloads(name: string) {
  const response = await fetch(`https://api.npmjs.org/downloads/range/last-month/${name}`);
  return response.json();
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.name) {
    const packageData = await getPackage(params.name);

    if (packageData.code === 'NOT_FOUND') {
      throw new Response(null, {
        status: 404,
        statusText: 'Package not found'
      });
    }

    const downloads = await getDownloads(params.name);

    return json({
      packageData,
      downloads
    });
  }

  return json({});
}

export default function PackageDashboard() {
  const { packageData, downloads } = useLoaderData<typeof loader>();

  return (
    <div>
      <div>
        <h2 className="text-2xl flex items-center">
          <Package className="mr-1" size={24} weight="duotone" />
          {packageData.collected.metadata.name}
        </h2>
        <p className="text-sm">{packageData.collected.metadata.description}</p>
      </div>
      <div className="mt-4 grid grid-cols-2">
        <DownloadCharts downloads={downloads} />
      </div>
    </div>
  );
}