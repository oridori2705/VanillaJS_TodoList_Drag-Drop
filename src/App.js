import TodoList from "./TodoList.js";
import { request } from "./api.js";

export default function App({ $target }) {
  this.state = {
    todos: [],
  };
  this.setState = (nextState) => {
    this.state = nextState;

    const { todos } = this.state;

    incompletedTodoList.setState({
      ...incompletedTodoList.state,
      todos: todos.filter((todo) => !todo.isCompleted),
    });

    completedTodoList.setState({
      ...completedTodoList.state,
      todos: todos.filter((todo) => todo.isCompleted),
    });
  };

  const incompletedTodoList = new TodoList({
    $target,
    initialState: {
      title: "완료되지않은 일",
      todos: [],
    },
    onDrop: async (todoId) => {
      handlerOnDrop(todoId, false);
    },
  });

  const completedTodoList = new TodoList({
    $target,
    initialState: {
      title: "완료된 일",
      todos: [],
    },
    onDrop: async (todoId) => {
      handlerOnDrop(todoId, true);
    },
  });

  const fetchTodos = async () => {
    const todos = await request("");

    this.setState({
      ...this.state,
      todos,
    });
  };
  fetchTodos();

  //낙관적 업데이트
  const handlerOnDrop = async (todoId, toggleData) => {
    const nextTodos = [...this.state.todos];
    console.log(nextTodos, todoId);
    const todoIndex = nextTodos.findIndex((todo) => todo._id === todoId);
    nextTodos[todoIndex].isCompleted = toggleData;
    this.setState({
      ...this.state,
      todos: nextTodos,
    });
    await request(`/${todoId}/toggle`, {
      method: "PUT",
    });
    await fetchTodos();
  };
}

//만약 onDrop이 호출될 때마다 API호출로 데이터를 바꾸고
//바뀐 데이터를 다시 API호출로 받아오게 된다면
//서버가 느릴 때 대처하기가 힘들게 된다.

//이를 해결 하는 방법은 2가지가 있다.
// 1. 낙관적 업데이트
// 2. 로딩화면 구현

//만약 낙관적 업데이트 방법을 이용했다면
//API호출이 느린 상태에서 빠른속도로 드래그를 하다보면
// 현재 위 코드에서는 드래그된 item들이 낙관적 업데이트 후 fetchTodos로 인해
// 데이터가 미묘한 차이로 이질적인 움직임을 보여준다.

//해결 방법
// 큐나 스택을 이용
