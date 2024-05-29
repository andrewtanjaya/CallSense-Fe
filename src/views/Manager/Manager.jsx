import "./Manager.css";
import React from "react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import OngoingCall from "../../components/OngoingCall/OngoingCall";
import AgentsOverview from "../../components/AgentsOverview/AgentsOverview";

function Manager() {
  const onChange = (e) => {
    console.log("change");
  };
  return (
    <div className="manager-container">
      <Tabs onChange={onChange} type="card">
        <TabPane tab="Ongoing Call" key="1">
          <OngoingCall />
        </TabPane>
        <TabPane tab="Agents Overview" key="2">
          <AgentsOverview />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Manager;
