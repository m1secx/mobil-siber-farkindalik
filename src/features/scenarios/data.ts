import type { MailboxScenario } from './types';

export const mailboxScenarios: MailboxScenario[] = [
  {
    id: 'mailbox-phishing-basics',
    moduleId: 'phishing-awareness',
    type: 'mailbox-phishing',
    title: 'Gelen Kutusunda Oltalamayı Yakala',
    description: 'Gelen kutusundaki mesajları inceleyip şüpheli olan e-postayı ayırt etmeye çalışın.',
    indicators: [
      {
        id: 'suspicious-domain',
        label: 'Şüpheli gönderen domaini',
        description: 'Resmi kuruma benziyor gibi görünse de email adresindeki domain farklı veya hatalı yazılmış olabilir.',
      },
      {
        id: 'urgency-pressure',
        label: 'Aciliyet baskısı',
        description: 'Kullanıcıyı hızlı karar vermeye zorlayan tehditkar veya panik oluşturucu ifadeler kullanılır.',
      },
      {
        id: 'fake-link',
        label: 'Sahte bağlantı',
        description: 'Mesaj içindeki bağlantı resmi siteye benziyor gibi görünse de farklı bir hedefe yönlendirebilir.',
      },
      {
        id: 'personal-info-request',
        label: 'Kişisel bilgi isteme',
        description: 'Şifre, kart bilgisi veya kimlik bilgisi gibi hassas veriler email üzerinden istenebilir.',
      },
      {
        id: 'brand-imitation',
        label: 'Marka taklidi',
        description: 'Bilinen kurumların adı, logosu veya dili taklit edilerek güven oluşturulmaya çalışılır.',
      },
    ],
    emails: [
      {
        id: 'email-bank-statement',
        senderName: 'Anadolu Bank',
        senderEmail: 'bildirim@anadolubank.com.tr',
        subject: 'Aylık hesap özetiniz hazır',
        preview: 'Hesap hareketlerinizi mobil uygulamadan veya internet şubesinden görüntüleyebilirsiniz.',
        time: '09:10',
        isPhishing: false,
        indicatorIds: [],
        explanation: 'Gönderen adresi kurumsal alan adıyla uyumlu ve mesaj kullanıcıyı acele ettirmeden resmi kanallara yönlendiriyor.',
      },
      {
        id: 'email-cargo-update',
        senderName: 'Jet Kargo',
        senderEmail: 'bilgi@jetkargo.com',
        subject: 'Gönderiniz dağıtıma çıktı',
        preview: 'Kargonuz bugün teslimata çıkarılmıştır. Teslim detaylarını uygulamadan takip edebilirsiniz.',
        time: '10:25',
        isPhishing: false,
        indicatorIds: [],
        explanation: 'Mesaj kısa ve bilgilendirici; kullanıcıdan şifre veya hassas bilgi istemiyor.',
      },
      {
        id: 'email-streaming-renewal',
        senderName: 'FilmPlus',
        senderEmail: 'destek@filmplus.com',
        subject: 'Aboneliğiniz yarın yenileniyor',
        preview: 'Plan değişikliği yapmak veya aboneliği yönetmek için resmi uygulamayı açabilirsiniz.',
        time: '11:05',
        isPhishing: false,
        indicatorIds: [],
        explanation: 'Mesaj bilgilendirme amaçlı ve kullanıcıyı doğrudan hassas işlem yapmaya zorlamıyor.',
      },
      {
        id: 'email-secure-account-warning',
        senderName: 'Güvenli Ödeme Merkezi',
        senderEmail: 'security@odeme-merkezidestek.com',
        subject: 'Hesabınız 30 dakika içinde askıya alınacak',
        preview: 'Kart erişiminizi korumak için hemen doğrulama yapın ve kişisel bilgilerinizi güncelleyin.',
        time: '11:42',
        isPhishing: true,
        indicatorIds: [
          'suspicious-domain',
          'urgency-pressure',
          'fake-link',
          'personal-info-request',
          'brand-imitation',
        ],
        explanation: 'Mesaj sahte bir kurum diliyle panik yaratıyor, acele ettiriyor ve kişisel bilgi doğrulaması istiyor. Gönderen domaini resmi bir ödeme kurumuna ait görünmüyor.',
      },
      {
        id: 'email-market-receipt',
        senderName: 'Şehir Market',
        senderEmail: 'fatura@sehirmarket.com',
        subject: 'Dijital fişiniz',
        preview: 'Bugünkü alışverişinize ait dijital fişi uygulama içinden görüntüleyebilirsiniz.',
        time: '12:15',
        isPhishing: false,
        indicatorIds: [],
        explanation: 'Mesaj beklenen bir alışveriş sonrası fiş bilgilendirmesi gibi görünüyor ve ekstra bilgi talep etmiyor.',
      },
    ],
    phishingEmailId: 'email-secure-account-warning',
    explanation: 'Bu senaryoda yalnızca bir email oltalama amaçlıdır. Doğru seçimi yapmak için gönderen adresi, aciliyet dili ve hassas bilgi talebine dikkat edin.',
  },
];

export function getScenarioByModuleId(moduleId: string) {
  return mailboxScenarios.find((scenario) => scenario.moduleId === moduleId);
}
