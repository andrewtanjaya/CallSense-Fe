import { Badge, Space, Table } from "antd";
import "./AgentsOverview.css";
import React, { useEffect } from "react";

function AgentsOverview() {
  const data = [];
  for (let i = 0; i < 10; ++i) {
    data.push({
      key: i.toString(),
      name: "Agent-1",
      total_call: 10,
      customer_response: "Positive (42%)",
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
    console.log(detail);
  }, [detail]);

  const expandedRowRender = () => {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Start At",
        dataIndex: "start_at",
        key: "start_at",
      },
      {
        title: "Ends At",
        dataIndex: "ends_at",
        key: "ends_at",
      },
      {
        title: "Customer Response",
        dataIndex: "customer_response",
        key: "customer_response",
        render: (customer_response) =>
          customer_response.split(" ")[0] === "Positive" ? (
            <Badge status="success" text={customer_response} />
          ) : (
            <Badge status="error" text={customer_response} />
          ),
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: "id",
        render: (id) => (
          <Space size="middle">
            <a href={"/detail/" + id}>Detail</a>
          </Space>
        ),
      },
    ];

    return <Table columns={columns} dataSource={detail} pagination={false} />;
  };

  const columns = [
    {
      title: "Agent Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Call",
      dataIndex: "total_call",
      key: "total_call",
    },
    {
      title: "Customer Response",
      dataIndex: "customer_response",
      key: "customer_response",
      render: (customer_response) =>
        customer_response.split(" ")[0] === "Positive" ? (
          <Badge status="success" text={customer_response} />
        ) : (
          <Badge status="error" text={customer_response} />
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
