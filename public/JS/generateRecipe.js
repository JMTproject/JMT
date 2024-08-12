// AI활용 레시피 생성---------------------------------------------- hyun

async function generateRecipe() {
  document.querySelector('#ingredientList').replaceChildren();
  document.querySelector('#cookingToolList').replaceChildren();

  const cookingName = document.querySelector('#inputAI').value;

  const res = await axios({
    method: 'post',
    url: '/api/recipe/generateRecipe',
    data: { cookingName },
  });

  console.log('제미나이응답 : ', res.data);
  const { recipeTitle, description, servings, cookingTime, cookingTools, ingredients, quantity, cookingSteps } =
    res.data;
  document.querySelector('#title').value = recipeTitle;
  document.querySelector('#introduceRp').value = description;
  document.querySelector('#servings').value = servings;
  document.querySelector('#cookingTime').value = Number(cookingTime);

  for (let i = 0; i < cookingTools.length; i++) {
    document.querySelector('#toolName').value = cookingTools[i];
    addCookingTool();
  }
  for (let i = 0; i < ingredients.length; i++) {
    document.querySelector('#ingredientName').value = ingredients[i];
    document.querySelector('#ingredientAmount').value = quantity[i];
    addIngredient();
  }
  for (let i = 0; i < cookingSteps.length; i++) {
    document.querySelector(`#stepContent${i + 1}`).value = cookingSteps[i];
  }

  //   document.querySelector('#ingredientName').value = '테스트';
  //   document.querySelector('#ingredientAmount').value = '1개';
  document.querySelector('#inputAI').value = '';
}

function openInputBox() {
  const inputAI = document.querySelector('#inputAI');
  const generateButton = document.querySelector('#generateButton');
  if (inputAI.style.display === 'none') {
    inputAI.style.display = 'block';
    generateButton.style.display = 'block';
  } else {
    inputAI.style.display = 'none';
    generateButton.style.display = 'none';
  }
}