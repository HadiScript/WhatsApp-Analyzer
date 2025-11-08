import React, { useRef, useState } from "react";
import { Upload as AntUpload, Card, Button, Typography, Space, Alert, Tag } from "antd";
import {
  InboxOutlined,
  FileTextOutlined,
  CloseOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Dragger } = AntUpload;
const { Title, Paragraph, Text } = Typography;

const FileUpload = ({
  onFileSelect,
  selectedFile,
  onRemoveFile,
  processing,
  error,
  clearError,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (file.name.endsWith(".txt")) {
      onFileSelect(file);
    }
    return false; // Prevent default upload
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".txt",
    beforeUpload: handleFile,
    showUploadList: false,
    onDrop: () => setDragActive(false),
  };

  if (selectedFile) {
    return (
      <Card
        style={{
          background: "#ffffff",
          border: "1px solid #d4d4d4",
          borderRadius: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <Space size={12} style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileTextOutlined style={{ fontSize: 20, color: "#ffffff" }} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <Text strong style={{ fontSize: 15, color: "#262626", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {selectedFile.name}
              </Text>
              <Space size={8} style={{ marginTop: 4 }}>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </Text>
                <Tag
                  icon={<CheckCircleOutlined />}
                  color="success"
                  style={{ margin: 0, borderRadius: 4 }}
                >
                  Ready
                </Tag>
              </Space>
            </div>
          </Space>
          <Button
            type="text"
            danger
            icon={<CloseOutlined />}
            onClick={onRemoveFile}
            disabled={processing}
            style={{
              borderRadius: 8,
              flexShrink: 0,
            }}
          />
        </div>
      </Card>
    );
  }

  return (
    <div>
      {error && (
        <Alert
          message="Processing Error"
          description={error}
          type="error"
          closable
          onClose={clearError}
          style={{
            marginBottom: 24,
            borderRadius: 8,
          }}
        />
      )}

      <Card
        style={{
          background: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: 12,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Dragger
          {...uploadProps}
          style={{
            background: dragActive ? "#fafafa" : "transparent",
            border: "2px dashed #d4d4d4",
            borderRadius: 12,
            padding: "clamp(24px, 5vw, 48px)",
            transition: "all 0.3s",
          }}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "clamp(56px, 15vw, 72px)",
                height: "clamp(56px, 15vw, 72px)",
                background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto clamp(16px, 3vw, 24px)",
              }}
            >
              <InboxOutlined style={{ fontSize: "clamp(28px, 7vw, 36px)", color: "#ffffff" }} />
            </div>

            <Title level={4} style={{ color: "#262626", marginBottom: 8, fontSize: "clamp(16px, 4vw, 20px)" }}>
              Upload WhatsApp Chat Export
            </Title>

            <Paragraph style={{ color: "#525252", fontSize: "clamp(13px, 3.5vw, 15px)", marginBottom: "clamp(16px, 3vw, 24px)" }}>
              Drag and drop your .txt file here, or click to browse
            </Paragraph>

            <Button
              type="primary"
              size="large"
              style={{
                background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                border: "none",
                borderRadius: 8,
                height: "clamp(40px, 10vw, 48px)",
                padding: "0 clamp(20px, 5vw, 32px)",
                fontWeight: 600,
                fontSize: "clamp(14px, 3.5vw, 16px)",
              }}
            >
              Choose File
            </Button>
          </div>
        </Dragger>

        <div
          style={{
            padding: "clamp(16px, 4vw, 32px)",
            background: "#fafafa",
            borderTop: "1px solid #e5e5e5",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <Text strong style={{ color: "#262626", fontSize: "clamp(13px, 3.5vw, 14px)", display: "block", marginBottom: "clamp(12px, 3vw, 16px)" }}>
            How to export WhatsApp chat
          </Text>

          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            {[
              "Open WhatsApp group/chat",
              "Tap ⋮ (menu) → More → Export chat",
              'Choose "Without Media"',
              "Save as .txt file",
            ].map((step, index) => (
              <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "clamp(8px, 2vw, 12px)" }}>
                <div
                  style={{
                    width: "clamp(20px, 5vw, 24px)",
                    height: "clamp(20px, 5vw, 24px)",
                    background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  {index + 1}
                </div>
                <Text style={{ color: "#525252", fontSize: "clamp(12px, 3vw, 14px)", flex: 1 }}>{step}</Text>
              </div>
            ))}
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default FileUpload;
