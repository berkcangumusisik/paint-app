'use client';

import React from 'react';

interface WelcomeScreenProps {
  onClose: () => void;
}

export default function WelcomeScreen({ onClose }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎨</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Modern Beyaz Tahta</h1>
            <p className="text-lg text-gray-600">Gelişmiş özelliklerle profesyonel dijital çizim deneyimi</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">🖊️ Çizim Araçları</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Kalem, Kurşun, Marker - pürüzsüz eğriler
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Gelişmiş silgi - destination-out karışımı
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Çoklu fırça boyutu ve şeffaflık
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">🔺 Şekiller & Nesneler</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Dikdörtgen, Daire, Çizgi, Ok
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Yapışkan notlar - düzenlenebilir
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Gerçek zamanlı şekil önizlemesi
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">🎨 Renk & Stil</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  30+ hazır renk paleti
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Özel renk seçici
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Değişken şeffaflık ve boyut
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">📁 Medya & Dosyalar</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Resim ve PDF yükleme
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Sürükle-bırak desteği
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Medya üzerinde çizim
                </li>
              </ul>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">⚡ Gelişmiş Özellikler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">Sınırsız Geri Al/İleri Al</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">Mouse pozisyonuna göre zoom</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">İçeriğe otomatik sığdırma</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">PNG formatında dışa aktarma</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">Klavye kısayolları</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">Responsive tasarım</span>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">⌨️ Klavye Kısayolları</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Geri Al</span>
                  <kbd className="px-2 py-1 bg-white rounded text-gray-700 font-mono">Ctrl+Z</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">İleri Al</span>
                  <kbd className="px-2 py-1 bg-white rounded text-gray-700 font-mono">Ctrl+Y</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kaydırma Modu</span>
                  <kbd className="px-2 py-1 bg-white rounded text-gray-700 font-mono">Alt+Tık</kbd>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Yakınlaştır/Uzaklaştır</span>
                  <kbd className="px-2 py-1 bg-white rounded text-gray-700 font-mono">Mouse Tekerleği</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tümünü Temizle</span>
                  <kbd className="px-2 py-1 bg-white rounded text-gray-700 font-mono">Ctrl+Delete</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Görünümü Sıfırla</span>
                  <kbd className="px-2 py-1 bg-white rounded text-gray-700 font-mono">Home</kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Tips */}
          <div className="bg-yellow-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">💡 Kullanım İpuçları</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Dosyaları doğrudan canvas üzerine sürükleyip bırakabilirsiniz</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Yapışkan not eklemek için &quot;Yapışkan Not&quot; aracını seçin ve tıklayın</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Seçim aracıyla notları ve resimleri düzenleyebilirsiniz</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Mouse tekerleği ile zoom, Alt+tık ile kaydırma yapabilirsiniz</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Çizmeye Başla ✨
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200"
            >
              Geç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 