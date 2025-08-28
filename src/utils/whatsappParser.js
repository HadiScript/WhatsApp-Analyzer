import {
  DEFAULT_WORK_KEYWORDS,
  DEFAULT_MEETING_KEYWORDS,
  WHATSAPP_PATTERNS,
  ACTIVITY_CATEGORIES,
  PRIORITY_LEVELS,
} from "./constants.js";

export class WhatsAppParser {
  constructor(customWorkKeywords = [], customMeetingKeywords = []) {
    this.workKeywords = [...DEFAULT_WORK_KEYWORDS, ...customWorkKeywords];
    this.meetingKeywords = [
      ...DEFAULT_MEETING_KEYWORDS,
      ...customMeetingKeywords,
    ];
  }

  parseChat(text) {
    const lines = text.split("\n");
    const activities = [];

    lines.forEach((line, index) => {
      if (!line.trim()) return;

      const parsed = this.parseLine(line);
      if (parsed && this.isWorkRelated(parsed.message)) {
        activities.push({
          ...parsed,
          id: index,
          category: this.categorizeMessage(parsed.message),
          priority: this.getPriority(parsed.message),
          isMeeting: this.isMeetingRelated(parsed.message),
        });
      }
    });

    return {
      activities,
      summary: this.generateSummary(activities),
    };
  }

  parseLine(line) {
    for (const pattern of WHATSAPP_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        const [, date, time, sender, message] = match;
        return {
          date: this.normalizeDate(date),
          time: time.trim(),
          sender: sender.trim(),
          message: message.trim(),
        };
      }
    }
    return null;
  }

  normalizeDate(dateStr) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      let [day, month, year] = parts;

      // Handle 2-digit years
      if (year.length === 2) {
        year = "20" + year;
      }

      // Ensure 2-digit day and month
      day = day.padStart(2, "0");
      month = month.padStart(2, "0");

      return `${day}/${month}/${year}`;
    }
    return dateStr;
  }

  isWorkRelated(message) {
    const messageWords = message.toLowerCase();
    return this.workKeywords.some((keyword) =>
      messageWords.includes(keyword.toLowerCase())
    );
  }

  isMeetingRelated(message) {
    const messageWords = message.toLowerCase();
    return this.meetingKeywords.some((keyword) =>
      messageWords.includes(keyword.toLowerCase())
    );
  }

  categorizeMessage(message) {
    const msg = message.toLowerCase();

    if (
      msg.includes("meeting") ||
      msg.includes("call") ||
      msg.includes("zoom")
    ) {
      return ACTIVITY_CATEGORIES.MEETING;
    } else if (
      msg.includes("completed") ||
      msg.includes("done") ||
      msg.includes("finished")
    ) {
      return ACTIVITY_CATEGORIES.TASK_COMPLETED;
    } else if (
      msg.includes("bug") ||
      msg.includes("fix") ||
      msg.includes("issue")
    ) {
      return ACTIVITY_CATEGORIES.BUG_ISSUE;
    } else if (
      msg.includes("feature") ||
      msg.includes("development") ||
      msg.includes("coding")
    ) {
      return ACTIVITY_CATEGORIES.DEVELOPMENT;
    } else if (
      msg.includes("review") ||
      msg.includes("testing") ||
      msg.includes("test")
    ) {
      return ACTIVITY_CATEGORIES.REVIEW_TESTING;
    } else if (
      msg.includes("deploy") ||
      msg.includes("release") ||
      msg.includes("launch")
    ) {
      return ACTIVITY_CATEGORIES.DEPLOYMENT;
    } else if (
      msg.includes("planning") ||
      msg.includes("design") ||
      msg.includes("requirement")
    ) {
      return ACTIVITY_CATEGORIES.PLANNING;
    } else {
      return ACTIVITY_CATEGORIES.GENERAL;
    }
  }

  getPriority(message) {
    const msg = message.toLowerCase();

    if (
      msg.includes("urgent") ||
      msg.includes("asap") ||
      msg.includes("critical")
    ) {
      return PRIORITY_LEVELS.HIGH;
    } else if (msg.includes("important") || msg.includes("priority")) {
      return PRIORITY_LEVELS.MEDIUM;
    } else {
      return PRIORITY_LEVELS.LOW;
    }
  }

  generateSummary(activities) {
    const participants = [...new Set(activities.map((a) => a.sender))];
    const categories = {};
    const priorities = {};
    const dates = {};

    activities.forEach((activity) => {
      // Count by category
      categories[activity.category] = (categories[activity.category] || 0) + 1;

      // Count by priority
      priorities[activity.priority] = (priorities[activity.priority] || 0) + 1;

      // Count by date
      dates[activity.date] = (dates[activity.date] || 0) + 1;
    });

    const sortedDates = Object.keys(dates).sort();

    return {
      totalActivities: activities.length,
      meetings: activities.filter((a) => a.isMeeting).length,
      workItems: activities.filter((a) => !a.isMeeting).length,
      participants: participants.length,
      participantsList: participants,
      categories,
      priorities,
      dateRange:
        sortedDates.length > 0
          ? {
              start: sortedDates[0],
              end: sortedDates[sortedDates.length - 1],
            }
          : null,
      mostActiveDate: Object.entries(dates).sort(([, a], [, b]) => b - a)[0],
      topContributor: Object.entries(
        activities.reduce((acc, activity) => {
          acc[activity.sender] = (acc[activity.sender] || 0) + 1;
          return acc;
        }, {})
      ).sort(([, a], [, b]) => b - a)[0],
    };
  }
}
