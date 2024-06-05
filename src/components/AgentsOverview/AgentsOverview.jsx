import { Badge, Space, Table } from "antd";
import "./AgentsOverview.css";
import React, { useEffect, useState } from "react";
import { getAgentOverview } from "../../integration/ApiClient";

function AgentsOverview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
    getAgentOverview().then((data) => {
      console.log(data);
      setData(data.data);
    });
  }, []);

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Start At",
        dataIndex: "started_at",
        key: "started_at",
      },
      {
        title: "Ends At",
        dataIndex: "ended_at",
        key: "ended_at",
      },
      {
        title: "Customer Response",
        dataIndex: "sentiment",
        key: "sentiment",
        render: (sentiment) =>
          sentiment >= 30 ? (
            <Badge status="success" text={"Positive (" + sentiment + ")%"} />
          ) : sentiment <= -30 ? (
            <Badge status="error" text={"Negative (" + sentiment + ")%"} />
          ) : (
            <Badge status="default" text={"Netral (" + sentiment + ")%"} />
          ),
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "id",
        render: (id) => (
          <Space size="middle">
            <a href={"/detail/" + id}>Detail</a>
          </Space>
        ),
      },
    ];

    return (
      <Table columns={columns} dataSource={record.calls} pagination={false} />
    );
  };

  const columns = [
    {
      title: "Agent Name",
      dataIndex: "agent_name",
      key: "agent_name",
    },
    {
      title: "Total Call",
      dataIndex: "total_calls",
      key: "totaltotal_calls_call",
    },
    {
      title: "Customer Response",
      dataIndex: "average_sentiment",
      key: "average_sentiment",
      render: (average_sentiment) =>
        average_sentiment >= 30 ? (
          <Badge
            status="success"
            text={"Positive (" + average_sentiment + ")%"}
          />
        ) : average_sentiment <= -30 ? (
          <Badge
            status="error"
            text={"Negative (" + average_sentiment + ")%"}
          />
        ) : (
          <Badge
            status="default"
            text={"Netral (" + average_sentiment + ")%"}
          />
        ),
    },
  ];

  return (
    <div className="agents-overview-container">
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
}

export default AgentsOverview;
