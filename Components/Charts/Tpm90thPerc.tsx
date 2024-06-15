import React from 'react';
import { TPM90thPercentileRecord } from '@/lib/types';

export function Tpm90thPerc({ percentile_90th_TPM_gpt4 }: TPM90thPercentileRecord) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">TPM 90th Percentile (gpt-4 Family)</h3>
      <p className="text-4xl font-bold text-indigo-600">{percentile_90th_TPM_gpt4}</p>
    </div>
  );
};

export default Tpm90thPerc;
