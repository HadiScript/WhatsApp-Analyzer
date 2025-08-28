export class CSVExporter {
  static generateCSV(activities, summary) {
    const headers = [
      "Date",
      "Time",
      "Sender",
      "Category",
      "Priority",
      "Is Meeting",
      "Message",
    ];

    const rows = activities.map((activity) => [
      activity.date,
      activity.time,
      activity.sender,
      activity.category,
      activity.priority,
      activity.isMeeting ? "Yes" : "No",
      activity.message.replace(/"/g, '""'), // Escape quotes
    ]);

    // Add summary at the end
    const summaryRows = [
      [""],
      ["=== SUMMARY ==="],
      ["Total Activities", summary.totalActivities],
      ["Meetings", summary.meetings],
      ["Work Items", summary.workItems],
      ["Participants", summary.participants],
      [
        "Date Range",
        summary.dateRange
          ? `${summary.dateRange.start} to ${summary.dateRange.end}`
          : "N/A",
      ],
      [""],
      ["=== BY CATEGORY ==="],
      ...Object.entries(summary.categories).map(([category, count]) => [
        category,
        count,
      ]),
      [""],
      ["=== BY PRIORITY ==="],
      ...Object.entries(summary.priorities).map(([priority, count]) => [
        priority,
        count,
      ]),
    ];

    const allRows = [headers, ...rows, ...summaryRows];

    return allRows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  }

  static downloadCSV(csvContent, filename = "whatsapp-analysis.csv") {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  static generateJSONReport(activities, summary) {
    return JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        summary,
        activities,
      },
      null,
      2
    );
  }

  static downloadJSON(data, filename = "whatsapp-analysis.json") {
    const jsonContent =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
}
