/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabType = 'home' | 'services' | 'about' | 'results' | 'contact';

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  roi: string;
  features: string[];
  metrics: string[];
}

export interface ResultCard {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  impactMetric: string;
  impactLabel: string;
  beforeText: string;
  afterText: string;
}

export interface AnalyticsMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  subtext: string;
  trend: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  business: string;
  projectType: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
  recommendedService?: string;
}
