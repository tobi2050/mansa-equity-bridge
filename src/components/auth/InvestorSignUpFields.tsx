
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { industryCategories } from "@/lib/constants";
import { SignUpFormData } from "./types";

interface InvestorSignUpFieldsProps {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
}

const InvestorSignUpFields = ({ formData, setFormData }: InvestorSignUpFieldsProps) => {
  return (
    <div className="space-y-6 p-4 bg-blue-50 rounded-lg border">
      <div>
        <Label>Your Organization Type</Label>
        <Select value={formData.organizationType} onValueChange={(value) => setFormData({...formData, organizationType: value})}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Individual">Individual</SelectItem>
            <SelectItem value="NGO">NGO</SelectItem>
            <SelectItem value="Charity">Charity</SelectItem>
            <SelectItem value="Investment Firm">Investment Firm</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Your Primary Motivation</Label>
        <Select value={formData.investmentMotivation} onValueChange={(value) => setFormData({...formData, investmentMotivation: value})}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ROI-focused">ROI-focused</SelectItem>
            <SelectItem value="Impact-focused">Impact-focused</SelectItem>
            <SelectItem value="Mixed">Mixed (ROI & Impact)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Industries of Interest (up to 3)</Label>
        <MultiSelect
          options={industryCategories}
          selected={formData.industryPreferences}
          onChange={(value) => setFormData({...formData, industryPreferences: value})}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">Select your preferred investment sectors.</p>
      </div>
      <div>
        <Label>Default Contribution Mode</Label>
        <Select value={formData.defaultContributionMode} onValueChange={(value) => setFormData({...formData, defaultContributionMode: value})}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="investing">Investing</SelectItem>
            <SelectItem value="donating">Donating</SelectItem>
            <SelectItem value="supporting">Supporting</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">This will be your default action on projects.</p>
      </div>
    </div>
  );
};

export default InvestorSignUpFields;
