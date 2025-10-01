
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


// import Navbar from '../components/Navbar';
// import ClientWrapper from '../components/ClientWrapper';

// export const metadata = {
//   title: 'Train-Up-A-Child',
//   description: 'Sponsor needy kids education',
// };

// export default function RootLayout({ children }) {
//   const isDev = process.env.NODE_ENV === "development";

//   return (
//     <html lang="en">
//       <head>
//         {isDev && <script src="http://localhost:8097"></script>}
//       </head>
//       <body>
//         <ClientWrapper>
//           <Navbar />
//           <main style={{ padding: '1rem' }}>{children}</main>
//         </ClientWrapper>
//       </body>
//     </html>
//   );
// }
