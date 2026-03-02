// types/index.ts

export interface Campaign {
  id: string;
  name: string;
  platform: 'snapchat' | 'tiktok';
  budget: number;
  status: 'active' | 'paused' | 'draft';
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  isActive: boolean;
}
