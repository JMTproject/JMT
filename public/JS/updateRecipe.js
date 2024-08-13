let token;
if (localStorage.getItem('token')) {
  token = localStorage.getItem('token');
} else if (sessionStorage.getItem('token')) {
  token = sessionStorage.getItem('token');
}

(async function openRecipe() {
  try {
    // 레시피 ID 추출
    const recipeId = window.location.pathname.split('/updaterecipe/').pop();
    // console.log('reI:', recipeId);

    // 기존 레시피 데이터 불러오기
    const res = await axios({
      method: 'get',
      url: `/api/recipe/updaterecipe/${recipeId}`,
      headers: {
        Authorization: token,
      },
    });
    if (res.data.message === '토큰 정보 없음') {
      alert('로그인이 필요한 페이지 입니다');
      document.location.href = '/login';
    }
    // 레시피 제목, 설명, 서빙 수, 요리 시간 설정
    document.querySelector('#title').value = res.data.recipe.recipeTitle;
    document.querySelector('#introduceRp').value = res.data.recipe.description;
    document.querySelector('#servings').value = res.data.recipe.servings;
    document.querySelector('#cookingTime').value = res.data.recipe.cookingTime;



    // 메인 이미지 설정
    const mainImgUrl = res.data.recipe.mainImg;
    const mainImgElement = document.querySelector('#uploadedImg');
    mainImgElement.src = mainImgUrl; // 기존 메인 이미지 표시

    // 재료 리스트 불러오기
    for (let i = 0; i < res.data.ingredient.length; i++) {
      document.querySelector('#ingredientName').value = res.data.ingredient[i].ingredientName;
      document.querySelector('#ingredientAmount').value = res.data.ingredient[i].quantity;
      addIngredient();
    }

    // 조리 도구 리스트 불러오기
    for (let i = 0; i < res.data.cookingtools.length; i++) {
      document.querySelector('#toolName').value = res.data.cookingtools[i].toolName;
      addCookingTool();
    }

    // 요리 단계와 이미지 불러오기
    for (let i = 0; i < res.data.cookingstep.length; i++) {
      const stepContent = document.querySelector(`#stepContent${i + 1}`);
      const stepImgElement = document.querySelector(`#imgPreview${i + 1}`);
      const stepImgUrl = res.data.cookingstep[i].stepImg;

      stepContent.value = res.data.cookingstep[i].content;
      stepImgElement.src = stepImgUrl; // 기존 단계 이미지 표시
      stepImgElement.style.display = 'block'; // 이미지를 표시
    }
  } catch (error) {
    console.error('Error fetching recipe data or verifying token:', error);
    alert('데이터를 불러오는 중 오류가 발생했습니다.');
  }
})();
function fileUploadFunc() {
  // html에서 파일 입력 요소와 이미지를 표시할 요소를 가져옴
  const fileInput = document.getElementById('fileInput');
  const imgElement = document.getElementById('uploadedImg');
  //파일 입력 요소에 파일이 있고, 첫 번째 파일이 존재하는지 확인
  if (fileInput.files && fileInput.files[0]) {
    //FileReader 객체를 생성하여 파일을 읽음
    const reader = new FileReader();
    //파일 읽기가 완료되면 실행될 콜백 함수를 정의함
    reader.onload = function (e) {
      // 업로드된 이미지의 데이터 url을 img 요소의 src 속성에 할당하여 이미지를 미리 보기로 표시함
      imgElement.src = e.target.result;
    };
    // 선택한 파일을 데이터 URL 형식으로 읽음
    reader.readAsDataURL(fileInput.files[0]);
  }
}
document.getElementById('ingredientName').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 기본 동작 방지
    document.getElementById('inputButton1').click();
  }
});

document.getElementById('ingredientAmount').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 기본 동작 방지
    document.getElementById('inputButton1').click();
  }
});
//addIngredient
function addIngredient() {
  //html에서 재료 이름과 계량 값을 가져옴
  const ingredientName = document.getElementById('ingredientName').value.trim();
  const ingredientAmount = document.getElementById('ingredientAmount').value.trim();
  //파일 이름이나 계량 값이 비어 있는지 확인하고, 비어 있으면 경고 메시지를 표시하고 함수를 종료
  if (ingredientName === '' || ingredientAmount === '') {
    alert('재료와 계량을 모두 입력해주세요.');
    return;
  }

  const ingredientsList = document.getElementById('ingredientList');
  const ingredientItems = ingredientsList.getElementsByClassName('ingredient-item');

  if (ingredientItems.length >= 10) {
    alert('재료는 최대 10개까지만 추가할 수 있습니다.');
    return;
  }

  //새로운 <li> 요소를 생성
  const li = document.createElement('li');
  //<li> 요소에 클래스 이름 'ingredient-item'을 추가
  li.className = 'ingredient-item';

  const ingredientBox = document.createElement('div');
  ingredientBox.className = 'ingredientBox';

  //재료 이름과 계량을 텍스트 노드로 생성, 이를 <li> 요소에 추가
  const igdNameSpan = document.createElement('span');
  igdNameSpan.className = 'igdNameSpan';
  igdNameSpan.textContent = `${ingredientName}`;
  const igdAmountSpan = document.createElement('span');
  igdAmountSpan.className = 'igdAmountSpan';
  igdAmountSpan.textContent = `${ingredientAmount}`;
  //삭제 버튼 생성
  const removeButton = document.createElement('button');
  removeButton.textContent = 'x';
  removeButton.className = 'remove-btn';
  //삭제 버튼이 클릭되면 실행될 함수를 설정
  removeButton.onclick = function () {
    removeIngredient(this);
  };

  li.appendChild(ingredientBox);

  ingredientBox.appendChild(igdNameSpan);
  ingredientBox.appendChild(igdAmountSpan);

  //삭제 버튼을 <li> 요소에 추가
  ingredientBox.appendChild(removeButton);

  //재료 리스트를 나타내는 <ul> 요소룰 가져와서, 새로 생성한<li> 요소를 추가
  const ingredientList = document.getElementById('ingredientList');
  ingredientList.appendChild(li);

  //입력 필드를 초기화
  document.getElementById('ingredientName').value = '';
  document.getElementById('ingredientAmount').value = '';
}
function removeIngredient(button) {
  //삭제 버튼의 부모 요소인 <li> 요소를 가져 옴
  const li = button.parentNode;
  //<li> 요소를 리스트에서 제거
  li.parentNode.remove(li);
}

document.getElementById('toolName').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 기본 동작 방지
    document.getElementById('inputButton2').click();
  }
});

//addCookingTool
function addCookingTool() {
  // HTML에서 조리 도구 이름 입력값을 가져오고, 앞뒤 공백을 제거
  const toolName = document.getElementById('toolName').value.trim();
  // 조리 도구 이름이 비어 있는지 확인하고, 비어 있으면 경고 메시지를 표시하고 함수를 종료
  if (toolName === '') {
    alert('조리 도구를 입력해주세요.');
    return;
  }
  // 새로운 <li> 요소를 생성
  const li = document.createElement('li');
  // <li> 요소에 클래스 이름 'cooking-tool-item'을 추가
  li.className = 'cooking-tool-item';

  const cookingToolBox = document.createElement('div');
  cookingToolBox.className = 'cookingToolBox';
  li.appendChild(cookingToolBox);

  // 조리 도구 이름을 <span>으로 생성하고, 이를 cookingToolBox에 추가
  const cookingToolName = document.createElement('span');
  cookingToolName.className = 'cookingToolName';
  cookingToolName.textContent = `${toolName}`;
  cookingToolBox.appendChild(cookingToolName);

  // 삭제 버튼을 생성
  const removeButton = document.createElement('button');
  removeButton.textContent = 'x';
  removeButton.className = 'remove-btn';
  // 삭제 버튼이 클릭되면 실행될 함수를 설정
  removeButton.onclick = function () {
    removeCookingTool(this);
  };

  // 삭제 버튼을 cookingToolBox에 추가
  cookingToolBox.appendChild(removeButton);

  // 조리 도구 리스트를 나타내는 <ul> 요소를 가져와서, 새로 생성한 <li> 요소를 추가
  const cookingToolList = document.getElementById('cookingToolList');
  cookingToolList.appendChild(li);
  // 입력 필드를 초기화
  document.getElementById('toolName').value = '';
}
function removeCookingTool(button) {
  // 삭제 버튼의 부모 요소인 <li> 요소를 가져옴
  const li = button.parentNode;
  // <li> 요소를 리스트에서 제거
  li.parentNode.remove(li);
}
//cookingStep
function triggerFileUpload(step) {
  // 특정 단계의 파일 입력 요소를 클릭하여 파일 선택 창을 염
  document.getElementById('fileInput' + step).click();
}
function displayImage(event, step) {
  const input = event.target; // 파일 입력 요소를 참조
  const file = input.files[0]; // 선택한 파일을 가져옴
  if (file) {
    // URL.createObjectURL을 사용하여 파일 URL 생성
    const objectURL = URL.createObjectURL(file);
    // 해당 단계의 이미지 미리보기 요소에 이미지를 표시
    const imgElement = document.getElementById('imgPreview' + step);
    imgElement.src = objectURL;
    imgElement.style.display = 'block'; // 이미지를 표시.
  }
}


function UpdateRpUploadFunc() {
  const title = document.getElementById('title').value;
  const introduceRp = document.getElementById('introduceRp').value;
  const servings = document.getElementById('servings').value;
  const cookingTime = document.getElementById('cookingTime').value;
  const mainImage = document.getElementById('fileInput');
  const stepImg1 = document.getElementById('fileInput1');
  const stepImg2 = document.getElementById('fileInput2');
  const stepImg3 = document.getElementById('fileInput3');
  const stepImg4 = document.getElementById('fileInput4');
  const stepImg5 = document.getElementById('fileInput5');

  // 필수 필드가 비어 있는지 확인하고, 비어 있을 경우 경고 메시지를 표시
  if (!title || !mainImage || !introduceRp || !servings || !cookingTime) {
    alert('모든 필드를 입력해주세요');
    return;
  }

  const recipeId = window.location.pathname.split('/updaterecipe/').pop();

  //재료, 수량 배열
  const amounts = [];
  const ingredients = [];
  const cookingTools = [];
  const stepContents = [];
  document.querySelectorAll('#ingredientList .igdNameSpan').forEach((span) => {
    ingredients.push(span.textContent);
  });
  document.querySelectorAll('#ingredientList .igdAmountSpan').forEach((span) => {
    amounts.push(span.textContent);
  });
  document.querySelectorAll('#cookingToolList .cookingToolName').forEach((span) => {
    cookingTools.push(span.textContent);
  });

  for (let i = 1; i <= 5; i++) {
    const textarea = document.querySelector(`#stepContent${i}`);
    stepContents.push([textarea.value] || ['']);
  }

  const formData = new FormData();
  //이미지
  formData.append('recipeId', recipeId);
  formData.append('title', title);

  formData.append('introduceRp', introduceRp);
  formData.append('servings', servings);
  formData.append('cookingTime', cookingTime);
  formData.append('ingredients', ingredients);
  formData.append('amounts', amounts);
  formData.append('cookingTools', cookingTools);
  formData.append('stepContents', stepContents);
  formData.append('mainImage',  mainImage.files[0]);
  formData.append('files1', stepImg1.files[0]);
  formData.append('files2', stepImg2.files[0]);
  formData.append('files3', stepImg3.files[0]);
  formData.append('files4', stepImg4.files[0]);
  formData.append('files5', stepImg5.files[0]);
  console.log(formData);

  axios({
    method: 'post',
    url: '/api/recipe/updaterecipe',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  })
    .then((res) => {
      console.log('서버 응답', res); // 서버 응답을 콘솔에 출력
      if (res.data.result) {
        alert('레시피 수정 성공! 메인 페이지로 이동 합니다'); // 성공 시 알림 표시
        document.location.href = '/myrecipe'; // 메인 페이지로 이동
      } else {
        alert('레시피 수정 실패' + res.data.message || '알 수 없는 오류'); // 실패 시 오류 메시지 표시
      }
    })
    .catch((error) => {
      console.error('수정 실패:', error); // 업로드 실패 시 오류를 콘솔에 출력
      // alert('업로드 중 오류가 발생했습니다.'); //처리된 알림
    });
}

function cancel() {
  document.location.href = '/myrecipe';
}
