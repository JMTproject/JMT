const { GoogleGenerativeAI } = require('@google/generative-ai');
const cookingTools = require('../models/cookingTools');
const cookingStep = require('../models/cookingStep');

const genAI = new GoogleGenerativeAI('AIzaSyBC2B3cxscH9OO6guCY_HegvBrYIYb7ZKw');
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generateRecipe = async (req, res) => {
  const { cookingName } = req.body;

  const prompt = `이제 너는 ${cookingName}에 대한 레시피를 알려줄건데, 너가 대답해준 사항으로 
    레시피 게시글을 작성할거야, 한국어로 대답해야되고, 너가 제시해 줘야할건
    레시피 제목(1개), 해당 레시페에 대한 간단한 소개, 조리시간(30분 이내), 조리도구, 재료(반드시 10가지 이하, 대한민국에서 구할수 있는 재료)와 각 재료의 수량,
    조리단계(5단계 이하)별 조리과정을 제시해줄건데 아래의 폼에 맞춰서 대답해주면돼,
    너가 작성해준 내용을 잘라서 자바스크립트코드에 활용할거기 때문에 양식을 정확하게 지켜야해
    너는 '내용'이라고 된곳에 기입만 하면되고, #$%는 그대로 유지해서 출력해야해
    그리고 재료와 각재료의 수량은 순서에 맞게 대응되게 작성하면 되고, 조리 시간은 무조건 분단위로 숫자만 기입해.
    인분은 몇인분인지 숫자만 기입해, 예를 들어 1.5인분이면 '1.5', 3인분이면 '3' 이런식으로.
    조리단계에서는 '1단계' 혹은 '1.'과 같은 순서를 표기하는건 빼
    '
    ## 게시글 제목: #$%내용#$%
    ## 레시피 소개: #$%내용#$%
    ## 인분: #$%내용#$%
    ## 조리시간: #$%내용#$%
    ## 조리도구: #$%["내용", "내용", "내용", "내용"]#$%
    ## 재료: #$%["내용", "내용", "내용", "내용"]#$% 
    ## 각 재료의 수량: #$%["내용", "내용", "내용", "내용"]#$% 
    ## 조리단계: #$%["내용", "내용", "내용", "내용"]#$%
    '
    `;

  //   console.log(prompt);
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const response = text.split('#$%');

    const recipeTitle = response[1];
    const description = response[3];
    const servings = response[5];
    const cookingTime = response[7];
    const cookingTools = JSON.parse(response[9]);
    const ingredients = JSON.parse(response[11]);
    const quantity = JSON.parse(response[13]);
    const cookingSteps = JSON.parse(response[15]);

    const data = { recipeTitle, description, servings, cookingTime, cookingTools, ingredients, quantity, cookingSteps };

    res.json(data);
  } catch (error) {
    res.status(500).json({ response: '오류' });
  }
};

module.exports = { generateRecipe };
