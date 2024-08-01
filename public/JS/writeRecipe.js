function fileUploadFunc() {
  const fileInput = document.getElementById('fileInput');
  const imgElement = document.getElementById('uploadedImg');

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // 이미지 파일이 성공적으로 읽힌 후 src 속성을 설정합니다.
      imgElement.src = e.target.result;
    };

    // 파일을 읽습니다.
    reader.readAsDataURL(fileInput.files[0]);
  }
}

const serVing = document.getElementById('serving');

function addIngredient() {
  // 재료 이름과 계량을 입력받음
  const ingredientName = document.getElementById('ingredientName').value.trim();
  const ingredientAmount = document.getElementById('ingredientAmount').value.trim();

  // 입력이 비어있는 경우 경고
  if (ingredientName === '' || ingredientAmount === '') {
    alert('재료와 계량을 모두 입력해주세요.');
    return;
  }

  // 새로운 리스트 아이템 생성
  const li = document.createElement('li');
  li.className = 'ingredient-item';

  // 재료 정보 텍스트 생성
  const text = document.createTextNode(`${ingredientName} ${ingredientAmount}`);
  li.appendChild(text);

  // 삭제 버튼 생성
  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'x';
  removeButton.className = 'remove-btn';
  removeButton.onclick = function () {
    removeIngredient(this);
  };

  li.appendChild(removeButton);

  // 리스트에 아이템 추가
  const ingredientList = document.getElementById('ingredientList');
  ingredientList.appendChild(li);

  // 입력 필드 초기화
  document.getElementById('ingredientName').value = '';
  document.getElementById('ingredientAmount').value = '';
}

function removeIngredient(button) {
  const li = button.parentNode;
  li.parentNode.removeChild(li);
}
