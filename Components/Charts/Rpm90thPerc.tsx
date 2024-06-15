import React from 'react';
import { RPM90thPercentileRecord } from '@/lib/types';

function Rpm90thPerc({ percentile_90th_RPM_gpt4 }: RPM90thPercentileRecord) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">RPM 90th Percentile (gpt-4 Family)</h3>
      <p className="text-4xl font-bold text-indigo-600">{percentile_90th_RPM_gpt4}</p>
    </div>
  );
};

export default Rpm90thPerc;
