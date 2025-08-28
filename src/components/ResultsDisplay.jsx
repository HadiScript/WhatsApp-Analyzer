import React from "react";
import {
  Download,
  BarChart3,
  Calendar,
  Users,
  MessageCircle,
  Clock,
} from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { CSVExporter } from "../utils/csvExporter";

const ResultsDisplay = ({ results }) => {
  const { activities, summary } = results;

  const handleDownloadCSV = () => {
    const csvContent = CSVExporter.generateCSV(activities, summary);
    CSVExporter.downloadCSV(csvContent);
  };

  const handleDownloadJSON = () => {
    const jsonContent = CSVExporter.generateJSONReport(activities, summary);
    CSVExporter.downloadJSON(jsonContent);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Download Actions */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Analysis Complete! 🎉
            </h3>
            <p className="text-gray-600 mt-1">
              Found {summary.totalActivities} work-related activities from{" "}
              {summary.participants} participants
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownloadJSON} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              JSON
            </Button>
            <Button onClick={handleDownloadCSV}>
              <Download className="w-4 h-4 mr-2" />
              Excel/CSV
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={MessageCircle}
          title="Total Activities"
          value={summary.totalActivities}
          color="blue"
        />
        <StatCard
          icon={Calendar}
          title="Meetings"
          value={summary.meetings}
          subtitle={`${(
            (summary.meetings / summary.totalActivities) *
            100
          ).toFixed(1)}% of activities`}
          color="green"
        />
        <StatCard
          icon={Users}
          title="Participants"
          value={summary.participants}
          subtitle={
            summary.topContributor ? `Top: ${summary.topContributor[0]}` : ""
          }
          color="purple"
        />
        <StatCard
          icon={Clock}
          title="Date Range"
          value={
            summary.dateRange
              ? Math.ceil(
                  (new Date(summary.dateRange.end) -
                    new Date(summary.dateRange.start)) /
                    (1000 * 60 * 60 * 24)
                )
              : 0
          }
          subtitle={
            summary.dateRange
              ? `${summary.dateRange.start} to ${summary.dateRange.end}`
              : "N/A"
          }
          color="orange"
        />
      </div>

      {/* Categories Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Activities by Category">
          <div className="space-y-3">
            {Object.entries(summary.categories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {category}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(count / summary.totalActivities) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Priority Distribution">
          <div className="space-y-3">
            {Object.entries(summary.priorities).map(([priority, count]) => {
              const colors = {
                High: "bg-red-600",
                Medium: "bg-yellow-600",
                Low: "bg-green-600",
              };
              return (
                <div
                  key={priority}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {priority} Priority
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[priority]}`}
                        style={{
                          width: `${(count / summary.totalActivities) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent Activities Table */}
      <Card
        title="Recent Activities"
        subtitle={`Showing latest ${Math.min(
          10,
          activities.length
        )} activities`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities
                .slice(-10)
                .reverse()
                .map((activity, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {activity.sender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          activity.category === "Meeting"
                            ? "bg-green-100 text-green-800"
                            : activity.category === "Development"
                            ? "bg-blue-100 text-blue-800"
                            : activity.category === "Bug/Issue"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {activity.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate">
                      {activity.message}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Participants List */}
      <Card
        title="Team Members"
        subtitle={`${summary.participants} active participants`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {summary.participantsList.map((participant) => {
            const participantActivities = activities.filter(
              (a) => a.sender === participant
            ).length;
            return (
              <div
                key={participant}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-900">{participant}</span>
                <span className="text-sm text-gray-500">
                  {participantActivities} activities
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
