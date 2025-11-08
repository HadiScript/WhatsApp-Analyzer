import React, { useState } from "react";
import { Card, Button, Space, Typography, Statistic, Row, Col, Tabs, Table, Tag, Dropdown, message } from "antd";
import {
  DownloadOutlined,
  BarChartOutlined,
  CalendarOutlined,
  UserOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { CSVExporter } from "../utils/csvExporter";

const { Title, Text, Paragraph } = Typography;

const ResultsDisplay = ({ results }) => {
  const { activities, summary } = results;
  const [activeTab, setActiveTab] = useState("overview");

  const handleDownloadCSV = () => {
    const csvContent = CSVExporter.generateCSV(activities, summary);
    CSVExporter.downloadCSV(csvContent);
    message.success("CSV file downloaded successfully!");
  };

  const handleDownloadJSON = () => {
    const jsonContent = CSVExporter.generateJSONReport(activities, summary);
    CSVExporter.downloadJSON(jsonContent);
    message.success("JSON file downloaded successfully!");
  };

  const handleDownloadExcel = () => {
    message.info("Excel export coming soon!");
  };

  const exportMenuItems = [
    {
      key: "csv",
      label: "Export as CSV",
      icon: <FileTextOutlined />,
      onClick: handleDownloadCSV,
    },
    {
      key: "json",
      label: "Export as JSON",
      icon: <FileTextOutlined />,
      onClick: handleDownloadJSON,
    },
    {
      key: "excel",
      label: "Export as Excel",
      icon: <FileExcelOutlined />,
      onClick: handleDownloadExcel,
    },
  ];

  // Prepare table data
  const tableColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      width: 120,
      render: (date) => (
        <Text strong style={{ color: "#262626" }}>
          {date}
        </Text>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 100,
      render: (time) => <Text style={{ color: "#525252" }}>{time}</Text>,
    },
    {
      title: "Participant",
      dataIndex: "sender",
      key: "sender",
      filters: [...new Set(activities.map((a) => a.sender))].map((p) => ({
        text: p,
        value: p,
      })),
      onFilter: (value, record) => record.sender === value,
      width: 200,
      ellipsis: true,
      render: (sender) => (
        <Space size={4}>
          <UserOutlined style={{ color: "#737373", fontSize: 12 }} />
          <Text>{sender}</Text>
        </Space>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
      render: (message) => <Text style={{ color: "#525252" }}>{message}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 140,
      filters: [...new Set(activities.map((a) => a.category))].map((c) => ({
        text: c,
        value: c,
      })),
      onFilter: (value, record) => record.category === value,
      render: (category) => (
        <Tag
          style={{
            borderRadius: 4,
            border: "1px solid #d4d4d4",
            background: "#fafafa",
            color: "#262626",
          }}
        >
          {category}
        </Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "isMeeting",
      key: "isMeeting",
      width: 100,
      filters: [
        { text: "Work", value: false },
        { text: "Meeting", value: true },
      ],
      onFilter: (value, record) => record.isMeeting === value,
      render: (isMeeting) => (
        <Tag
          color={isMeeting ? "processing" : "default"}
          style={{
            borderRadius: 4,
            border: "1px solid #d4d4d4",
            background: isMeeting ? "#f0f0f0" : "#fafafa",
            color: "#262626",
          }}
        >
          {isMeeting ? "Meeting" : "Work"}
        </Tag>
      ),
    },
  ];

  const tableData = activities.map((activity, index) => ({
    key: index,
    ...activity,
  }));

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      {/* Header Card */}
      <Card
        style={{
          background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
          border: "none",
          borderRadius: 12,
        }}
        styles={{ body: { padding: 32 } }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: 0, color: "#ffffff" }}>
              Analysis Complete
            </Title>
            <Paragraph style={{ margin: "8px 0 0 0", color: "#d4d4d4", fontSize: 15 }}>
              Your chat analysis is ready. Review the insights below and export your data.
            </Paragraph>
          </Col>
          <Col>
            <Dropdown
              menu={{ items: exportMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Button
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
                style={{
                  background: "#ffffff",
                  color: "#262626",
                  border: "none",
                  height: 48,
                  padding: "0 32px",
                  fontWeight: 600,
                  borderRadius: 8,
                }}
              >
                Export Data
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #e5e5e5" }}
            styles={{ body: { padding: 24 } }}
          >
            <Statistic
              title={
                <Space size={8}>
                  <MessageOutlined style={{ color: "#525252" }} />
                  <Text style={{ color: "#737373", fontSize: 14 }}>Total Activities</Text>
                </Space>
              }
              value={summary.totalActivities}
              valueStyle={{ color: "#262626", fontWeight: 700, fontSize: 32 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #e5e5e5" }}
            styles={{ body: { padding: 24 } }}
          >
            <Statistic
              title={
                <Space size={8}>
                  <CalendarOutlined style={{ color: "#525252" }} />
                  <Text style={{ color: "#737373", fontSize: 14 }}>Meetings</Text>
                </Space>
              }
              value={summary.meetings || 0}
              valueStyle={{ color: "#262626", fontWeight: 700, fontSize: 32 }}
              suffix={
                <Text style={{ fontSize: 14, color: "#737373" }}>
                  ({summary.totalActivities > 0 ? Math.round((summary.meetings / summary.totalActivities) * 100) : 0}%)
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #e5e5e5" }}
            styles={{ body: { padding: 24 } }}
          >
            <Statistic
              title={
                <Space size={8}>
                  <UserOutlined style={{ color: "#525252" }} />
                  <Text style={{ color: "#737373", fontSize: 14 }}>Active Participants</Text>
                </Space>
              }
              value={summary.participants || 0}
              valueStyle={{ color: "#262626", fontWeight: 700, fontSize: 32 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #e5e5e5" }}
            styles={{ body: { padding: 24 } }}
          >
            <Statistic
              title={
                <Space size={8}>
                  <ClockCircleOutlined style={{ color: "#525252" }} />
                  <Text style={{ color: "#737373", fontSize: 14 }}>Date Range</Text>
                </Space>
              }
              value={
                typeof summary.dateRange === "string"
                  ? summary.dateRange.split(" - ")[0]
                  : summary.dateRange?.start || "N/A"
              }
              valueStyle={{ color: "#262626", fontWeight: 600, fontSize: 16 }}
              suffix={
                <Text style={{ fontSize: 12, color: "#737373" }}>
                  to{" "}
                  {typeof summary.dateRange === "string"
                    ? summary.dateRange.split(" - ")[1]
                    : summary.dateRange?.end || "N/A"}
                </Text>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Tabs for different views */}
      <Card
        style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #e5e5e5" }}
        styles={{ body: { padding: 0 } }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ padding: "0 24px" }}
          items={[
            {
              key: "overview",
              label: (
                <Space size={8}>
                  <BarChartOutlined />
                  <span>Overview</span>
                </Space>
              ),
              children: (
                <div style={{ padding: "0 24px 24px" }}>
                  <Space direction="vertical" size={16} style={{ width: "100%" }}>
                    <div>
                      <Title level={5} style={{ color: "#262626", marginBottom: 12 }}>
                        Summary
                      </Title>
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Card
                            size="small"
                            style={{ background: "#fafafa", border: "1px solid #e5e5e5" }}
                          >
                            <Statistic
                              title="Work Activities"
                              value={summary.workItems || 0}
                              valueStyle={{ color: "#262626", fontSize: 24 }}
                            />
                          </Card>
                        </Col>
                        <Col span={12}>
                          <Card
                            size="small"
                            style={{ background: "#fafafa", border: "1px solid #e5e5e5" }}
                          >
                            <Statistic
                              title="Top Contributor"
                              value={summary.topContributor ? summary.topContributor[0] : "N/A"}
                              valueStyle={{ color: "#262626", fontSize: 18 }}
                            />
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Space>
                </div>
              ),
            },
            {
              key: "activities",
              label: (
                <Space size={8}>
                  <MessageOutlined />
                  <span>All Activities</span>
                </Space>
              ),
              children: (
                <div style={{ padding: "0 24px 24px" }}>
                  <Table
                    columns={tableColumns}
                    dataSource={tableData}
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showTotal: (total) => `Total ${total} activities`,
                    }}
                    scroll={{ x: 800 }}
                    size="middle"
                  />
                </div>
              ),
            },
          ]}
        />
      </Card>
    </Space>
  );
};

export default ResultsDisplay;
