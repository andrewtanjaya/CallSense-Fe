import axios from "axios";
const apiHost = process.env.REACT_APP_API_HOST;

export const getAgentOverview = async () => {
    const response = await axios.get(apiHost + "/agents", {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420"
        }
      });

  return response.data;
};

export const startCall = async (agentName, caller_url, receiver_url) => {
  const response = await axios.post(
    apiHost + "/agents/" + agentName + "/calls",
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
  const response = await axios.get(apiHost + "/chats/generate", {
    params: {
      question: question,
    },
  });

  console.log(response.data);
  return response.data;
};
