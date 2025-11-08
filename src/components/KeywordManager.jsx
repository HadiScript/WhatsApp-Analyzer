import React, { useState } from "react";
import { Card, Input, Button, Tag, Space, Typography, Collapse, Divider } from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  // BriefcaseOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Briefcase } from "lucide-react";

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

const KeywordManager = ({
  customWorkKeywords,
  customMeetingKeywords,
  onAddWorkKeyword,
  onAddMeetingKeyword,
  onRemoveWorkKeyword,
  onRemoveMeetingKeyword,
  onResetKeywords,
  defaultWorkKeywords,
  defaultMeetingKeywords,
}) => {
  const [newWorkKeyword, setNewWorkKeyword] = useState("");
  const [newMeetingKeyword, setNewMeetingKeyword] = useState("");

  const handleAddWorkKeyword = () => {
    if (onAddWorkKeyword(newWorkKeyword)) {
      setNewWorkKeyword("");
    }
  };

  const handleAddMeetingKeyword = () => {
    if (onAddMeetingKeyword(newMeetingKeyword)) {
      setNewMeetingKeyword("");
    }
  };

  const handleKeyPress = (e, handler) => {
    if (e.key === "Enter") {
      handler();
    }
  };

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {/* Info Card */}
      <Card
        style={{
          background: "#ffffff",
          borderRadius: 8,
          border: "1px solid #e5e5e5",
        }}
        styles={{ body: { padding: 20 } }}
      >
        <Space size={12} align="start">
          <InfoCircleOutlined style={{ fontSize: 20, color: "#525252" }} />
          <div>
            <Text strong style={{ color: "#262626", fontSize: 14, display: "block" }}>
              Default Keywords Included
            </Text>
            <Paragraph style={{ margin: "4px 0 0 0", color: "#737373", fontSize: 13 }}>
              We've included{" "}
              <Text strong style={{ color: "#262626" }}>
                {defaultWorkKeywords.length + defaultMeetingKeywords.length}
              </Text>{" "}
              common work and meeting keywords. Add your own to improve detection.
            </Paragraph>

            <Collapse
              ghost
              style={{ marginTop: 12 }}
              expandIconPosition="end"
              items={[
                {
                  key: "1",
                  label: (
                    <Text style={{ color: "#525252", fontSize: 13 }}>
                      View default keywords
                    </Text>
                  ),
                  children: (
                    <Space direction="vertical" size={12} style={{ width: "100%" }}>
                      <div>
                        <Text strong style={{ color: "#262626", fontSize: 13 }}>
                          <Briefcase style={{ marginRight: 6 }} />
                          Work Keywords ({defaultWorkKeywords.length})
                        </Text>
                        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {defaultWorkKeywords.map((kw) => (
                            <Tag
                              key={kw}
                              style={{
                                margin: 0,
                                borderRadius: 4,
                                border: "1px solid #d4d4d4",
                                background: "#fafafa",
                                color: "#525252",
                              }}
                            >
                              {kw}
                            </Tag>
                          ))}
                        </div>
                      </div>
                      <Divider style={{ margin: "8px 0" }} />
                      <div>
                        <Text strong style={{ color: "#262626", fontSize: 13 }}>
                          <CalendarOutlined style={{ marginRight: 6 }} />
                          Meeting Keywords ({defaultMeetingKeywords.length})
                        </Text>
                        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {defaultMeetingKeywords.map((kw) => (
                            <Tag
                              key={kw}
                              style={{
                                margin: 0,
                                borderRadius: 4,
                                border: "1px solid #d4d4d4",
                                background: "#fafafa",
                                color: "#525252",
                              }}
                            >
                              {kw}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </Space>
                  ),
                },
              ]}
            />
          </div>
        </Space>
      </Card>

      {/* Work Keywords */}
      <Card
        style={{
          background: "#ffffff",
          borderRadius: 8,
          border: "1px solid #e5e5e5",
        }}
        styles={{ body: { padding: 20 } }}
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #262626 0%, #404040 100%)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Briefcase style={{ fontSize: 16, color: "#ffffff" }} />
            </div>
            <div>
              <Text strong style={{ color: "#262626", fontSize: 15, display: "block" }}>
                Work Keywords
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Add custom work-related terms
              </Text>
            </div>
          </div>

          <Space.Compact style={{ width: "100%" }}>
            <Input
              value={newWorkKeyword}
              onChange={(e) => setNewWorkKeyword(e.target.value)}
              placeholder="e.g., sprint, standup, devops..."
              onPressEnter={handleAddWorkKeyword}
              size="large"
              style={{ borderRadius: "8px 0 0 8px", flex: 1 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddWorkKeyword}
              disabled={!newWorkKeyword.trim()}
              size="large"
              style={{
                background: newWorkKeyword.trim()
                  ? "linear-gradient(135deg, #262626 0%, #404040 100%)"
                  : "#d4d4d4",
                border: "none",
                borderRadius: "0 8px 8px 0",
                minWidth: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Add
            </Button>
          </Space.Compact>

          <div style={{ minHeight: 40, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {customWorkKeywords.length > 0 ? (
              customWorkKeywords.map((keyword) => (
                <Tag
                  key={keyword}
                  closable
                  onClose={() => onRemoveWorkKeyword(keyword)}
                  closeIcon={<CloseOutlined style={{ fontSize: 10 }} />}
                  style={{
                    margin: 0,
                    padding: "4px 12px",
                    fontSize: 13,
                    borderRadius: 6,
                    background: "#262626",
                    color: "#ffffff",
                    border: "none",
                  }}
                >
                  {keyword}
                </Tag>
              ))
            ) : (
              <Text type="secondary" style={{ fontSize: 13 }}>
                No custom work keywords added yet
              </Text>
            )}
          </div>
        </Space>
      </Card>

      {/* Meeting Keywords */}
      <Card
        style={{
          background: "#ffffff",
          borderRadius: 8,
          border: "1px solid #e5e5e5",
        }}
        styles={{ body: { padding: 20 } }}
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #404040 0%, #525252 100%)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarOutlined style={{ fontSize: 16, color: "#ffffff" }} />
            </div>
            <div>
              <Text strong style={{ color: "#262626", fontSize: 15, display: "block" }}>
                Meeting Keywords
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Add custom meeting-related terms
              </Text>
            </div>
          </div>

          <Space.Compact style={{ width: "100%" }}>
            <Input
              value={newMeetingKeyword}
              onChange={(e) => setNewMeetingKeyword(e.target.value)}
              placeholder="e.g., webinar, workshop, catchup..."
              onPressEnter={handleAddMeetingKeyword}
              size="large"
              style={{ borderRadius: "8px 0 0 8px", flex: 1 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddMeetingKeyword}
              disabled={!newMeetingKeyword.trim()}
              size="large"
              style={{
                background: newMeetingKeyword.trim()
                  ? "linear-gradient(135deg, #404040 0%, #525252 100%)"
                  : "#d4d4d4",
                border: "none",
                borderRadius: "0 8px 8px 0",
                minWidth: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Add
            </Button>
          </Space.Compact>

          <div style={{ minHeight: 40, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {customMeetingKeywords.length > 0 ? (
              customMeetingKeywords.map((keyword) => (
                <Tag
                  key={keyword}
                  closable
                  onClose={() => onRemoveMeetingKeyword(keyword)}
                  closeIcon={<CloseOutlined style={{ fontSize: 10 }} />}
                  style={{
                    margin: 0,
                    padding: "4px 12px",
                    fontSize: 13,
                    borderRadius: 6,
                    background: "#404040",
                    color: "#ffffff",
                    border: "none",
                  }}
                >
                  {keyword}
                </Tag>
              ))
            ) : (
              <Text type="secondary" style={{ fontSize: 13 }}>
                No custom meeting keywords added yet
              </Text>
            )}
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default KeywordManager;
