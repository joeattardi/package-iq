export default function BundleSize({ bundleSize }) {
  console.log(bundleSize);

  return (
    <div className="bg-white p-2 border border-slate-300 rounded-md">
      <h3 className="text-xl font-bold">Bundle size</h3>
      <dl>
        <dt>Size</dt>
        <dd>{bundleSize.size}</dd>
        <dt>gzipped</dt>
        <dd>{bundleSize.gzip}</dd>
      </dl>
    </div>
  );
}
