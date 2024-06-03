import { Badge, Space, Table } from "antd";
import "./AgentsOverview.css";
import React, { useEffect, useState } from "react";
import { getAgentOverview } from "../../integration/ApiClient";

function AgentsOverview() {
  // const [setData, data] = useState([])
 const  data = []
  for (let i = 0; i < 10; ++i) {
    data.push({
      key: i.toString(),
      agent_name: "Agent-1",
      total_calls: 10,
      average_sentiment: "Positive (42%)",
    });
  }

  const detail = [];
  for (let i = 0; i < 5; ++i) {
    detail.push({
      key: i.toString(),
      id: i.toString(),
      customer_response: "Negative (20%)",
      start_at: "20-04-2023 00:00:00",
      ends_at: "20-04-2023 00:00:00",
    });
  }

  useEffect(() => {
    // getAgentOverview().then((data) => {
    //   setData(data.data);
    // });
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
          sentiment.split(" ")[0] === "Positive" ? (
            <Badge status="success" text={sentiment} />
          ) : (
            <Badge status="error" text={sentiment} />
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

    return <Table columns={columns} dataSource={record.calls} pagination={false} />;
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
        average_sentiment.split(" ")[0] === "Positive" ? (
          <Badge status="success" text={average_sentiment} />
        ) : (
          <Badge status="error" text={average_sentiment} />
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
