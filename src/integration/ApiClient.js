import axios from "axios";
const apiHost = process.env.REACT_APP_API_HOST;

export const getAgentOverview = async () => {
  const response = await axios.get(apiHost + "/agents", {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  });
  console.log(response.data);
  return response.data;
};

export const startCall = async (agentName, caller_url, receiver_url) => {
  const response = await axios.post(
    apiHost + "/agents/" + agentName + "/calls/start",
    {
      customer_streaming_url: caller_url,
      agent_streaming_url: receiver_url,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response.data);
  return response.data;
};

export const endCall = async (agentName) => {
  const response = await axios.put(
    apiHost + "/agents/" + agentName + "/calls/ends"
  );

  console.log(response.data);
  return response.data;
};

export const chat = async (question) => {
  const response = await axios.get(
    `${apiHost}/chats/generate`,
    {
      params: {
        question: question,
      },
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );

  console.log(response.data);
  return response.data;
};

export const getCallDetail = async (callId) => {
  const response = await axios.get(
    apiHost + "/calls/" + callId + "/recordings",
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );

  console.log(response.data);
  return response.data;
};


export const getOngoingCall = async () => {
  const response = await axios.get(apiHost + "/calls/ongoing", {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  })
  console.log(response.data)
  return response.data;
}