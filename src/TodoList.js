export default function TodoList({ $target, initialState, onDrop }) {
  const $todoList = document.createElement("div");

  $todoList.setAttribute("draggable", "true");
  this.state = initialState;

  $target.appendChild($todoList);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, todos = [] } = this.state;
    $todoList.innerHTML = `
            <h2>${title}</h2>
            <ul>
                ${todos
                  .map(
                    (todo) =>
                      `<li data-id="${todo._id}" draggable="true" >${todo.content}</li>`
                  )
                  .join("")}
            </ul>
            ${todos.length === 0 ? "설정된 일이 없습니다." : ""}
        `;
  };
  this.render();
  //datatransfer : 드래그할 때 여러가지 값들을 넣을 수 있음
  //datatransfer라는 객체를 통해서 드랍할 곳으로 데이터를 어떤 걸 보낼지 정의
  //드랍 받은 곳은 드래그 시작했을 때 datatransfer 데이터를 꺼내와서 어떤게 드랍됐는지를 판단해서 사용

  //drag : 드래그하면서 효과를 줄 수  있음
  //dragstart : 드래그 시작할 때
  //dragend: 드래그가 끝날 때

  //datatransfer을 이용해서 어떤 요소가 드래그가 시작이 됐는지 그 값을 넣고,
  // 드랍하는 곳에서 그 값을 꺼내서 쓴다.
  // <>마다 있는 data-id를 이용해 작업한다.
  $todoList.addEventListener("dragstart", (e) => {
    const $li = e.target.closest("li");

    e.dataTransfer.setData("todoId", $li.dataset.id);
  });

  //dragover : MDN에서 드래그 사용할 때 사용하는 이벤트
  //drop : e.preventDefault()를  꼭 해줘야한다고 MDN에 나옴
  $todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"; //copy : 복사 , move: 복사 x 이동만, link 3가지 타입이 있음
  });

  $todoList.addEventListener("drop", (e) => {
    e.preventDefault();
    const droppedTodoId = e.dataTransfer.getData("todoId");

    // 현재 TodoList의 Todo가 아닌 경우 상위 컴포넌트에 알림
    const { todos } = this.state;
    if (!todos.find((todo) => todo._id === droppedTodoId)) {
      onDrop(droppedTodoId);
    }
  });
}
