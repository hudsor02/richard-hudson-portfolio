// src/components/error.tsx
interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>An error occurred</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  );
}
