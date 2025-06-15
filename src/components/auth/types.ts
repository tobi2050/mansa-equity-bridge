
export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  organizationType: string;
  investmentMotivation: string;
  industryPreferences: { value: string; label: string }[];
  defaultContributionMode: string;
}
