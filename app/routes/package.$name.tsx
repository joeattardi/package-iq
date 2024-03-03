import { Copy, Package } from '@phosphor-icons/react';
import { LoaderFunctionArgs, json, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { filesize } from 'filesize';
import CopyToClipboard from 'react-copy-to-clipboard';
import BundleSize from '~/components/BundleSize';
import DashboardItem from '~/components/DashboardItem';
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

async function getBundleSize(name: string) {
  const response = await fetch(`https://bundlephobia.com/api/size?package=${name}`);
  return response.json();
}

async function getNpmStats(name: string) {
  const response = await fetch(`https://registry.npmjs.org/${name}`);
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
    const bundleSize = await getBundleSize(params.name);
    const npmStats = await getNpmStats(params.name);

    return json({
      packageData,
      downloads,
      bundleSize,
      npmStats
    });
  }

  return json({});
}

export default function PackageDashboard() {
  const { packageData, downloads, bundleSize, npmStats } = useLoaderData<typeof loader>();

  const numberFormatter = new Intl.NumberFormat();

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-3xl flex items-center">
          {packageData.collected.metadata.name}
        </h2>
        <p>{packageData.collected.metadata.description}</p>
      </div>
      <DashboardItem
        label="Install"
        value={
            <div className="flex items-center justify-between gap-4">
              <div className="font-mono">npm install {packageData.collected.metadata.name}</div>  
              <CopyToClipboard text={`npm install ${packageData.collected.metadata.name}`}>
                <Copy size={24} />
              </CopyToClipboard>
            </div>
        }
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {packageData.collected.metadata.links.homepage ? <DashboardItem
          label="Homepage"
          value={<a href={packageData.collected.metadata.links.homepage}>{packageData.collected.metadata.links.homepage}</a>}
        /> : null}
        {packageData.collected.metadata.links.repository ? <DashboardItem
          label="Repository"
          value={<a href={packageData.collected.metadata.links.repository}>{packageData.collected.metadata.links.repository}</a>}
        /> : null}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        <DashboardItem label="Latest Version" value={packageData.collected.metadata.version} />
        <DashboardItem label="Versions" value={numberFormatter.format(Object.keys(npmStats.versions).length)} />
        <DashboardItem label="Bundle Size" value={filesize(bundleSize.size)} />
        <DashboardItem label="Gzipped Size" value={filesize(bundleSize.gzip)} />
      </div>
    </div>
  );
}