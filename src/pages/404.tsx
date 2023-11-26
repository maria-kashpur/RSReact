import ErrorPage from '@/components/ErrorPage/ErrorPage';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <ErrorPage></ErrorPage>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px auto',
        }}
      >
        <button
          style={{
            backgroundColor: 'transparent',
            color: 'gold',
            border: '1px solid gold',
            borderRadius: '10px',
            padding: '10px',
          }}
          type="button"
          onClick={() => router.push('/')}
        >
          To main
        </button>
      </div>
    </>
  );
}
