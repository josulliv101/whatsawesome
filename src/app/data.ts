import { config } from "@/lib/config";

export const userData = [
  {
    id: 1,
    avatar: "/carmen.png",
    messages: [
      {
        id: 1,
        avatar: "/carmen.png",
        name: "Carmen",
        message:
          "Hi! What can I help you find? We currently have details for burgers & steak in the Greater Boston area.",
      },

      //   {
      //     id: 2,
      //     avatar: config.logoPath,
      //     name: "Jakob Hoeg",
      //     message: "Hey!",
      //   },
      //   {
      //     id: 3,
      //     avatar: "/carmen.png",
      //     name: "Carmen",
      //     message: "How are you?",
      //   },
      //   {
      //     id: 4,
      //     avatar: config.logoPath,
      //     name: "Jakob Hoeg",
      //     message: "I am good, you?",
      //   },
      //   {
      //     id: 5,
      //     avatar: "/carmen.png",
      //     name: "Carmen",
      //     message: "I am good too!",
      //   },
      //   {
      //     id: 6,
      //     avatar: config.logoPath,
      //     name: "Jakob Hoeg",
      //     message: "That is good to hear!",
      //   },
      //   {
      //     id: 7,
      //     avatar: "/carmen.png",
      //     name: "Carmen",
      //     message: "How has your day been so far?",
      //   },
      //   {
      //     id: 8,
      //     avatar: config.logoPath,
      //     name: "Jakob Hoeg",
      //     message:
      //       "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
      //   },
      //   {
      //     id: 9,
      //     avatar: "/carmen.png",
      //     name: "Carmen",
      //     message: "I had a relaxing day. Just catching up on some reading.",
      //   },
    ],
    name: "Carmen",
  },
  {
    id: 2,
    avatar: "/User2.png",
    name: "John Doe",
  },
  {
    id: 3,
    avatar: "/User3.png",
    name: "Elizabeth Smith",
  },
  {
    id: 4,
    avatar: "/User4.png",
    name: "John Smith",
  },
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
  id: 5,
  avatar: "/cute-mushroom-blue-chat.png",
  name: "Joe",
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}
