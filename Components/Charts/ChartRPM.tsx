"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RPMRecord } from "@/lib/types";
import { parseISO, format, isValid } from "date-fns";

interface ChartRPMProps {
  data: RPMRecord[];
}

interface CombinedRecord {
  minute: string;
  [key: string]: any;
}

// Define a color palette
const colors = [
  "#8884d8",
  "#82ca9d",
  "#ff7300",
  "#d0ed57",
  "#a4de6c",
  "#8884d8",
  "#8dd1e1",
  "#ffc658",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#1f77b4",
];

export function ChartRPM({ data }: ChartRPMProps) {
  // Convert minute to Date and sort data by Date
  const sortedData = data
    .map((record) => {
      const dateObj = parseISO(record.minute);
      return {
        ...record,
        dateObj: isValid(dateObj) ? dateObj : new Date(NaN),
        formattedMinute: isValid(dateObj)
          ? format(dateObj, "yyyy-MM-dd HH:mm")
          : record.minute,
      };
    })
    .filter((record) => isValid(record.dateObj))
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  // Extract unique request_models
  const requestModels = Array.from(
    new Set(sortedData.map((record) => record.request_model))
  );

  // Aggregate data by minute and request_model
  const combinedData: CombinedRecord[] = [];
  sortedData.forEach((record) => {
    let existing = combinedData.find(
      (item) => item.minute === record.formattedMinute
    );
    if (!existing) {
      existing = { minute: record.formattedMinute };
      combinedData.push(existing);
    }
    existing[record.request_model] = parseInt(record.RPM); // Ensure RPM is a number
  });

  // Ensure all request models have a value for each minute
  combinedData.forEach((record) => {
    requestModels.forEach((model) => {
      if (!(model in record)) {
        record[model] = null;
      }
    });
  });

  // Map each request_model to a color
  const modelColorMap: { [key: string]: string } = {};
  requestModels.forEach((model, index) => {
    modelColorMap[model] = colors[index % colors.length];
  });

  return (
    <div>
      <h1>Requests Per Minute (RPM)</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={combinedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="minute"
            tickFormatter={(tick) => format(parseISO(tick), "HH:mm")}
            padding={{ left: 20, right: 20 }}
            angle={-45}
            textAnchor="end"
          />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              value,
              name === "RPM" ? "Requests per Minute" : name,
            ]}
            labelFormatter={(label) =>
              format(parseISO(label), "yyyy-MM-dd HH:mm")
            }
          />
          <Legend verticalAlign="top" height={36} />
          {requestModels.map((model) => (
            <Line
              key={model}
              type="monotone"
              dot={false}
              dataKey={model}
              name={model}
              stroke={modelColorMap[model]} // Assign unique color to each model
              strokeWidth={2} // Increase line thickness
              connectNulls={true} // Connect lines through null values
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
