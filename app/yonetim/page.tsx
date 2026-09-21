import type { Metadata } from 'next';
import AdminApp from '@/components/admin/AdminApp';

export const metadata: Metadata = {
  title: 'Yönetim — Cashnova',
  // Bu sayfa arama motorlarına kapalıdır.
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
