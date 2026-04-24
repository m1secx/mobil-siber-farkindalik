# AGENTS.md

## Proje Özeti
Bu proje, genel kullanıcılara yönelik siber güvenlik farkındalığını artırmak için geliştirilen bir mobil uygulamadır.

## Ürün Hedefi
Kullanıcıların phishing, parola güvenliği, sosyal mühendislik, güvenli bağlantı ve mobil uygulama izinleri gibi temel konularda farkındalık kazanmasını sağlamak.

## Teknoloji Kararları
- Expo
- React Native
- TypeScript
- Expo Router
- Supabase
- PostgreSQL
- RLS
- Önce Android MVP, sonra iOS/App Store

## Mimari Kararlar
- Route dosyaları `app/` altında olacak
- İş mantığı `src/` altında tutulacak
- Supabase ile ilgili migration ve backend dosyaları `supabase/` altında olacak
- Kritik puan hesaplamaları istemcide değil backend tarafında yapılacak
- Leaderboard SQL sorgusu veya view mantığıyla üretilecek
- Basitleştirilmiş veri modeli kullanılmayacak
- Detaylı ilişkisel veri modeli kullanılacak

## Kodlama Kuralları
- TypeScript strict uyumlu kod yaz
- Dosyalar tek sorumluluk taşısın
- UI ile business logic ayrılmış olsun
- Gereksiz büyük component yazma
- Android'e özel kestirme çözümler kullanma
- iOS uyumunu bozma
- Gereksiz kütüphane ekleme

## Çalışma Şekli
- Önce kısa plan çıkar
- Sonra uygulanacak dosyaları listele
- Sonra değişiklikleri yap
- Her görev sonunda doğrulama adımlarını yaz
- Büyük ve dağınık değişikliklerden kaçın

## Güncel Durum Notu
- Güncel sprint durumu ve sıradaki en küçük adım için `docs/current-state.md` dosyasını referans al.

## Yasaklar
- Firebase kullanma
- basitleştirilmiş veri modeline dönme
- sunucu mantığını istemciye taşıma
