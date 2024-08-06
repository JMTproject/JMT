function fileUploadFunc() {
  const fileInput = document.getElementById('fileInput');
  const imgElement = document.getElementById('uploadedImg');

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imgElement.src = e.target.result;
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}

const serVing = document.getElementById('serving');

//addIngredient
function addIngredient() {
  const ingredientName = document.getElementById('ingredientName').value.trim();
  const ingredientAmount = document.getElementById('ingredientAmount').value.trim();

  if (ingredientName === '' || ingredientAmount === '') {
    alert('재료와 계량을 모두 입력해주세요.');
    return;
  }

  const li = document.createElement('li');
  li.className = 'ingredient-item';

  const text = document.createTextNode(`${ingredientName} ${ingredientAmount}`);
  li.appendChild(text);

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'x';
  removeButton.className = 'remove-btn';
  removeButton.onclick = function () {
    removeIngredient(this);
  };

  li.appendChild(removeButton);

  const ingredientList = document.getElementById('ingredientList');
  ingredientList.appendChild(li);

  document.getElementById('ingredientName').value = '';
  document.getElementById('ingredientAmount').value = '';
}

function removeIngredient(button) {
  const li = button.parentNode;
  li.parentNode.removeChild(li);
}

//addCookingTool
function addCookingTool() {
  const toolName = document.getElementById('toolName').value.trim();

  if (toolName === '') {
    alert('조리 도구를 입력해주세요.');
    return;
  }

  const li = document.createElement('li');
  li.className = 'cooking-tool-item';

  const text = document.createTextNode(toolName);
  li.appendChild(text);

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'x';
  removeButton.className = 'remove-btn';
  removeButton.onclick = function () {
    removeCookingTool(this);
  };

  li.appendChild(removeButton);

  const cookingToolList = document.getElementById('cookingToolList');
  cookingToolList.appendChild(li);

  document.getElementById('toolName').value = '';
}

function removeCookingTool(button) {
  const li = button.parentNode;
  li.parentNode.removeChild(li);
}

//cookingStep
function triggerFileUpload(step) {
  document.getElementById('fileInput' + step).click();
}

function displayImage(event, step) {
  const input = event.target;
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgElement = document.getElementById('imgPreview' + step);
      imgElement.src = e.target.result;
      imgElement.style.display = 'block';
      document.getElementById('upload' + step).style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
}

function writeRpUploadFunc() {
  const title = document.getElementById('title').value;
  const mainImage = document.getElementById('fileInput');
  const introduceRp = document.getElementById('introduceRp').value;
  const servings = document.getElementById('servings').value;
  const cookingTime = document.getElementById('cookingTime').value;
  const stepImg1 = document.querySelector('#fileInput1');
  const stepImg2 = document.querySelector('#fileInput2');
  const stepImg3 = document.querySelector('#fileInput3');
  const stepImg4 = document.querySelector('#fileInput4');
  const stepImg5 = document.querySelector('#fileInput5');

  if (!title || !mainImage || !introduceRp || !servings || !cookingTime) {
    alert('모든 필드를 입력해주세요');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('introduceRp', introduceRp);
  formData.append('servings', servings);
  formData.append('cookingTime', cookingTime);

  const ingredients = [];
  document.querySelectorAll('#ingredientList li').forEach((li) => {
    ingredients.push(li.textContent);
  });
  formData.append('ingredients', JSON.stringify(ingredients));

  const tools = [];
  document.querySelectorAll('#cookingToolList li').forEach((li) => {
    tools.push(li.textContent);
  });
  formData.append('tools', JSON.stringify(tools));

  const steps = [];
  for (let i = 1; i <= 5; i++) {
    const textarea = document.querySelector(`#StepItem${i} textarea`);
    const image = document.querySelector(`#imgPreview${i}`).src;
    if (textarea && textarea.value.trim()) {
      steps.push({
        text: textarea.value,
        image: image,
      });
    }
  }
  formData.append('steps', JSON.stringify(steps));

  // const fileInput = document.getElementById('fileInput');
  // if (fileInput.files.length > 0) {`
  //   formData.append('mainImage', fileInput.files[0]);
  // }

  formData.append('files', mainImage.files[0]);
  formData.append('files', stepImg1.files[0]);
  formData.append('files', stepImg2.files[0]);
  formData.append('files', stepImg3.files[0]);
  formData.append('files', stepImg4.files[0]);
  formData.append('files', stepImg5.files[0]);

  console.log('콘솔확인@@@', formData.files);
  axios({
    method: 'post',
    url: '/api/recipe/writerecipe',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      console.log('서버 응답', res);
      if (res.data.result) {
        alert('레시피 등록 성공! 메인 페이지로 이동 합니다');
        localStorage.setItem('token', res.data.response.token);
        document.location.href = '/';
      } else {
        alert('레시피 등록 실패' + res.data.message || '알 수 없는 오류');
      }
    })
    .catch((error) => {
      console.error('업로드 실패:', error);
      // alert('업로드 중 오류가 발생했습니다.');
    });
}
