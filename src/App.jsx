import React, { useState } from "react";
import { Layout, Drawer, Button, Typography, Space, Tag, ConfigProvider, theme } from "antd";
import {
  SettingOutlined,
  MessageOutlined,
  FileTextOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import FileUpload from "./components/FileUpload";
import KeywordManager from "./components/KeywordManager";
import ResultsDisplay from "./components/ResultsDisplay";
import { useKeywords } from "./hooks/useKeywords";
import { useFileProcessor } from "./hooks/useFileProcessor";
import "./styles/globals.css";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  // const mainContentRef = useRef(null);

  const {
    customWorkKeywords,
    customMeetingKeywords,
    addWorkKeyword,
    addMeetingKeyword,
    removeWorkKeyword,
    removeMeetingKeyword,
    resetKeywords,
    defaultWorkKeywords,
    defaultMeetingKeywords,
  } = useKeywords();

  const {
    isProcessing,
    results,
    error,
    processFile,
    clearResults,
    clearError,
  } = useFileProcessor(customWorkKeywords, customMeetingKeywords);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    clearResults();
    clearError();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    clearResults();
    clearError();
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleStartOver = () => {
    setSelectedFile(null);
    clearResults();
    clearError();
    setShowSettings(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#262626",
          colorBgContainer: "#ffffff",
          borderRadius: 8,
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: "100vh", background: "#fafafa" }}>
        {/* Header */}
        <Header
          style={{
            background: "#ffffff",
            borderBottom: "1px solid #e5e5e5",
            padding: "0 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
            position: "sticky",
            top: 0,
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <Space size={16} align="center">
            <div
              style={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageOutlined style={{ fontSize: 24, color: "#ffffff" }} />
            </div>
            <div>
              <Title level={3} style={{ margin: 0, color: "#262626", fontSize: 24 }}>
                WhatsApp Chat Analyzer
              </Title>
              <Paragraph style={{ margin: 0, color: "#737373", fontSize: 14 }}>
                Transform conversations into actionable insights
              </Paragraph>
            </div>
          </Space>
          <Button
            type="text"
            size="large"
            icon={<SettingOutlined style={{ fontSize: 20 }} />}
            onClick={() => setShowSettings(true)}
            style={{
              height: 48,
              width: 48,
              borderRadius: 12,
              color: "#525252",
            }}
          />
        </Header>

        {/* Settings Drawer - FROM RIGHT SIDE */}
        <Drawer
          title={
            <Space size={12}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SettingOutlined style={{ fontSize: 20, color: "#ffffff" }} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#262626" }}>
                  Settings
                </div>
                <div style={{ fontSize: 13, color: "#737373", fontWeight: 400 }}>
                  Customize keyword detection
                </div>
              </div>
            </Space>
          }
          placement="right"
          onClose={() => setShowSettings(false)}
          open={showSettings}
          width={520}
          styles={{
            body: { padding: 24, background: "#fafafa" },
            header: { borderBottom: "1px solid #e5e5e5", padding: "20px 24px" },
          }}
        >
          <KeywordManager
            customWorkKeywords={customWorkKeywords}
            customMeetingKeywords={customMeetingKeywords}
            onAddWorkKeyword={addWorkKeyword}
            onAddMeetingKeyword={addMeetingKeyword}
            onRemoveWorkKeyword={removeWorkKeyword}
            onRemoveMeetingKeyword={removeMeetingKeyword}
            onResetKeywords={resetKeywords}
            defaultWorkKeywords={defaultWorkKeywords}
            defaultMeetingKeywords={defaultMeetingKeywords}
          />
        </Drawer>

        {/* Main Content */}
        <Content style={{ padding: "48px", maxWidth: 1400, margin: "0 auto", width: "100%" }}>
          {!results ? (
            <Space direction="vertical" size={32} style={{ width: "100%" }}>
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemoveFile={handleRemoveFile}
                processing={isProcessing}
                error={error}
                clearError={clearError}
              />

              {selectedFile && (
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    size="large"
                    loading={isProcessing}
                    onClick={handleAnalyze}
                    icon={<RocketOutlined />}
                    style={{
                      height: 56,
                      padding: "0 48px",
                      fontSize: 16,
                      fontWeight: 600,
                      background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                      border: "none",
                      borderRadius: 8,
                    }}
                  >
                    {isProcessing ? "Analyzing Chat..." : "Analyze Chat"}
                  </Button>
                  <Paragraph style={{ marginTop: 16, color: "#737373", fontSize: 14 }}>
                    Extract work activities, meetings, and generate comprehensive reports
                  </Paragraph>
                </div>
              )}

              {!selectedFile && (
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 12,
                    padding: 48,
                    border: "1px solid #e5e5e5",
                  }}
                >
                  <Title level={4} style={{ color: "#262626", marginBottom: 16 }}>
                    Get Started
                  </Title>
                  <Paragraph style={{ color: "#525252", fontSize: 15, marginBottom: 32 }}>
                    Transform your WhatsApp group chats into organized work reports.
                    Perfect for tracking team progress, meetings, and project activities.
                  </Paragraph>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: 24,
                    }}
                  >
                    {[
                      { icon: <FileTextOutlined />, title: "Upload", desc: "Upload your WhatsApp .txt export" },
                      { icon: <RocketOutlined />, title: "Analyze", desc: "AI extracts work activities automatically" },
                      { icon: <MessageOutlined />, title: "Download", desc: "Get Excel reports and insights" }
                    ].map((step, index) => (
                      <div
                        key={index}
                        style={{
                          textAlign: "center",
                          padding: 24,
                          background: "#fafafa",
                          borderRadius: 8,
                          border: "1px solid #e5e5e5",
                        }}
                      >
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                            borderRadius: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 16px",
                            fontSize: 24,
                            color: "#ffffff",
                          }}
                        >
                          {step.icon}
                        </div>
                        <Title level={5} style={{ marginBottom: 8, color: "#262626" }}>
                          {step.title}
                        </Title>
                        <Paragraph style={{ margin: 0, color: "#737373", fontSize: 13 }}>
                          {step.desc}
                        </Paragraph>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Space>
          ) : (
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              <div
                style={{
                  background: "#ffffff",
                  padding: 24,
                  borderRadius: 12,
                  border: "1px solid #e5e5e5",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title level={3} style={{ margin: 0, color: "#262626" }}>
                  Analysis Results
                </Title>
                <Button
                  onClick={handleStartOver}
                  size="large"
                  style={{
                    height: 40,
                    borderRadius: 8,
                    fontWeight: 500,
                  }}
                >
                  Analyze Another File
                </Button>
              </div>
              <ResultsDisplay results={results} />
            </Space>
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
