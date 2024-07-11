import { UserData } from "@/app/data";
import { useChat } from "ai/react";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect } from "react";

interface ChatProps {
  // messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ selectedUser, isMobile }: ChatProps) {
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: "/api/agent",
    onResponse(response) {
      console.log("resp", response);
    },
    streamMode: "text",
    onError: (e) => {
      console.log(e.message, {
        theme: "dark",
      });
    },
  });

  // const [messagesState, setMessages] = React.useState<Message[]>(
  //   messages ?? []
  // );

  // const sendMessage = (newMessage: any) => {
  //   setMessages([...messages, newMessage]);
  //   console.log("newMessage", newMessage);
  // };

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: "9999",
          content:
            "What are you looking for - restuarants, specific dishes, prices, hours of operation?",
          role: "assistant",
        },
      ]);
    }, 800);
  }, []);

  async function sendMessage(newMessage: any) {
    console.log("sendMessage", { chatEndpointIsLoading, newMessage });
    if (chatEndpointIsLoading) {
      return;
    }

    setInput("");
    const messagesWithUserReply = messages.concat({
      id: messages.length.toString(),
      content: newMessage.message,
      role: "user",
    });
    setMessages(messagesWithUserReply);

    const response = await fetch("/api/agent", {
      method: "POST",
      body: JSON.stringify({
        messages: messagesWithUserReply,
        show_intermediate_steps: true,
      }),
    });

    // if (response?.body) {
    //   const reader = response.body.getReader();

    //   while (true) {
    //     const { done, value } = await reader.read();
    //     if (done) break;

    //     const textDecoder = new TextDecoder("utf-8");
    //     const chunk = textDecoder.decode(value);
    //     const lines = chunk.split("\n\n");

    //     for (const line of lines) {
    //       if (line.startsWith("data:")) {
    //         const data = JSON.parse(line.substring(5));
    //         console.log("streaming...", data);
    //       }
    //     }
    //   }
    // }

    const json = await response.json();

    if (response.status === 200) {
      const responseMessages: Array<any> = json.messages;
      // Represent intermediate steps as system messages for display purposes
      // TODO: Add proper support for tool messages
      const toolCallMessages = responseMessages.filter(
        (responseMessage: any) => {
          return (
            (responseMessage.role === "assistant" &&
              !!responseMessage.tool_calls?.length) ||
            responseMessage.role === "tool"
          );
        }
      );
      const intermediateStepMessages: Array<any> = [];
      // for (let i = 0; i < toolCallMessages.length; i += 2) {
      //   const aiMessage = toolCallMessages[i];
      //   const toolMessage = toolCallMessages[i + 1];
      //   intermediateStepMessages.push({
      //     id: (messagesWithUserReply.length + i / 2).toString(),
      //     role: "system" as const,
      //     content: JSON.stringify({
      //       action: aiMessage.tool_calls?.[0],
      //       observation: toolMessage.content,
      //     }),
      //   });
      // }
      const newMessages = messagesWithUserReply;
      for (const message of intermediateStepMessages) {
        newMessages.push(message);
        setMessages([...newMessages]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setMessages([
        ...newMessages,
        {
          id: newMessages.length.toString(),
          content: responseMessages[responseMessages.length - 1].content,
          role: "assistant",
        },
      ]);
    } else {
      if (json.error) {
        console.log(json.error, {
          theme: "dark",
        });
        throw new Error(json.error);
      }
    }
  }

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messages}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
