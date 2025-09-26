export interface ConfigData {
  general: {
    agentName: string;
    websiteDomain: string;
    language: string;
  };
  personality: {
    style: string;
    temperature: number;
    systemPrompt: string;
    customStyle: string;
  };
  behavior: {
    autoFAQ: boolean;
    bookMeetings: boolean;
    redirectToHuman: boolean;
    customRules: Array<{ condition: string; action: string; id: string }>;
  };
  content: {
    limitByCategory: boolean;
    allowedCategories: string[];
    excludedKeywords: string[];
    excludedPaths: string[];
  };
  chatFlow: {
    welcomeMessage: string;
    followUpPrompts: string[];
    autoReplyTimeout: string;
    fallbackMessage: string;
  };
  advanced: {
    llmModel: string;
    embeddingModel: string;
    maxTokens: number;
    maxMessageLength: number;
    webhookUrl: string;
  };
}

export interface TabConfig {
  id: string;
  label: string;
  icon: any;
  description: string;
}