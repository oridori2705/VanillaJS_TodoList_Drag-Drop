const API_END_POINT = "https://kdt-frontend.todo-api.programmers.co.kr/roto";

export const request = async (url, options) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, options);
    if (!res.ok) {
      throw new Error("API 오류");
    }
    return await res.json();
  } catch (error) {
    alert(error.message);
  }
};
