// src/app/loading.tsx
import { FullPageLoader } from '@/components/loading';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <FullPageLoader />
    </div>
  );
}
