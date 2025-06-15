
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUpFormData } from "./types";

interface EntrepreneurSignUpFieldsProps {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
}

const EntrepreneurSignUpFields = ({ formData, setFormData }: EntrepreneurSignUpFieldsProps) => {
  return (
    <div className="space-y-4 p-4 bg-green-50 rounded-lg border">
      <p className="text-sm text-gray-600 mb-4">
        You'll be able to add your business details from your profile after signing up.
      </p>
      <div>
        <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number*</Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          required
        />
      </div>
    </div>
  );
};

export default EntrepreneurSignUpFields;
