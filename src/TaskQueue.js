export default function TaskQueue() {
  const tasks = [];
  //queue에 API 요청 함수를 쌓는다.
  this.addTask = (task) => {
    tasks.push(task);
    console.log(tasks);
  };

  this.run = async () => {
    if (tasks.length > 0) {
      const task = tasks.shift();
      await task();
      this.run();
    }
  };

  this.hasTask = () => tasks.length > 0;
}
