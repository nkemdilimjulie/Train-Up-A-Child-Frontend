import "./globals.css";
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Train-Up-A-Child',
  description: 'Empowering underprivileged children through sponsorship',
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

