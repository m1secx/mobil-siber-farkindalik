import type { MailboxScenario } from './types';

export const mailboxScenario: MailboxScenario = {
  id: 'phishing-mailbox',
  title: 'Gelen Kutusu Analizi',
  description:
    'Aşağıdaki e-postaları inceleyin. Hangilerinin kimlik avı (phishing) olduğunu tespit etmeye çalışın. Her e-postada şüpheli göstergeleri dikkatlice değerlendirin.',
  emails: [
    {
      id: 'email-1',
      sender: 'Banka Güvenlik Ekibi',
      senderEmail: 'guvenlik@banka-guvenlik.net',
      subject: 'Hesabınız Askıya Alındı - Hemen Onaylayın',
      receivedAt: 'Bugün 09:12',
      body:
        'Değerli Müşterimiz,\n\nHesabınızda olağandışı aktivite tespit edildi. Hesabınızın askıya alınmaması için 24 saat içinde bilgilerinizi güncellemeniz gerekmektedir.\n\nHemen onaylamak için tıklayın: [Hesap Onayla]\n\nSaygılarımızla,\nBanka Güvenlik Ekibi',
      isPhishing: true,
      indicators: [
        {
          id: 'ind-1-1',
          label: 'Şüpheli Gönderen Adresi',
          description:
            'Resmi banka adresleri genellikle kurumsal alan adı kullanır. "banka-guvenlik.net" gibi benzer ama farklı alan adları şüpheli olabilir.',
        },
        {
          id: 'ind-1-2',
          label: 'Acil Eylem Baskısı',
          description:
            '"24 saat içinde" gibi acil süreler kullanıcıyı paniğe düşürüp hemen tıklamasını sağlamak için kullanılır.',
        },
        {
          id: 'ind-1-3',
          label: 'Genel Hitap',
          description:
            'Resmi kurumlar müşterilerine isim veya özel bilgilerle hitap eder. "Değerli Müşterimiz" gibi genel hitaplar şüpheli olabilir.',
        },
      ],
      explanation:
        'Bu e-posta tipik bir kimlik avı saldırısıdır. Şüpheli alan adı, acil eylem baskısı ve genel hitap gibi göstergeler içerir. Resmi bankalar asla böyle e-postalarla hesap bilgisi talep etmez.',
    },
    {
      id: 'email-2',
      sender: 'Kargo Takip',
      senderEmail: 'takip@kargo-teslim.com',
      subject: 'Kargonuz Teslim Edilemedi - Ödeme Gerekli',
      receivedAt: 'Dün 16:40',
      body:
        'Merhaba,\n\nKargonuz teslim edilemedi. Kargonuzu almak için kargo ücreti ödemesi yapmanız gerekmektedir.\n\nÖdeme yapmak için: [Ödeme Yap]\n\nKargo Takip Sistemi',
      isPhishing: false,
      indicators: [],
      explanation:
        'Bu e-posta güvenilir görünmektedir. Kargo takip bildirimleri genellikle beklenen içeriklerdir ve şüpheli bağlantı içermez. Yine de bağlantılara tıklamadan önce gönderen adresini kontrol etmeniz iyi bir pratiktir.',
    },
    {
      id: 'email-3',
      sender: 'Sosyal Medya Destek',
      senderEmail: 'destek@sosyal-medya-yardim.org',
      subject: 'Hesabınız Hacklendi - Şifrenizi Değiştirin',
      receivedAt: 'Bugün 08:15',
      body:
        'Merhaba kullanıcı,\n\nHesabınızda şüpheli giriş tespit edildi. Hesabınızı kurtarmak için hemen şifrenizi değiştirmeniz gerekmektedir.\n\nŞifre değiştir: [Şifre Değiştir]\n\nSosyal Medya Destek Ekibi',
      isPhishing: false,
      indicators: [],
      explanation:
        'Bu e-posta güvenilir bir sosyal medya platformundan gelmektedir. Resmi alan adı kullanılmış ve hesap güvenliği bildirimi beklenen bir içeriktir. Yine de şifre değiştirme işlemlerini her zaman platformun resmi uygulamasından yapmanız önerilir.',
    },
    {
      id: 'email-4',
      sender: 'İnsan Kaynakları',
      senderEmail: 'ik@sirketiniz.com.tr',
      subject: 'Aylık Maaş Bordrosu - Mart 2026',
      receivedAt: 'Bugün 07:30',
      body:
        'Sayın Çalışan,\n\nMart 2026 dönemine ait maaş bordronuz hazırlanmıştır. Bordronuzu görüntülemek için şirket içi portal üzerinden giriş yapabilirsiniz.\n\nPortal: portal.sirketiniz.com.tr\n\nİnsan Kaynakları Departmanı',
      isPhishing: false,
      indicators: [
        {
          id: 'ind-4-1',
          label: 'Resmi Alan Adı',
          description:
            'E-posta şirketinizin resmi alan adından gönderilmiş. Bu güvenilir bir işarettir.',
        },
        {
          id: 'ind-4-2',
          label: 'Beklenen İçerik',
          description:
            'Maaş bordrosu bildirimleri genellikle düzenli aralıklarla gönderilir ve beklenen bir içeriktir.',
        },
        {
          id: 'ind-4-3',
          label: 'Doğrudan Portal Yönlendirmesi',
          description:
            'E-postada doğrudan bağlantı yerine portal adresi yazılmış. Bu, kullanıcıyı doğrudan resmi siteye yönlendirmek için güvenli bir yaklaşımdır.',
        },
      ],
      explanation:
        'Bu e-posta güvenilir görünmektedir. Resmi şirket alan adı kullanılmış, beklenen bir içerik sunulmuş ve doğrudan portal adresi belirtilmiş. Yine de portal adresini tarayıcınıza elle yazarak girmeniz en güvenli yöntemdir.',
    },
    {
      id: 'email-5',
      sender: 'Teknik Destek',
      senderEmail: 'teknik.destek@yazilim-sirketi.com',
      subject: 'Yazılım Lisansınızın Süresi Doluyor',
      receivedAt: 'Dün 14:20',
      body:
        'Merhaba,\n\nKullanmakta olduğunuz yazılım lisansınızın süresi 7 gün içinde dolacaktır. Lisansınızı yenilemek için lütfen aşağıdaki bağlantıdan ödeme yapın.\n\nLisans Yenile: [Ödeme Yap]\n\nTeknik Destek Ekibi',
      isPhishing: false,
      indicators: [],
      explanation:
        'Bu e-posta güvenilir bir yazılım şirketinden gelmektedir. Lisans süresi bildirimi beklenen bir içeriktir ve resmi alan adı kullanılmış. Yine de ödeme işlemlerini doğrudan yazılımın resmi web sitesinden yapmanız en güvenli yöntemdir.',
    },
  ],
};

export function getMailboxScenario(): MailboxScenario {
  return mailboxScenario;
}

export function getEmailById(
  emailId: string
): MailboxScenario['emails'][number] | undefined {
  return mailboxScenario.emails.find((email) => email.id === emailId);
}
