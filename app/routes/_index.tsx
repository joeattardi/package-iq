import type { MetaFunction } from "@vercel/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "Package IQ" },
  ];
};

export default function Index() {
  return (
    <div>
      Search for a package to get started.
    </div>
  );
}
