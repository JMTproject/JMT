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
    // console.log('recipeTitle@@@@@@', res.data.recipe.recipeTitle);
    // console.log('ingredientName@@@@@@', res.data.ingredient[0].ingredientName);
    // console.log('quantity@@@@@@', res.data.ingredient[0].quantity);
    // console.log('toolName@@@@@@', res.data.cookingtools[0].toolName);
    // console.log('content@@@@@@', res.data.cookingstep[0].content);
    // console.log('stepImg@@@@@@', res.data.cookingstep[0].stepImg);

    document.querySelector('#title').value = res.data.recipe.recipeTitle;
    document.querySelector('#introduceRp').value = res.data.recipe.description;
    document.querySelector('#servings').value = res.data.recipe.servings;
    document.querySelector('#cookingTime').value = res.data.recipe.cookingTime;
    document.querySelector('#uploadedImg').src = res.data.recipe.mainImg;

    for (let i = 0; i < res.data.ingredient.length; i++) {
      document.querySelector('#ingredientName').value = res.data.ingredient[i].ingredientName;
      document.querySelector('#ingredientAmount').value = res.data.ingredient[i].quantity;
      addIngredient();
    }

    for (let i = 0; i < res.data.cookingtools.length; i++) {
      document.querySelector('#toolName').value = res.data.cookingtools[i].toolName;
      addCookingTool();
    }

    for (let i = 0; i < res.data.cookingstep.length; i++) {
      document.querySelector(`#stepContent${i + 1}`).value = res.data.cookingstep[i].content;
      // console.log(`${i}img${res.data.cookingstep$[i].stepImg}`);
      document.querySelector(`#imgPreview${i + 1}`).src = res.data.cookingstep[i].stepImg;
      // console.log(`${i}content`, res.data.cookingstep[i].content);
    }
  } catch (error) {
    console.error('Error fetching recipe data or verifying token:', error);
    alert('데이터를 불러오는 중 오류가 발생했습니다.');
  }
})();

//
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

  //새로운 <li> 요소를 생성
  const li = document.createElement('li');
  //<li> 요소에 클래스 이름 'ingredient-item'을 추가
  li.className = 'ingredient-item';

  //재료 이름과 계량을 텍스트 노드로 생성, 이를 <li> 요소에 추가
  const igdNameSpan = document.createElement('span');
  igdNameSpan.className = 'igdNameSpan';
  igdNameSpan.textContent = `${ingredientName}`;

  const igdAmountSpan = document.createElement('span');
  igdAmountSpan.className = 'igdAmountSpan';
  igdAmountSpan.textContent = `${ingredientAmount}`;

  //삭제 버튼 생성
  const removeButton = document.createElement('button');
  // removeButton.innerHTML = 'x';
  removeButton.className = 'remove-btn';

  //삭제 버튼이 클릭되면 실행될 함수를 설정
  removeButton.onclick = function () {
    removeIngredient(this);
  };
  //삭제 버튼을 <li> 요소에 추가
  li.appendChild(removeButton);

  //재료 리스트를 나타내는 <ul> 요소룰 가져와서, 새로 생성한<li> 요소를 추가
  const ingredientList = document.getElementById('ingredientList');
  ingredientList.appendChild(li);
  li.appendChild(igdNameSpan);
  li.appendChild(igdAmountSpan);

  //입력 필드를 초기화
  document.getElementById('ingredientName').value = '';
  document.getElementById('ingredientAmount').value = '';
}

function removeIngredient(button) {
  //삭제 버튼의 부모 요소인 <li> 요소를 가져 옴
  const li = button.parentNode;
  //<li> 요소를 리스트에서 제거
  li.parentNode.removeChild(li);
}

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

  // 조리 도구 이름을 텍스트 노드로 생성하고, 이를 <li> 요소에 추가
  const text = document.createTextNode(toolName);
  li.appendChild(text);

  // 삭제 버튼을 생성
  const removeButton = document.createElement('button');
  // removeButton.innerHTML = 'x';
  removeButton.className = 'remove-btn';
  // 삭제 버튼이 클릭되면 실행될 함수를 설정
  removeButton.onclick = function () {
    removeCookingTool(this);
  };

  // 삭제 버튼을 <li> 요소에 추가
  li.appendChild(removeButton);

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
  li.parentNode.removeChild(li);
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
  // 사용자가 입력한 각 필드의 값을 가져옴
  const title = document.getElementById('title').value;
  const mainImage = document.getElementById('uploadedImg');
  const introduceRp = document.getElementById('introduceRp').value;
  const servings = document.getElementById('servings').value;
  const cookingTime = document.getElementById('cookingTime').value;
  const stepImg1 = document.getElementById('imgPreview1');
  const stepImg2 = document.getElementById('imgPreview2');
  const stepImg3 = document.getElementById('imgPreview3');
  const stepImg4 = document.getElementById('imgPreview4');
  const stepImg5 = document.getElementById('imgPreview5');

  // 필수 필드가 비어 있는지 확인하고, 비어 있을 경우 경고 메시지를 표시
  if (!title || !mainImage || !introduceRp || !servings || !cookingTime) {
    alert('모든 필드를 입력해주세요');
    return;
  }

  // const data = {
  //   recipeId,
  //   title,
  //   introduceRp,
  //   servings,
  //   cookingTime,
  //   ingredientNames,
  //   ingredientAmounts,
  //   tools,
  //   stepContents,
  // };

  // 서버로 전송할 폼 데이터를 생성
  const formData = new FormData();
  formData.append('11', 11);
  console.log();
  console.log('title!!!!', title);
  formData.append('title', title);
  console.log('data!!!!', formData);
  formData.append('introduceRp', introduceRp);
  formData.append('servings', servings);
  formData.append('cookingTime', cookingTime);

  // 재료 목록을 배열로 만들어 폼 데이터에 추가
  const ingredientNames = [];
  document.querySelectorAll('#ingredientList .igdNameSpan').forEach((span) => {
    ingredientNames.push(span.textContent);
  });
  const ingredientAmounts = [];
  document.querySelectorAll('#ingredientList .igdAmountSpan').forEach((span) => {
    ingredientAmounts.push(span.textContent);
  });

  // console.log('igdName!!!', ingredientNames);
  formData.append('ingredientNames', JSON.stringify(ingredientNames));
  formData.append('ingredientAmounts', JSON.stringify(ingredientAmounts));

  // 조리 도구 목록을 배열로 만들어 폼 데이터에 추가
  const tools = [];
  document.querySelectorAll('#cookingToolList li').forEach((li) => {
    tools.push(li.textContent);
  });
  formData.append('tools', JSON.stringify(tools));

  // 요리 단계와 이미지 파일을 배열로 만들어 폼 데이터에 추가

  const stepContents = [];
  for (let i = 1; i <= 5; i++) {
    const textarea = document.querySelector(`#stepContent${i}`);

    stepContents.push(textarea.value || '');
  }
  console.log('step!!!!', stepContents);

  formData.append('stepContents', JSON.stringify(stepContents));

  // if (mainImage.files[0]) {
  //   formData.append('files1', mainImage.files[0]);
  // }
  // console.log('메인이미지!!!!', mainImage.files[0]);

  // if (stepImg1.files[0]) {
  //   formData.append('files2', stepImg1.files[0]);
  // }
  // if (stepImg2.files[0]) {
  //   formData.append('files3', stepImg2.files[0]);
  // }
  // if (stepImg3.files[0]) {
  //   formData.append('files4', stepImg3.files[0]);
  // }
  // if (stepImg4.files[0]) {
  //   formData.append('files5', stepImg4.files[0]);
  // }
  // if (stepImg5.files[0]) {
  //   formData.append('files6', stepImg5.files[0]);
  // }

  // formData.append('files1', mainImage.files[0]);

  // formData.append('files2', stepImg1.files[0]);
  // formData.append('files3', stepImg2.files[0]);
  // formData.append('files4', stepImg3.files[0]);
  // formData.append('files5', stepImg4.files[0]);
  // formData.append('files6', stepImg5.files[0]);
  for (let i = 1; i <= 5; i++) {
    const fileInput = document.getElementById(`fileInput${i}`);
    if (fileInput.files.length > 0) {
      formData.append(`files${i}`, fileInput.files[0]);
    }
  }
  console.log('메인이미지!!!!', mainImage.files[0]);
  // console.log('콘솔확인@@@', mainImage.files[0]); // 폼 데이터에 있는 파일들을 콘솔에 출력
  // console.log(title);

  const recipeId = window.location.pathname.split('/updaterecipe/').pop();
  formData.append('recipeId', recipeId);
  console.log('reId!!', recipeId);

  // Axios를 사용하여 폼 데이터를 서버에 전송
  console.log('폼데이터-툴즈!!', formData);
  axios({
    method: 'post',
    url: `/api/recipe/updaterecipe`, // 서버의 API 엔드포인트
    data: formData,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
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
