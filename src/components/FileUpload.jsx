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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Space size={16}>
            <div
              style={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileTextOutlined style={{ fontSize: 24, color: "#ffffff" }} />
            </div>
            <div>
              <Text strong style={{ fontSize: 15, color: "#262626", display: "block" }}>
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
            padding: 48,
            transition: "all 0.3s",
          }}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 72,
                height: 72,
                background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <InboxOutlined style={{ fontSize: 36, color: "#ffffff" }} />
            </div>

            <Title level={4} style={{ color: "#262626", marginBottom: 8 }}>
              Upload WhatsApp Chat Export
            </Title>

            <Paragraph style={{ color: "#525252", fontSize: 15, marginBottom: 24 }}>
              Drag and drop your .txt file here, or click to browse
            </Paragraph>

            <Button
              type="primary"
              size="large"
              style={{
                background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                border: "none",
                borderRadius: 8,
                height: 48,
                padding: "0 32px",
                fontWeight: 600,
              }}
            >
              Choose File
            </Button>
          </div>
        </Dragger>

        <div
          style={{
            padding: 32,
            background: "#fafafa",
            borderTop: "1px solid #e5e5e5",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <Text strong style={{ color: "#262626", fontSize: 14, display: "block", marginBottom: 16 }}>
            How to export WhatsApp chat
          </Text>

          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            {[
              "Open WhatsApp group/chat",
              "Tap ⋮ (menu) → More → Export chat",
              'Choose "Without Media"',
              "Save as .txt file",
            ].map((step, index) => (
              <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  {index + 1}
                </div>
                <Text style={{ color: "#525252", fontSize: 14 }}>{step}</Text>
              </div>
            ))}
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default FileUpload;
