import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { ModalProvider } from '../context/ModalContext';

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider value={false}>
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
