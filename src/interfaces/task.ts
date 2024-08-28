export default interface Task {
  id: number;
  userId: number;
  name: string;
  date: string;
  description: string;
  type: string;
  isDone: boolean;
}