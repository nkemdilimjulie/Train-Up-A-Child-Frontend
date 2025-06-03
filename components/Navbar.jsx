// components/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f2f2f2' }}>
      <Link href="/">Home</Link> |{' '}
      <Link href="/about">About Us</Link> |{' '}
      <Link href="/sponsors">Sponsors</Link> |{' '}
      <Link href="/kids">Needy Kids</Link> |{' '}
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
