import { Suspense } from 'react';
import { Todos } from './todos';

export default function Home() {
  return (
    <main>
      <h1>Speed Paradigm App</h1>
      <Suspense fallback={<p>Loading todos…</p>}>
        <Todos />
      </Suspense>
    </main>
  );
}
