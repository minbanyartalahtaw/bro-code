// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Chat {
  title: string;
  messages: Message[];
}

interface Message {
  id: number;
  question: string;
  answer: string;
}
