export interface EmailScenarioIndicator {
  id: string;
  label: string;
  description: string;
}

export interface EmailScenario {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  receivedAt: string;
  isPhishing: boolean;
  indicators: EmailScenarioIndicator[];
  explanation: string;
}

export interface MailboxScenario {
  id: string;
  title: string;
  description: string;
  emails: EmailScenario[];
}
