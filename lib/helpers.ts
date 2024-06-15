import { createClient } from "@clickhouse/client";
import { RPMRecord, TPMRecord, RPM90thPercentileRecord, TPM90thPercentileRecord } from "./types";



function creteClickHouseClient(){
  const ClickHouseClient = createClient({
    host: process.env.CLICKHOUSE_HOST,
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD,
    database: process.env.CLICKHOUSE_DATABASE,
    });
    return ClickHouseClient;

}

export async function getRPMData(): Promise<RPMRecord[]> {
  try {
    const clickHouseClient = creteClickHouseClient();
    const resultSet = await clickHouseClient.query({
      query: "SELECT request_model, CONCAT(SUBSTRING(start_time, 1, 10), ' ', SUBSTRING(start_time, 12, 5)) AS minute, COUNT(*) AS RPM FROM llm_analytics.requests GROUP BY request_model, minute LIMIT 10",
      format: "JSONEachRow",
    });

    const rows: RPMRecord[] = await resultSet.json();
    await clickHouseClient.close();

    return rows;
  } catch (error) {
    console.error('Error fetching RPM data', error);
    throw error;
  }
};

export async function getTPMData(): Promise<TPMRecord[]> {
  try {
    const clickHouseClient = creteClickHouseClient();
    const resultSet = await clickHouseClient.query({
      query: "SELECT request_model, CONCAT(SUBSTRING(start_time, 1, 10), ' ', SUBSTRING(start_time, 12, 5)) AS minute, SUM(total_token_count) AS TPM FROM llm_analytics.requests GROUP BY request_model, minute LIMIT 10",
      format: "JSONEachRow",
    });

    const rows: TPMRecord[] = await resultSet.json();
    await clickHouseClient.close();

    return rows;
  } catch (error) {
    console.error('Error fetching TPM data', error);
    throw error;
  }
};

export async function getRPM90thPercentileData(): Promise<RPM90thPercentileRecord> {
  try {
    const clickHouseClient = creteClickHouseClient();
    const resultSet = await clickHouseClient.query({
      query: "WITH RPM AS (SELECT CONCAT(SUBSTRING(start_time, 1, 10), ' ', SUBSTRING(start_time, 12, 5)) ,COUNT(*) AS num_of_requests From llm_analytics.requests WHERE request_model LIKE 'gpt-4%' GROUP BY CONCAT(SUBSTRING(start_time, 1, 10), ' ', SUBSTRING(start_time, 12, 5))) SELECT quantile(0.9)(num_of_requests) AS percentile_90th_RPM_gpt4 FROM RPM",
      format: "JSONEachRow",
    });

    const rows: RPM90thPercentileRecord[] = await resultSet.json();
    console.log("RPM 90th percentile Data", rows);
    await clickHouseClient.close();

    return rows[0];
  } catch (error) {
    console.error('Error fetching RPM 90th percentile Data', error);
    throw error;
  }
};

export async function getTPM90thPercentileData(): Promise<TPM90thPercentileRecord> {
  try {
    const clickHouseClient = creteClickHouseClient();
    const resultSet = await clickHouseClient.query({
      query: "WITH TPM AS (SELECT CONCAT(SUBSTRING(start_time, 1, 10), ' ', SUBSTRING(start_time, 12, 5)) ,SUM(total_token_count) AS amount_of_tokens From llm_analytics.requests WHERE request_model LIKE 'gpt-4%' GROUP BY CONCAT(SUBSTRING(start_time, 1, 10), ' ', SUBSTRING(start_time, 12, 5))) SELECT quantile(0.9)(amount_of_tokens) AS percentile_90th_TPM_gpt4 FROM TPM ",
      format: "JSONEachRow",
    });

    const rows: TPM90thPercentileRecord[] = await resultSet.json();
    console.log("TPM 90th percentile Data", rows);
    await clickHouseClient.close();

    return rows[0];
  } catch (error) {
    console.error('Error fetching TPM 90th percentile Data', error);
    throw error;
  }
};
