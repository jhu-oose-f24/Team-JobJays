"use client";

import React from "react";
import styles from "@/styles/dashboard.module.css";
import { useEmployer, useImpressionChartData } from "@/lib/api";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    impressions: {
        label: "Impressions",
    },
    profileImpressions: {
        label: "Profile",
        color: "hsl(var(--chart-1))",
    },
    jobImpressions: {
        label: "Jobs",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

const impressionData = [
    { date: "2024-04-01", profileImpressions: 222, jobImpressions: 150 },
    { date: "2024-04-02", profileImpressions: 97, jobImpressions: 180 },
    { date: "2024-04-03", profileImpressions: 167, jobImpressions: 120 },
    { date: "2024-04-04", profileImpressions: 242, jobImpressions: 260 },
    { date: "2024-04-05", profileImpressions: 373, jobImpressions: 290 },
    { date: "2024-04-06", profileImpressions: 301, jobImpressions: 340 },
    { date: "2024-04-07", profileImpressions: 245, jobImpressions: 180 },
    { date: "2024-04-08", profileImpressions: 409, jobImpressions: 320 },
    { date: "2024-04-09", profileImpressions: 59, jobImpressions: 110 },
    { date: "2024-04-10", profileImpressions: 261, jobImpressions: 190 },
    { date: "2024-04-11", profileImpressions: 327, jobImpressions: 350 },
    { date: "2024-04-12", profileImpressions: 292, jobImpressions: 210 },
    { date: "2024-04-13", profileImpressions: 342, jobImpressions: 380 },
    { date: "2024-04-14", profileImpressions: 137, jobImpressions: 220 },
    { date: "2024-04-15", profileImpressions: 120, jobImpressions: 170 },
    { date: "2024-04-16", profileImpressions: 138, jobImpressions: 190 },
    { date: "2024-04-17", profileImpressions: 446, jobImpressions: 360 },
    { date: "2024-04-18", profileImpressions: 364, jobImpressions: 410 },
    { date: "2024-04-19", profileImpressions: 243, jobImpressions: 180 },
    { date: "2024-04-20", profileImpressions: 89, jobImpressions: 150 },
    { date: "2024-04-21", profileImpressions: 137, jobImpressions: 200 },
    { date: "2024-04-22", profileImpressions: 224, jobImpressions: 170 },
    { date: "2024-04-23", profileImpressions: 138, jobImpressions: 230 },
    { date: "2024-04-24", profileImpressions: 387, jobImpressions: 290 },
    { date: "2024-04-25", profileImpressions: 215, jobImpressions: 250 },
    { date: "2024-04-26", profileImpressions: 75, jobImpressions: 130 },
    { date: "2024-04-27", profileImpressions: 383, jobImpressions: 420 },
    { date: "2024-04-28", profileImpressions: 122, jobImpressions: 180 },
    { date: "2024-04-29", profileImpressions: 315, jobImpressions: 240 },
    { date: "2024-04-30", profileImpressions: 454, jobImpressions: 380 },
    { date: "2024-05-01", profileImpressions: 165, jobImpressions: 220 },
    { date: "2024-05-02", profileImpressions: 293, jobImpressions: 310 },
    { date: "2024-05-03", profileImpressions: 247, jobImpressions: 190 },
    { date: "2024-05-04", profileImpressions: 385, jobImpressions: 420 },
    { date: "2024-05-05", profileImpressions: 481, jobImpressions: 390 },
    { date: "2024-05-06", profileImpressions: 498, jobImpressions: 520 },
    { date: "2024-05-07", profileImpressions: 388, jobImpressions: 300 },
    { date: "2024-05-08", profileImpressions: 149, jobImpressions: 210 },
    { date: "2024-05-09", profileImpressions: 227, jobImpressions: 180 },
    { date: "2024-05-10", profileImpressions: 293, jobImpressions: 330 },
    { date: "2024-05-11", profileImpressions: 335, jobImpressions: 270 },
    { date: "2024-05-12", profileImpressions: 197, jobImpressions: 240 },
    { date: "2024-05-13", profileImpressions: 197, jobImpressions: 160 },
    { date: "2024-05-14", profileImpressions: 448, jobImpressions: 490 },
    { date: "2024-05-15", profileImpressions: 473, jobImpressions: 380 },
    { date: "2024-05-16", profileImpressions: 338, jobImpressions: 400 },
    { date: "2024-05-17", profileImpressions: 499, jobImpressions: 420 },
    { date: "2024-05-18", profileImpressions: 315, jobImpressions: 350 },
    { date: "2024-05-19", profileImpressions: 235, jobImpressions: 180 },
    { date: "2024-05-20", profileImpressions: 177, jobImpressions: 230 },
    { date: "2024-05-21", profileImpressions: 82, jobImpressions: 140 },
    { date: "2024-05-22", profileImpressions: 81, jobImpressions: 120 },
    { date: "2024-05-23", profileImpressions: 252, jobImpressions: 290 },
    { date: "2024-05-24", profileImpressions: 294, jobImpressions: 220 },
    { date: "2024-05-25", profileImpressions: 201, jobImpressions: 250 },
    { date: "2024-05-26", profileImpressions: 213, jobImpressions: 170 },
    { date: "2024-05-27", profileImpressions: 420, jobImpressions: 460 },
    { date: "2024-05-28", profileImpressions: 233, jobImpressions: 190 },
    { date: "2024-05-29", profileImpressions: 78, jobImpressions: 130 },
    { date: "2024-05-30", profileImpressions: 340, jobImpressions: 280 },
    { date: "2024-05-31", profileImpressions: 178, jobImpressions: 230 },
    { date: "2024-06-01", profileImpressions: 178, jobImpressions: 200 },
    { date: "2024-06-02", profileImpressions: 470, jobImpressions: 410 },
    { date: "2024-06-03", profileImpressions: 103, jobImpressions: 160 },
    { date: "2024-06-04", profileImpressions: 439, jobImpressions: 380 },
    { date: "2024-06-05", profileImpressions: 88, jobImpressions: 140 },
    { date: "2024-06-06", profileImpressions: 294, jobImpressions: 250 },
    { date: "2024-06-07", profileImpressions: 323, jobImpressions: 370 },
    { date: "2024-06-08", profileImpressions: 385, jobImpressions: 320 },
    { date: "2024-06-09", profileImpressions: 438, jobImpressions: 480 },
    { date: "2024-06-10", profileImpressions: 155, jobImpressions: 200 },
    { date: "2024-06-11", profileImpressions: 92, jobImpressions: 150 },
    { date: "2024-06-12", profileImpressions: 492, jobImpressions: 420 },
    { date: "2024-06-13", profileImpressions: 81, jobImpressions: 130 },
    { date: "2024-06-14", profileImpressions: 426, jobImpressions: 380 },
    { date: "2024-06-15", profileImpressions: 307, jobImpressions: 350 },
    { date: "2024-06-16", profileImpressions: 371, jobImpressions: 310 },
    { date: "2024-06-17", profileImpressions: 275, jobImpressions: 300 },
];


const DashboardPage: React.FC = () => {
    const { EmployerProfile, isLoading, isError } = useEmployer();
    //TODO UNCOMMENT THIS
    // const { impressionData, isLoading: chartLoading, isError: chartError } =
    //     useImpressionChartData();
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("profileImpressions");

    const total = React.useMemo(() => {
        const safeImpressionData = impressionData || [];
        return {
            profileImpressions: safeImpressionData.reduce(
                (acc, curr) => acc + (curr.profileImpressions || 0),
                0
            ),
            jobImpressions: safeImpressionData.reduce(
                (acc, curr) => acc + (curr.jobImpressions || 0),
                0
            ),
        };
    }, [impressionData]);

    //TODO UNCOMMENT THIS
    // if (chartLoading) return <div>Loading...</div>;
    // if (chartError) return <div>Error loading chart data.</div>;
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading employer profile.</div>;

    return (
        <div>
            <header className={styles.dashboardHeader}>
                <h3>Hello, {EmployerProfile.name}</h3>
                <div className={styles.statsOverview}>
                    <div className={styles.statBox}>
                        <p>{EmployerProfile.jobPostsSize}</p>
                        <span>Jobs</span>
                    </div>
                    <div className={styles.statBox}>
                        <p>
                            {EmployerProfile.jobPosts.reduce(
                                (totalApplications, jobPost) =>
                                    totalApplications + (jobPost.numApplicants || 0),
                                0
                            )}
                        </p>
                        <span>Applicants</span>
                    </div>
                </div>
            </header>
            <div className={"py-5"}>
                <Card>
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>Bar Chart - Interactive</CardTitle>
                            <CardDescription>
                                Showing total Impressions for the last 3 months
                            </CardDescription>
                        </div>
                        <div className="flex">
                            {["profileImpressions", "jobImpressions"].map((key) => {
                                const chart = key as keyof typeof chartConfig;
                                return (
                                    <button
                                        key={chart}
                                        data-active={activeChart === chart}
                                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                        onClick={() => setActiveChart(chart)}
                                    >
                    <span className="text-xs text-muted-foreground">
                      {chartConfig[chart].label}
                    </span>
                                        <span className="text-lg font-bold leading-none sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                                    </button>
                                );
                            })}
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        {(!impressionData || impressionData.length === 0) ? (
                            <div className="flex h-[250px] items-center justify-center text-muted-foreground">
                                <p className="text-lg font-semibold">
                                    You do not have any impressions yet.
                                </p>
                            </div>
                        ) : (
                            <ChartContainer
                                config={chartConfig}
                                className="aspect-auto h-[250px] w-full"
                            >
                                <BarChart
                                    accessibilityLayer
                                    data={impressionData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        minTickGap={32}
                                        tickFormatter={(value) => {
                                            const date = new Date(value);
                                            return date.toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            });
                                        }}
                                    />
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent
                                                className="w-[150px]"
                                                nameKey="impressions"
                                                labelFormatter={(value) => {
                                                    return new Date(value).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    });
                                                }}
                                            />
                                        }
                                    />
                                    <Bar
                                        dataKey={activeChart}
                                        fill={`var(--color-${activeChart})`}
                                    />
                                </BarChart>
                            </ChartContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;




