export default function TodoList({ $target, initialState }) {
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
                  .map((todo) => `<li draggable="true" >${todo.content}</li>`)
                  .join("")}
            </ul>
            ${todos.length === 0 ? "설정된 일이 없습니다." : ""}
        `;
  };
  this.render();

  //datatransfer라는 객체를 통해서 드랍할 곳으로 데이터를 어떤 걸 보낼지 정의
  //드랍 받은 곳은 드래그 시작했을 때 datatransfer 데이터를 꺼내와서 어떤게 드랍됐는지를 판단해서 사용

  //drag : 드래그하면서 효과를 줄 수  있음
  //dragstart : 드래그 시작할 때
  //dragend: 드래그가 끝날 때
  $todoList.addEventListener("drag", (e) => {
    e.dataTransfer.dropEffect = "copy"; //copy, move, link 3가지 타입이 있음
  });
}
