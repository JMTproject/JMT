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
function fileUpload() {
  const upload = document.querySelector('upload');

  upload.addEventListener('click', () => realUpload.click());
}
