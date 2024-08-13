export interface Message {
  id: string;
  message: string;
  author: string;
  datetime: string;
}

export type Messages = Omit<Message, "id">[];
