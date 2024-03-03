import {
  Link,
  Form,
  useNavigation,
  useSearchParams
} from '@remix-run/react';
import { MagnifyingGlass, Package } from '@phosphor-icons/react';
import clsx from 'clsx';

export default function Header() {
  const [params] = useSearchParams();
  const navigation = useNavigation();

  return (
    <header className="bg-slate-800 text-white flex items-center p-4">
      <h1 className="text-xl">
        <Link to="/" className="flex items-center gap-1">
          <Package weight="duotone" size={32} />
          Package IQ
        </Link>
      </h1>

      <Form className="ml-4 flex-grow flex justify-center" action="/search" role="search">
        <input
          type="search"
          disabled={navigation.state === 'loading'}
          className={clsx('bg-stone-600 w-3/5 px-2 py-1 text-xl border border-stone-500 text-white', {
            'opacity-50': navigation.state === 'loading'
          })}
          id="q"
          name="q"
          placeholder="Search packages..."
          defaultValue={params.get('q') || ''}
        />
        <button 
          disabled={navigation.state === 'loading'}
          className="bg-blue-700 text-white w-12 flex items-center justify-center"
        >
          <MagnifyingGlass weight="duotone" size={24} />
        </button>
      </Form>
    </header>
  )
}
