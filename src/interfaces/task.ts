export default interface Task {
  id: string;
  userId: string;
  name: string;
  date: string;
  description: string;
  tags: Array<string>;
  type: string;
  isDone: boolean;
}