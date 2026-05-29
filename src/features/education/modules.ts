import type { EducationModule } from './types';

export const educationModules: EducationModule[] = [
  {
    id: 'phishing-awareness',
    title: 'Oltalama Farkındalığı',
    description: 'Sahte mesajları ve kandırmaya çalışan bağlantıları fark etmeyi öğrenin.',
    durationMinutes: 5,
    difficulty: 'beginner',
    video: {
      title: 'Phishing E-postaları Nasıl Anlaşılır?',
      youtubeVideoId: 'dQw4w9WgXcQ',
      description: 'Oltalama e-postalarında gönderen adresi, aciliyet dili ve sahte bağlantı işaretlerini kısa bir örnek üzerinden anlatan öğretici video.',
    },
    contentSections: [
      {
        id: 'phishing-awareness-signs',
        title: 'Temel İşaretler',
        body: 'Oltalama mesajları genellikle acele ettiren bir dil kullanır, beklenmedik bağlantılar içerir ve sizden kişisel bilgi ister. Gönderen adı tanıdık görünse bile email adresi, yazım hataları ve bağlantı hedefi dikkatle kontrol edilmelidir.',
      },
      {
        id: 'phishing-awareness-safe-actions',
        title: 'Güvenli Tepki',
        body: 'Şüpheli bir mesaj aldığınızda bağlantıya hemen dokunmayın, eki açmayın ve giriş bilgilerinizi paylaşmayın. Gerekirse ilgili kurumu resmi uygulaması veya doğruladığınız web sitesi üzerinden kendiniz arayarak kontrol edin.',
      },
    ],
    quizQuestions: [
      {
        id: 'phishing-awareness-q1',
        question: 'Bir mesaj sizden hesabınızı hemen doğrulamanızı istiyorsa ilk adımınız ne olmalı?',
        options: [
          { id: 'phishing-awareness-q1-a', text: 'Mesajdaki bağlantıya tıklamak' },
          { id: 'phishing-awareness-q1-b', text: 'Mesajı resmi kanal üzerinden doğrulamak' },
          { id: 'phishing-awareness-q1-c', text: 'Şifrenizi mesajı gönderenle paylaşmak' },
        ],
        correctOptionId: 'phishing-awareness-q1-b',
        explanation: 'Şüpheli bir isteği resmi web sitesi veya uygulama üzerinden kontrol etmek en güvenli yaklaşımdır.',
      },
      {
        id: 'phishing-awareness-q2',
        question: 'Aşağıdakilerden hangisi oltalama belirtisi olabilir?',
        options: [
          { id: 'phishing-awareness-q2-a', text: 'Acele ettiren ve korku oluşturan bir dil' },
          { id: 'phishing-awareness-q2-b', text: 'Tanıdığınız birinin normal konuşma tarzı' },
          { id: 'phishing-awareness-q2-c', text: 'Önceden beklediğiniz bir mesaj' },
        ],
        correctOptionId: 'phishing-awareness-q2-a',
        explanation: 'Oltalama mesajları çoğu zaman panik oluşturarak hızlı karar vermenizi ister.',
      },
      {
        id: 'phishing-awareness-q3',
        question: 'Şüpheli bir emailde en güvenli davranış hangisidir?',
        options: [
          { id: 'phishing-awareness-q3-a', text: 'Ek dosyayı açıp ne olduğunu görmek' },
          { id: 'phishing-awareness-q3-b', text: 'Linki farklı bir tarayıcıda denemek' },
          { id: 'phishing-awareness-q3-c', text: 'Mesajı doğrulamadan hiçbir bağlantıya dokunmamak' },
        ],
        correctOptionId: 'phishing-awareness-q3-c',
        explanation: 'Bağlantı ve eklerden uzak durmak, zararlı içeriğe maruz kalma riskini azaltır.',
      },
    ],
  },
  {
    id: 'password-security',
    title: 'Parola Güvenliği',
    description: 'Güçlü ve sürdürülebilir parola alışkanlıkları için temel kuralları öğrenin.',
    durationMinutes: 6,
    difficulty: 'beginner',
    contentSections: [
      {
        id: 'password-security-strong-passwords',
        title: 'Güçlü Parola Oluşturma',
        body: 'Güçlü bir parola yeterince uzun olur ve tahmin edilmesi kolay kişisel bilgiler içermez. Tek kelime yerine anlamlı ama uzun bir parola cümlesi kullanmak hem güvenliği hem de hatırlanabilirliği artırabilir.',
      },
      {
        id: 'password-security-reuse-risk',
        title: 'Parola Tekrarı Riski',
        body: 'Aynı parolayı birden fazla hesapta kullanmak, tek bir sızıntının diğer hesapları da etkilemesine neden olur. Özellikle email hesabınız için benzersiz ve güçlü bir parola kullanmak kritik önemdedir.',
      },
    ],
    quizQuestions: [
      {
        id: 'password-security-q1',
        question: 'En güvenli seçenek hangisidir?',
        options: [
          { id: 'password-security-q1-a', text: 'Aynı parolayı tüm hesaplarda kullanmak' },
          { id: 'password-security-q1-b', text: 'Her önemli hesap için benzersiz parola kullanmak' },
          { id: 'password-security-q1-c', text: 'Parolayı not olarak herkesin görebileceği yere yazmak' },
        ],
        correctOptionId: 'password-security-q1-b',
        explanation: 'Benzersiz parolalar, tek bir hesabın ele geçirilmesinin zincirleme etki yaratmasını önler.',
      },
      {
        id: 'password-security-q2',
        question: 'Aşağıdakilerden hangisi zayıf parola örneğidir?',
        options: [
          { id: 'password-security-q2-a', text: 'Doğum yılı içeren kısa bir parola' },
          { id: 'password-security-q2-b', text: 'Uzun ve benzersiz bir parola cümlesi' },
          { id: 'password-security-q2-c', text: 'Sadece sizin bildiğiniz rastgele bir ifade' },
        ],
        correctOptionId: 'password-security-q2-a',
        explanation: 'Kişisel bilgiler içeren kısa parolalar daha kolay tahmin edilebilir.',
      },
      {
        id: 'password-security-q3',
        question: 'Bir hizmette veri sızıntısı yaşanırsa hangi hesaplar daha fazla risk altındadır?',
        options: [
          { id: 'password-security-q3-a', text: 'Aynı parolayı paylaşan diğer hesaplar' },
          { id: 'password-security-q3-b', text: 'İnternete hiç bağlanmayan cihazlar' },
          { id: 'password-security-q3-c', text: 'Sadece kapalı hesaplar' },
        ],
        correctOptionId: 'password-security-q3-a',
        explanation: 'Parola tekrar kullanımı, bir sızıntının etkisini başka hesaplara da taşır.',
      },
    ],
  },
  {
    id: 'public-wifi',
    title: 'Ortak Wi-Fi Kullanımı',
    description: 'Açık ağlarda daha güvenli gezinmek için dikkat edilmesi gerekenleri öğrenin.',
    durationMinutes: 4,
    difficulty: 'intermediate',
    contentSections: [
      {
        id: 'public-wifi-network-check',
        title: 'Ağ Seçimini Doğrulama',
        body: 'Kafe, havaalanı veya otel gibi yerlerde benzer isimli sahte ağlar oluşturulabilir. Ağa bağlanmadan önce doğru ağ adını işletmeden teyit etmek ve otomatik bağlanma ayarlarını kapalı tutmak daha güvenlidir.',
      },
      {
        id: 'public-wifi-sensitive-actions',
        title: 'Hassas İşlemlerden Kaçınma',
        body: 'Ortak ağlarda bankacılık, şifre değiştirme veya kritik hesap işlemleri gibi hassas aktivitelerden mümkünse kaçının. Mecbursanız resmi uygulama kullanın, bağlantının güvenli olduğundan emin olun ve işlem sonrasında oturumu kapatın.',
      },
    ],
    quizQuestions: [
      {
        id: 'public-wifi-q1',
        question: 'Ortak Wi-Fi ağına bağlanmadan önce ne yapılmalıdır?',
        options: [
          { id: 'public-wifi-q1-a', text: 'Ağ adını işletmeden doğrulamak' },
          { id: 'public-wifi-q1-b', text: 'Gördüğünüz ilk ağa bağlanmak' },
          { id: 'public-wifi-q1-c', text: 'Şifresiz ağların daha güvenli olduğunu düşünmek' },
        ],
        correctOptionId: 'public-wifi-q1-a',
        explanation: 'Sahte ağlara bağlanmamak için resmi ağ adı doğrulanmalıdır.',
      },
      {
        id: 'public-wifi-q2',
        question: 'Açık bir ağdayken hangi işlem daha risklidir?',
        options: [
          { id: 'public-wifi-q2-a', text: 'Hava durumuna bakmak' },
          { id: 'public-wifi-q2-b', text: 'Harita uygulamasını açmak' },
          { id: 'public-wifi-q2-c', text: 'Bankacılık hesabına giriş yapmak' },
        ],
        correctOptionId: 'public-wifi-q2-c',
        explanation: 'Finansal ve hassas işlemler ortak ağlarda ek risk taşır.',
      },
      {
        id: 'public-wifi-q3',
        question: 'Aşağıdakilerden hangisi ortak ağlarda iyi bir alışkanlıktır?',
        options: [
          { id: 'public-wifi-q3-a', text: 'Otomatik bağlanmayı açık bırakmak' },
          { id: 'public-wifi-q3-b', text: 'İşiniz bitince oturumu kapatmak' },
          { id: 'public-wifi-q3-c', text: 'Her sayfada kişisel bilgi girmek' },
        ],
        correctOptionId: 'public-wifi-q3-b',
        explanation: 'Oturumu kapatmak ve açık bağlantıları sonlandırmak güvenlik riskini azaltır.',
      },
    ],
  },
  {
    id: 'mobile-permissions',
    title: 'Mobil Uygulama İzinleri',
    description: 'Telefonunuzdaki uygulama izinlerini daha bilinçli yönetmenin yollarını keşfedin.',
    durationMinutes: 5,
    difficulty: 'beginner',
    contentSections: [
      {
        id: 'mobile-permissions-why-it-matters',
        title: 'İzinler Neden Önemlidir?',
        body: 'Konum, kamera, mikrofon ve rehber gibi izinler uygulamalara geniş erişim sağlar. Bir uygulama temel işleviyle ilgisiz bir izin istiyorsa bu durumu tekrar değerlendirmek gerekir.',
      },
      {
        id: 'mobile-permissions-review',
        title: 'Düzenli Gözden Geçirme',
        body: 'Kullandığınız uygulamaların izinlerini belli aralıklarla kontrol etmek iyi bir alışkanlıktır. Artık kullanmadığınız uygulamaları silmek ve gerekli olmayan izinleri kapatmak gereksiz veri paylaşımını azaltır.',
      },
    ],
    quizQuestions: [
      {
        id: 'mobile-permissions-q1',
        question: 'Bir uygulama işleviyle ilgisiz bir izin isterse ne yapılmalıdır?',
        options: [
          { id: 'mobile-permissions-q1-a', text: 'İzni hemen vermek' },
          { id: 'mobile-permissions-q1-b', text: 'İznin gerçekten gerekli olup olmadığını değerlendirmek' },
          { id: 'mobile-permissions-q1-c', text: 'Telefonu yeniden başlatmak' },
        ],
        correctOptionId: 'mobile-permissions-q1-b',
        explanation: 'İzin talebinin uygulamanın temel işleviyle uyumlu olup olmadığı kontrol edilmelidir.',
      },
      {
        id: 'mobile-permissions-q2',
        question: 'Aşağıdakilerden hangisi daha güvenli bir alışkanlıktır?',
        options: [
          { id: 'mobile-permissions-q2-a', text: 'Tüm uygulamalara tüm izinleri vermek' },
          { id: 'mobile-permissions-q2-b', text: 'İzinleri düzenli aralıklarla gözden geçirmek' },
          { id: 'mobile-permissions-q2-c', text: 'Kullanmadığınız uygulamaları telefonda tutmak' },
        ],
        correctOptionId: 'mobile-permissions-q2-b',
        explanation: 'Düzenli kontrol, gereksiz erişimleri azaltmaya yardımcı olur.',
      },
      {
        id: 'mobile-permissions-q3',
        question: 'Kullanmadığınız uygulamalar için en doğru yaklaşım nedir?',
        options: [
          { id: 'mobile-permissions-q3-a', text: 'Yüklü bırakıp tüm izinleri açık tutmak' },
          { id: 'mobile-permissions-q3-b', text: 'Silmek veya izinlerini kapatmak' },
          { id: 'mobile-permissions-q3-c', text: 'Sadece bildirimlerini kapatmak' },
        ],
        correctOptionId: 'mobile-permissions-q3-b',
        explanation: 'Kullanılmayan uygulamaları kaldırmak veya erişimlerini sınırlamak iyi bir güvenlik adımıdır.',
      },
    ],
  },
  {
    id: 'social-engineering',
    title: 'Sosyal Mühendislik',
    description: 'İkna ve manipülasyon tekniklerine karşı daha hazırlıklı olmayı öğrenin.',
    durationMinutes: 7,
    difficulty: 'intermediate',
    contentSections: [
      {
        id: 'social-engineering-common-tactics',
        title: 'Sık Kullanılan Taktikler',
        body: 'Sosyal mühendislik saldırıları çoğu zaman güven oluşturma, korkutma veya merak uyandırma gibi duyguları hedef alır. Saldırganlar telefon, mesaj veya sosyal medya üzerinden kendilerini güvenilir biri gibi tanıtabilir.',
      },
      {
        id: 'social-engineering-boundaries',
        title: 'Sınır Koyma ve Doğrulama',
        body: 'Bir kişi sizden acil şekilde bilgi, kod veya para transferi istiyorsa talebi bağımsız kanaldan doğrulamak önemlidir. Baskı altında karar vermek yerine kısa bir duraklama yapıp kontrol etmek çoğu riski azaltır.',
      },
    ],
    quizQuestions: [
      {
        id: 'social-engineering-q1',
        question: 'Sosyal mühendislik saldırılarında en sık hedeflenen unsur nedir?',
        options: [
          { id: 'social-engineering-q1-a', text: 'İnsanların güveni ve dikkati' },
          { id: 'social-engineering-q1-b', text: 'Telefon bataryası' },
          { id: 'social-engineering-q1-c', text: 'Ekran parlaklığı ayarı' },
        ],
        correctOptionId: 'social-engineering-q1-a',
        explanation: 'Bu saldırılar teknik açıktan çok insan davranışlarını hedef alır.',
      },
      {
        id: 'social-engineering-q2',
        question: 'Birisi kendini kurum çalışanı gibi tanıtıp sizden kod isterse ne yapmalısınız?',
        options: [
          { id: 'social-engineering-q2-a', text: 'Kodu hemen paylaşmak' },
          { id: 'social-engineering-q2-b', text: 'Talebi resmi kanaldan doğrulamak' },
          { id: 'social-engineering-q2-c', text: 'Mesajı arkadaşlarınıza iletmek' },
        ],
        correctOptionId: 'social-engineering-q2-b',
        explanation: 'Hassas bilgi ve doğrulama kodları bağımsız bir kanaldan teyit edilmeden paylaşılmamalıdır.',
      },
      {
        id: 'social-engineering-q3',
        question: 'Aşağıdakilerden hangisi daha güvenli bir davranıştır?',
        options: [
          { id: 'social-engineering-q3-a', text: 'Acil baskı altında hızlı karar vermek' },
          { id: 'social-engineering-q3-b', text: 'Durup isteğin mantıklı olup olmadığını değerlendirmek' },
          { id: 'social-engineering-q3-c', text: 'Kimlik doğrulama kodunu paylaşmak' },
        ],
        correctOptionId: 'social-engineering-q3-b',
        explanation: 'Kısa bir duraklama ve doğrulama adımı sosyal mühendislik riskini ciddi biçimde azaltır.',
      },
    ],
  },
];

export function getEducationModuleById(moduleId: string) {
  return educationModules.find((module) => module.id === moduleId);
}
