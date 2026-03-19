export interface AnalysisResult {
  basic_info: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  career_summary: {
    work_years: number;
    education: string;
    expect_salary?: string;
  };
  skills: string[];
  project_experience: Array<{
    name: string;
    role: string;
    summary: string;
  }>;
  match_score: number;
  analysis_report: {
    advantages: string[];
    disadvantages: string[];
    suggestion: string;
  };
}
