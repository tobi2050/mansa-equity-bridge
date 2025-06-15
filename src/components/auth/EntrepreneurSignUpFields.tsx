
import React from 'react';
import { SignUpFormData } from "./types";

interface EntrepreneurSignUpFieldsProps {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
}

const EntrepreneurSignUpFields = ({ formData, setFormData }: EntrepreneurSignUpFieldsProps) => {
  return (
    <div className="space-y-4 p-4 bg-green-50 rounded-lg border">
      <p className="text-sm text-gray-600 mb-4">
        You'll be able to add your business details and phone number from your profile after signing up.
      </p>
    </div>
  );
};

export default EntrepreneurSignUpFields;
