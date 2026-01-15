export enum Category {
  Execution = "Execution",
  Adoption = "Adoption",
  Data = "Data",
  Mindset = "Mindset"
}

export interface Question {
  id: number;
  category: Category;
  text: string;
  options: {
    score: number;
    text: string;
  }[];
}

export interface UserResults {
  rawScore: number;
  finalPercent: number;
  categoryScores: Record<Category, number>; // Average score per category (1-4)
}

export interface UserInfo {
  name: string;
  email: string;
  company: string;
}

export interface FeedbackContent {
  engine: string;
  barrier: string;
}
