import type { EducationModule } from './types';

export const educationModules: EducationModule[] = [
  {
    id: 'phishing-awareness',
    title: 'Kimlik Avı Farkındalığı',
    description:
      'Sahte e-postalar, mesajlar ve web siteleri aracılığıyla kişisel bilgilerinizi çalmaya yönelik kimlik avı saldırılarını tanımayı ve önlemeyi öğrenin.',
    level: 'beginner',
    durationMinutes: 10,
    content: [
      'Kimlik avı (phishing), siber suçluların sahte e-posta, SMS veya web siteleri kullanarak kullanıcıların kişisel bilgilerini ele geçirmeye çalıştığı bir saldırı türüdür. Bu saldırılarda genellikle tanıdık bir kurumun veya kişinin kimliğine bürünülür.',
      'Kimlik avı mesajlarının en yaygın belirtileri arasında acil eylem talebi, beklenmedik bağlantılar, yazım hataları ve resmi olmayan gönderen adresleri bulunur. Bir mesaj sizi hemen tıklamaya zorluyorsa dikkatli olun.',
      'Bir bağlantıya tıklamadan önce fare imlecini bağlantının üzerine getirerek gerçek URL’yi kontrol edin. Resmi web siteleri genellikle HTTPS protokolü kullanır ve alan adı doğru yazılmıştır. Şüpheli bağlantıları asla tıklamayın.',
      'E-posta veya mesajlardaki ek dosyaları açmadan önce gönderenin kimliğini doğrulayın. Tanımadığınız göndericilerden gelen ekleri asla indirmeyin veya açmayın. Şüpheli durumlarda ilgili kurumu resmi kanallarından arayarak doğrulama yapın.',
    ],
    quiz: [
      {
        id: 'phishing-q1',
        question:
          'Bir e-postada acil eylem talebi, yazım hataları ve şüpheli bir bağlantı varsa ne yapmalısınız?',
        options: [
          { id: 'a', text: 'Hemen bağlantıya tıklayıp işlemi tamamlamalıyım' },
          { id: 'b', text: 'Gönderenin adresini ve bağlantıyı kontrol etmeliyim' },
          { id: 'c', text: 'E-postayı arkadaşlarımla paylaşmalıyım' },
        ],
        correctOptionId: 'b',
        explanation:
          'Şüpheli e-postalarda bağlantıya hemen tıklamak yerine gönderen adresini ve bağlantıyı dikkatlice kontrol etmelisiniz. Resmi kurumlar asla acil eylem talebiyle şüpheli bağlantılar göndermez.',
      },
      {
        id: 'phishing-q2',
        question:
          'Bir web sitesinin güvenli olup olmadığını anlamanın en kolay yolu nedir?',
        options: [
          { id: 'a', text: 'Sitenin tasarımına bakmak' },
          { id: 'b', text: 'Adres çubuğunda HTTPS ve kilit simgesi olup olmadığını kontrol etmek' },
          { id: 'c', text: 'Sitedeki reklamların sayısına bakmak' },
          { id: 'd', text: 'Sitenin sosyal medya hesaplarını araştırmak' },
        ],
        correctOptionId: 'b',
        explanation:
          'Güvenli web siteleri HTTPS protokolü kullanır ve tarayıcı adres çubuğunda kilit simgesi gösterir. Bu, site ile aranızdaki bağlantının şifrelendiğini ve verilerinizin güvende olduğunu gösterir.',
      },
    ],
    video: {
      title: 'Kimlik Avı (Phishing) Nedir?',
      youtubeVideoId: 'dQw4w9WgXcQ',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description:
        'Bu videoda kimlik avı saldırılarının nasıl çalıştığını, yaygın tekniklerini ve kendinizi nasıl koruyacağınızı öğreneceksiniz.',
    },
  },
  {
    id: 'strong-passwords',
    title: 'Güçlü Parola Kullanımı',
    description:
      'Hesaplarınızı korumak için güçlü ve benzersiz parolalar oluşturmayı, parola yöneticisi kullanmayı ve iki faktörlü doğrulamayı öğrenin.',
    level: 'beginner',
    durationMinutes: 8,
    content: [
      'Güçlü bir parola en az 12 karakter uzunluğunda olmalı ve büyük harf, küçük harf, rakam ve özel karakterlerin birleşimini içermelidir. "123456", "password" veya doğum tarihi gibi tahmin edilebilir bilgiler asla kullanılmamalıdır.',
      'Her hesap için farklı bir parola kullanmak çok önemlidir. Bir hesabın parolası çalındığında, aynı parolayı kullanan diğer hesaplarınız da risk altına girer. Parola yöneticileri benzersiz ve karmaşık parolalar oluşturup güvenle saklamanıza yardımcı olur.',
      'İki faktörlü doğrulama (2FA), parolanıza ek bir güvenlik katmanı ekler. Giriş yaparken telefonunuza gelen kodu veya biyometrik doğrulamayı da girmeniz istenir. Bu özelliği destekleyen tüm hesaplarda mutlaka aktif hale getirin.',
      'Parolanızı kimseyle paylaşmayın ve farklı cihazlarda kaydetmemeye özen gösterin. Şüpheli bir durumda parolanızı hemen değiştirin. Düzenli aralıklarla parolalarınızı güncellemek iyi bir güvenlik alışkanlığıdır.',
    ],
    quiz: [
      {
        id: 'password-q1',
        question: 'Güçlü bir parola için aşağıdakilerden hangisi doğrudur?',
        options: [
          { id: 'a', text: 'En az 6 karakter ve sadece rakamlardan oluşmalıdır' },
          { id: 'b', text: 'Doğum tarihi veya evcil hayvan adı kullanılmalıdır' },
          { id: 'c', text: 'En az 12 karakter ve farklı karakter türleri içermelidir' },
        ],
        correctOptionId: 'c',
        explanation:
          'Güçlü parolalar en az 12 karakter uzunluğunda olmalı ve büyük harf, küçük harf, rakam ile özel karakterlerin birleşimini içermelidir. Tahmin edilebilir kişisel bilgiler kullanılmamalıdır.',
      },
      {
        id: 'password-q2',
        question: 'İki faktörlü doğrulama (2FA) ne işe yarar?',
        options: [
          { id: 'a', text: 'Parolayı hatırlamama yardımcı olur' },
          { id: 'b', text: 'Parolaya ek bir güvenlik katmanı ekler' },
          { id: 'c', text: 'Giriş yapmayı hızlandırır' },
          { id: 'd', text: 'E-posta adresini gizler' },
        ],
        correctOptionId: 'b',
        explanation:
          'İki faktörlü doğrulama, parolanıza ek olarak telefonunuza gelen kod veya biyometrik doğrulama gibi ikinci bir doğrulama adımı ekleyerek hesaplarınızı daha güvenli hale getirir.',
      },
    ],
  },
  {
    id: 'safe-internet',
    title: 'Güvenli İnternet Kullanımı',
    description:
      'Halka açık Wi-Fi ağlarının risklerini, güvenli bağlantı kurma yöntemlerini ve çevrimiçi alışverişte dikkat edilmesi gerekenleri öğrenin.',
    level: 'intermediate',
    durationMinutes: 12,
    content: [
      'Halka açık Wi-Fi ağları, ortadaki adam saldırılarına karşı savunmasızdır. Bu ağlarda bankacılık işlemi, parola girme veya kişisel veri paylaşımı gibi hassas işlemlerden kaçının. Mümkünse mobil veri kullanın veya güvenilir bir VPN hizmeti tercih edin.',
      'Çevrimiçi alışveriş yaparken sadece tanınmış ve güvenilir siteleri kullanın. Ödeme yapmadan önce sitenin güvenlik sertifikasına (HTTPS) ve geri ödeme politikasını dikkatlice inceleyin. Şüpheli derecede ucuz ürünler genellikle dolandırıcılık işaretidir.',
      'Tarayıcınızı ve işletim sisteminizi düzenli olarak güncelleyin. Güncellemeler, bilinen güvenlik açıklarını kapatır ve cihazınızı yeni tehditlere karşı korur. Otomatik güncellemeleri açık tutmak en iyi pratiklerden biridir.',
      'İnternette gezinirken karşınıza çıkan açılır pencerelere, indirme tekliflerine ve "bedava" yazılım reklamlarına karşı dikkatli olun. Bu tür içerikler genellikle kötü amaçlı yazılım bulaştırmak için kullanılır. Güvenmediğiniz kaynaklardan asla yazılım indirmeyin.',
    ],
    quiz: [
      {
        id: 'internet-q1',
        question:
          'Halka açık bir Wi-Fi ağında hangi tür işlemlerden kaçınmalısınız?',
        options: [
          { id: 'a', text: 'Sadece sosyal medya kullanmaktan' },
          { id: 'b', text: 'Bankacılık ve hassas veri içeren işlemlerden' },
          { id: 'c', text: 'Video izlemekten' },
        ],
        correctOptionId: 'b',
        explanation:
          'Halka açık Wi-Fi ağları güvenli olmayabilir. Bu ağlarda bankacılık işlemleri, parola girme veya kişisel veri paylaşımı gibi hassas işlemlerden kaçınmalısınız.',
      },
      {
        id: 'internet-q2',
        question: 'Çevrimiçi alışverişte güvenlik için en önemli adım nedir?',
        options: [
          { id: 'a', text: 'En ucuz fiyatı bulmak' },
          { id: 'b', text: 'Sitenin HTTPS kullandığını ve tanınmış bir site olduğunu doğrulamak' },
          { id: 'c', text: 'Hızlı kargo seçeneği sunmasına bakmak' },
          { id: 'd', text: 'Sitenin reklam sayısına bakmak' },
        ],
        correctOptionId: 'b',
        explanation:
          'Çevrimiçi alışverişte güvenlik için sitenin HTTPS protokolü kullandığını ve tanınmış, güvenilir bir kaynak olduğunu doğrulamak en önemli adımdır.',
      },
    ],
  },
  {
    id: 'social-engineering',
    title: 'Sosyal Mühendislik',
    description:
      'Siber suçluların insan psikolojisini kullanarak bilgi elde etmeye çalıştığı sosyal mühendislik tekniklerini tanıyın ve korunma yöntemlerini öğrenin.',
    level: 'intermediate',
    durationMinutes: 10,
    content: [
      'Sosyal mühendislik, teknik zafiyetler yerine insan zafiyetlerini hedef alan saldırı yöntemidir. Siber suçlular korku, merak, yardımseverlik veya otorite gibi duyguları manipüle ederek bilgi sızdırmaya çalışırlar.',
      'Oltalama (phishing) sosyal mühendisliğin en yaygın türüdür. Buna ek olarak, önemsiz bilgileri bir araya getirerek hassas veri elde edmeye çalışan "istihbarat toplama", sahte senaryolarla yardım talep eden "yardım isteme" ve yetkisiz erişim için fiziksel temas kuran " Dumpster diving" gibi yöntemler de vardır.',
      'Telefonda size teknik destek personeli gibi davranan ve bilgisayarınıza uzaktan erişim talep eden kişilere asla izin vermeyin. Resmi destek hizmetleri sizi asla arayıp şifre veya erişim talep etmez. Şüpheli durumlarda telefonu kapatın ve kurumu resmi numarasından arayın.',
      'Sosyal medyada paylaştığınız kişisel bilgiler, saldırganların sizi hedef almasını kolaylaştırabilir. Doğum tarihi, adres, çalıştığınız yer ve seyahat planlarınız gibi bilgileri herkese açık paylaşmaktan kaçının. Gizlilik ayarlarınızı düzenli olarak gözden geçirin.',
    ],
    quiz: [
      {
        id: 'social-q1',
        question:
          'Telefonda kendini banka çalışanı olarak tanıtan biri kart şifrenizi istiyor. Ne yapmalısınız?',
        options: [
          { id: 'a', text: 'Güven verdiği için hemen söylemeliyim' },
          { id: 'b', text: 'Telefonu kapatıp bankayı resmi numarasından aramalıyım' },
          { id: 'c', text: 'Sadece son dört rakamı söylemeliyim' },
        ],
        correctOptionId: 'b',
        explanation:
          'Resmi kurumlar telefonla şifre, PIN veya hassas bilgi talep etmez. Şüpheli aramalarda telefonu kapatıp kurumu resmi numarasından arayarak doğrulama yapmalısınız.',
      },
      {
        id: 'social-q2',
        question: 'Sosyal mühendislik saldırıları hangi zafiyeti hedef alır?',
        options: [
          { id: 'a', text: 'Sadece yazılım güvenlik açıklarını' },
          { id: 'b', text: 'İnsan duygularını ve davranışlarını' },
          { id: 'c', text: 'Sadece ağ altyapısını' },
          { id: 'd', text: 'Fiziksel güvenlik kameralarını' },
        ],
        correctOptionId: 'b',
        explanation:
          'Sosyal mühendislik, teknik zafiyetler yerine insan duygularını ve davranışlarını manipüle ederek bilgi elde etmeye çalışan bir saldırı yöntemidir.',
      },
    ],
  },
  {
    id: 'app-permissions',
    title: 'Mobil Uygulama İzinleri',
    description:
      'Mobil uygulamaların talep ettiği izinleri değerlendirmeyi, gereksiz izinleri reddetmeyi ve gizliliğinizi korumayı öğrenin.',
    level: 'beginner',
    durationMinutes: 8,
    content: [
      'Mobil uygulamalar çeşitli özellikleri kullanabilmek için izin talep eder. Ancak bazı uygulamalar işlevleriyle ilgisi olmayan gereksiz izinler isteyebilir. Örneğin bir hesap makinesi uygulamasının kişilerinize veya konumunuza erişim istemesi şüpheli bir durumdur.',
      'Uygulama izinlerini düzenli olarak gözden geçirin. Android ve iOS cihazlarda Ayarlar menüsünden her uygulamanın hangi izinlere sahip olduğunu kontrol edebilirsiniz. Kullanmadığınız veya gereksiz izin verdiğiniz uygulamaları kaldırın veya izinlerini sınırlandırın.',
      'Konum, mikrofon ve kamera gibi hassas izinler için "yalnızca uygulama kullanılırken" seçeneğini tercih edin. Arka planda sürekli çalışan uygulamalar hem pil ömrünüzü kısaltır hem de gizlilik riski oluşturur.',
      'Resmi uygulama mağazaları (Google Play Store, Apple App Store) dışından uygulama indirmekten kaçının. Bu tür uygulamalar genellikle güvenlik kontrollerinden geçmemiş olabilir ve kötü amaçlı yazılım içerebilir. Uygulama yorumlarını ve geliştirici bilgilerini inceleyin.',
    ],
    quiz: [
      {
        id: 'permissions-q1',
        question:
          'Bir hesap makinesi uygulaması kişilerinize erişim istiyor. Ne yapmalısınız?',
        options: [
          { id: 'a', text: 'Hesap makinesi için gerekli bir izin, kabul etmeliyim' },
          { id: 'b', text: 'Bu izni reddetmeli ve uygulamayı şüpheli bulmalıyım' },
          { id: 'c', text: 'Sadece geçici olarak izin vermeliyim' },
        ],
        correctOptionId: 'b',
        explanation:
          'Bir uygulamanın işleviyle ilgisi olmayan izin talepleri şüpheli bir durumdur. Hesap makinesi uygulamasının kişilerinize erişimine gerek yoktur ve bu izni reddetmelisiniz.',
      },
      {
        id: 'permissions-q2',
        question: 'Hassas izinler için en güvenli seçenek hangisidir?',
        options: [
          { id: 'a', text: 'Her zaman izin vermek' },
          { id: 'b', text: 'Uygulamaya hiç izin vermemek' },
          { id: 'c', text: '"Yalnızca uygulama kullanılırken" izin vermek' },
          { id: 'd', text: 'Arka planda sürekli izin vermek' },
        ],
        correctOptionId: 'c',
        explanation:
          'Konum, mikrofon ve kamera gibi hassas izinler için "yalnızca uygulama kullanılırken" seçeneği en güvenli tercihtir. Bu, uygulamanın arka planda verilerinize erişmesini engeller.',
      },
    ],
  },
];

export function getEducationModuleById(
  moduleId: string
): EducationModule | undefined {
  return educationModules.find((module) => module.id === moduleId);
}
