export interface DraftDocument {
  id: string;
  title: string;
  prompt: string;
  format: 'changelog' | 'release-note' | 'newsletter' | 'blog-post';
  content: string;
  timestamp: string;
  tone: 'professional' | 'friendly' | 'casual' | 'technical';
}

export interface TemplateType {
  id: 'changelog' | 'release-note' | 'newsletter' | 'blog-post';
  name: string;
  icon: string;
  description: string;
  examplePrompt: string;
}

export interface UseCaseInfo {
  id: string;
  title: string;
  heading: string;
  items: string[];
  examplePrompt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
