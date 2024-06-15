import { ChartRPM } from "@/Components/Charts/ChartRPM";
import { ChartTPM } from "@/Components/Charts/ChartTPM";
import Rpm90thPerc from "@/Components/Charts/Rpm90thPerc";
import Tpm90thPerc from "@/Components/Charts/Tpm90thPerc";

import {
  getRPM90thPercentileData,
  getRPMData,
  getTPM90thPercentileData,
  getTPMData,
} from "@/lib/helpers";
import {
  RPM90thPercentileRecord,
  RPMRecord,
  TPM90thPercentileRecord,
  TPMRecord,
} from "@/lib/types";

const HomePage = async () => {
  let rpmData: RPMRecord[] = [];
  let tpmData: TPMRecord[] = [];
  let rpm90thPercentile: RPM90thPercentileRecord = {
    percentile_90th_RPM_gpt4: 0,
  };
  let tpm90thPercentile: TPM90thPercentileRecord = {
    percentile_90th_TPM_gpt4: 0,
  };

  try {
    [rpmData, tpmData, rpm90thPercentile, tpm90thPercentile] =
      await Promise.all([
        getRPMData(),
        getTPMData(),
        getRPM90thPercentileData(),
        getTPM90thPercentileData(),
      ]);
  } catch (error) {
    console.error("Error fetching data for the page", error);
  }

  return (
    <div>
      <ChartRPM data={rpmData} />
      <ChartTPM data={tpmData} />

      <div className="flex justify-between mt-4">
        <Rpm90thPerc percentile_90th_RPM_gpt4={rpm90thPercentile.percentile_90th_RPM_gpt4} />
        <Tpm90thPerc percentile_90th_TPM_gpt4={tpm90thPercentile.percentile_90th_TPM_gpt4} />
      </div>
    </div>
  );
};

export default HomePage;
