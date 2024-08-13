export interface Message {
  _id: string;
  message: string;
  author: string;
  datetime: string;
}

export type Messages = Omit<Message, "_id">[];
