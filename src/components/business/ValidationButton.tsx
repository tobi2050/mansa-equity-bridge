
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface ValidationButtonProps {
  businessId: string;
}

export const ValidationButton = ({ businessId }: ValidationButtonProps) => {
  const { authState } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [profileMode, setProfileMode] = useState<'investing' | 'donating' | 'supporting' | undefined>(undefined);

  const userId = authState.userId;

  const { data: profile } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('default_contribution_mode')
        .eq('id', userId)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (profile) {
      setProfileMode(profile.default_contribution_mode);
    }
  }, [profile]);

  const { data: validationData, isLoading: isLoadingValidation } = useQuery({
    queryKey: ['businessValidation', businessId],
    queryFn: async () => {
      const { count, error: countError } = await supabase
        .from('business_validations')
        .select('*', { count: 'exact', head: true })
        .eq('business_id', businessId);

      if (countError) throw countError;

      let userHasValidated = false;
      if (userId) {
        const { data: userValidation, error: userValidationError } = await supabase
          .from('business_validations')
          .select('user_id')
          .eq('business_id', businessId)
          .eq('user_id', userId)
          .maybeSingle();
        
        if (userValidationError) {
          throw userValidationError;
        }
        userHasValidated = !!userValidation;
      }
      
      return { totalValidations: count ?? 0, userHasValidated };
    },
    enabled: !!businessId,
  });

  const addValidationMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !businessId) throw new Error('User or business not found');
      const { error } = await supabase.from('business_validations').insert({ business_id: businessId, user_id: userId });
      if (error) {
        if (error.code === '23505') { // unique constraint violation
          throw new Error("You have already validated this business.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessValidation', businessId] });
      toast({ title: 'Business Validated!', description: 'Thank you for your support.' });
    },
    onError: (error) => {
      toast({ title: 'Validation Failed', description: error.message, variant: 'destructive' });
    }
  });

  const removeValidationMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !businessId) throw new Error('User or business not found');
      const { error } = await supabase.from('business_validations').delete().match({ business_id: businessId, user_id: userId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessValidation', businessId] });
      toast({ title: 'Validation Removed' });
    },
    onError: (error) => {
      toast({ title: 'Failed to Remove Validation', description: error.message, variant: 'destructive' });
    }
  });

  if (isLoadingValidation) {
    return <Skeleton className="h-9 w-32" />;
  }

  if (profileMode !== 'supporting') {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Eye className="h-4 w-4" />
        <span>{validationData?.totalValidations ?? 0} Validations</span>
      </div>
    );
  }

  if (validationData?.userHasValidated) {
    return (
      <Button variant="outline" size="sm" onClick={() => removeValidationMutation.mutate()} disabled={removeValidationMutation.isPending}>
        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
        Validated ({validationData.totalValidations})
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={() => addValidationMutation.mutate()} disabled={addValidationMutation.isPending}>
      <Eye className="h-4 w-4 mr-2" />
      Validate ({validationData?.totalValidations ?? 0})
    </Button>
  );
};
