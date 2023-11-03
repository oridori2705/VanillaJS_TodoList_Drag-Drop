import { request } from "./api.js";
export default function SyncTaskManager() {
  let tasks = [];

  this.addTask = (task) => {
    tasks.push(task);
  };

  this.removeTasks = (urlPatter) => {
    tasks = tasks.filter((task) => !task.url.includes(urlPatter));
  };

  this.run = async () => {
    if (tasks.length > 0) {
      const task = tasks.shift();

      await request(task.url, {
        method: task.method || "GET",
      });
      this.run();
    }
  };
}
