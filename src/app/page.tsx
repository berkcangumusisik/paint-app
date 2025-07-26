import { Metadata } from 'next';
import Whiteboard from '../components/Whiteboard';

export const metadata: Metadata = {
  title: 'Paint App - Online Çizim ve Beyaz Tahta Uygulaması',
  description: 'Ücretsiz online çizim uygulaması. Beyaz tahta, şekil çizimi, yapışkan notlar, PDF yükleme ve daha fazlası. Hemen çizmeye başlayın!',
  keywords: 'online çizim, beyaz tahta, çizim uygulaması, şekil çizimi, yapışkan notlar, PDF yükleme, ücretsiz çizim',
  openGraph: {
    title: 'Paint App - Online Çizim ve Beyaz Tahta Uygulaması',
    description: 'Ücretsiz online çizim uygulaması. Beyaz tahta, şekil çizimi, yapışkan notlar, PDF yükleme ve daha fazlası.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export default function Home() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Whiteboard />
    </div>
  );
}
