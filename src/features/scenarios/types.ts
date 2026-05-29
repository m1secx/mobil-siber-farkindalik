export type ScenarioType = 'mailbox-phishing';

export type PhishingIndicator = {
  id: string;
  label: string;
  description: string;
};

export type MailboxEmail = {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  time: string;
  isPhishing: boolean;
  indicatorIds: string[];
  explanation: string;
};

export type MailboxScenario = {
  id: string;
  moduleId: string;
  type: ScenarioType;
  title: string;
  description: string;
  emails: MailboxEmail[];
  indicators: PhishingIndicator[];
  phishingEmailId: string;
  explanation: string;
};
