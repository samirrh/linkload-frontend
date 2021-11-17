import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { ModalProvider } from '../context/ModalContext';

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider value={false}>
      <body className="bg-indigo-100 h-full">
        <Component {...pageProps} />
      </body>
    </ModalProvider>
  );
}

export default MyApp;
