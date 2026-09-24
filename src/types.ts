// Portfolio Types for Aaron Mutua

export type ItemRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface DevItem {
  id: string;
  name: string;
  rarity: ItemRarity;
  category: 'Compiler & Low-Level' | 'Cloud & DevOps' | 'AI & ML Core' | 'Backend & DB' | 'Weapon of Choice';
  icon: string;
  level: number;
  stats: {
    label: string;
    value: string;
  }[];
  lore: string;
  unlocked: boolean;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'DevOps & Queues' | 'Testing & Tools' | string;
  subcategory?: string;
  level: number;
  tier: 'Mastering' | 'Training Active' | 'Proficient' | 'Target Objective';
  description: string;
  tags: string[];
  icon: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'Tech Stack' | 'C & Systems' | 'DevOps & Cloud' | 'AI & Machine Learning' | 'Backend & Databases' | 'Frontend & Interaction' | string;
  level: number; // 1 - 100
  tier: 'Mastering' | 'Training Active' | 'Proficient' | 'Target Objective';
  description: string;
  tags: string[];
  icon: string;
}

export interface QuestItem {
  id: string;
  title: string;
  type: 'Main Quest' | 'Raid Milestone' | 'Skill Quest' | 'Cert Quest';
  status: 'In Progress' | 'Completed' | 'Upcoming Boss';
  progressPct: number;
  xpReward: number;
  badge: string;
  objective: string;
  deliverables: string[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  tagline: string;
  category: 'Systems Overhaul' | 'Healthcare AI' | 'DevOps & Cloud' | 'Enterprise Infrastructure' | 'Geospatial AI & Infrastructure' | 'Civic & Infrastructure AI';
  status: 'Active Overhaul' | 'Production / Hackathon' | 'Completed Attachment' | 'Active Development' | 'Ongoing Project';
  techStack: string[];
  summary: string;
  problemStatement: string;
  solutionArchitecture: string;
  keyFeatures: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  gameLootUnlocked?: string;
  metrics?: { label: string; value: string }[];
}

export interface VenevaOverhaulSpec {
  legacyFlaws: {
    title: string;
    flawDescription: string;
    riskSeverity: 'Critical' | 'High' | 'Moderate';
    solutionIn2: string;
  }[];
  languageComparison: {
    feature: string;
    legacy: string;
    cCore: string;
    jsTsAlternative: string;
    winner: string;
  }[];
  authRoadmap: {
    phase: string;
    title: string;
    description: string;
    tech: string;
  }[];
  interactiveFeatures: string[];
}

export interface TerminalLog {
  id: string;
  command: string;
  output: string;
  timestamp: string;
  type: 'command' | 'system' | 'success' | 'error' | 'easteregg';
}

export interface EducationExperience {
  institution: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  type: 'education' | 'experience';
}

export interface Certification {
  id: string;
  title: string;
  issuer: 'Cisco Networking Academy' | 'IBM' | 'Power Learn Project' | 'Microsoft Azure (Aspiring)';
  issuerShort: 'Cisco' | 'IBM' | 'PLP' | 'Microsoft';
  status: 'Verified & Active' | 'Target Objective';
  dateEarned?: string;
  description: string;
  skillsVerified: string[];
  rarity: ItemRarity;
  badgeIcon: string;
  level: number;
}

// Preserve existing legacy types if any service references them
export * from './types-legacy';
