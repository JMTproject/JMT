(async function viewCount() {
  const recipeId = window.location.pathname.split('/recipe/').pop();
  const expiryTime = Date.now() + 60 * 1000; // 만료시간(1분)

//   만료시간이 지나면 로컬스토리지 삭제
  if (localStorage.getItem(`${recipeId}`) < Date.now()) {
    localStorage.removeItem(`${recipeId}`);
  }

//   로컬스토리지가 존재하면 조회수 증가 안하고,
// 로컬스토리지가 존재하지 않으면 조회수 증가
  if (!localStorage.getItem(`${recipeId}`)) {
    localStorage.setItem(`${recipeId}`, `${expiryTime}`);
    const res = await axios({
      method: 'get',
      url: `/api/recipe/viewCount/${recipeId}`,
    });
  }
})();
