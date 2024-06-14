  export interface RPMRecord {
    request_model: string;
    minute: string;
    requests_per_minute: number;
  }

  export interface TPMRecord {
    request_model: string;
    minute: string;
    tokens_per_minute: number;
  }

  export interface RPM90thPercentileRecord {
    percentile_90th_RPM_gpt4: number;
  }

  export interface TPM90thPercentileRecord {
    percentile_90th_TPM_gpt4: number;
  }