
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Train-Up-A-Child',
  description: 'Sponsor needy kids education',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ padding: '1rem' }}>{children}</main>
      </body>
    </html>
  );
}
