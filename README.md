# Next.js Analytics Dashboard with ClickHouse Integration

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

This project is a single-page analytics dashboard for LLM-based applications, utilizing Next.js for the frontend and ClickHouse for the backend. The dashboard provides various data visualizations to represent requests and tokens usage statistics over time.

## Objective

The goal is to create a responsive and user-friendly analytics dashboard that integrates with a ClickHouse database to fetch and visualize data.

## Features

- **Requests Per Minute (RPM)**: A multiline chart showing the number of requests per minute for different LLM models.
- **Tokens Per Minute (TPM)**: A multiline chart showing the total number of tokens used per minute by different LLM models.
- **RPM 90th Percentile Per Model Family**: A card displaying the 90th percentile of the number of requests per minute for the gpt-4 model family.
- **TPM 90th Percentile Per Model Family**: A card displaying the 90th percentile of the number of tokens used per minute by the gpt-4 model family.
- **Date/Range Picker**: Allows users to define the timeframe for the visualizations.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`app/page.tsx\`. The page auto-updates as you edit the file.

This project uses [\`next/font\`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Installation and Setup

### Prerequisites

- Node.js
- npm or yarn

### Environment Variables

Set up the following environment variables in a \`.env.local\` file at the root of your project:

```env
CLICKHOUSE_HOST=<your_clickhouse_host>
CLICKHOUSE_USER=<your_clickhouse_user>
CLICKHOUSE_PASSWORD=<your_clickhouse_password>
CLICKHOUSE_DATABASE=<your_clickhouse_database>
```

### Installing Dependencies

```bash
npm install
# or
yarn install
```

## Usage

### Running the Application

```bash
npm run dev
# or
yarn dev
```

### API Endpoints

The backend API endpoints for data retrieval are implemented in Next.js. These endpoints fetch data from the ClickHouse database and provide it to the frontend for visualization.

## Data Visualization

- **Requests Per Minute (RPM)**: A multiline chart where each line represents an LLM model. The X-axis represents time, and the Y-axis represents the number of requests per minute.
- **Tokens Per Minute (TPM)**: A multiline chart where each line represents an LLM model. The X-axis represents time, and the Y-axis represents the total number of tokens used per minute.
- **RPM 90th Percentile Per Model Family**: A card displaying the 90th percentile of the number of requests per minute for the gpt-4 model family.
- **TPM 90th Percentile Per Model Family**: A card displaying the 90th percentile of the number of tokens used per minute by the gpt-4 model family.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **React**: A JavaScript library for building user interfaces.
- **Recharts**: A composable charting library built on React components.
- **ClickHouse**: A fast open-source columnar database management system for online analytical processing.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
