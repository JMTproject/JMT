document.addEventListener("DOMContentLoaded", function() {
    // ID 및 비밀번호 입력 필드를 가져옵니다.
    let loginIdInput = document.getElementById("input_login_id");
    let loginPwdInput = document.getElementById("input_login_pwd");

    // 부모 컨테이너를 가져옵니다.
    let idContainer = loginIdInput.closest('.login_input_container'); 
    let pwdContainer = loginPwdInput.closest('.login_input_container');

    // 입력 필드의 상태를 확인하고 클래스를 추가/제거하는 함수입니다.
    function checkInputValue(input, container) {
        if (input.value.trim() !== "") {
            container.classList.add("isTyping");
        } else {
            container.classList.remove("isTyping");
        }
    }

    // 이벤트 리스너를 추가하여 입력 필드의 상태가 변경될 때마다 함수를 호출합니다.
    loginIdInput.addEventListener("input", function() {
        checkInputValue(loginIdInput, idContainer);
    });

    loginPwdInput.addEventListener("input", function() {
        checkInputValue(loginPwdInput, pwdContainer);
    });

    // 페이지 로드 시 초기 상태를 설정합니다.
    checkInputValue(loginIdInput, idContainer);
    checkInputValue(loginPwdInput, pwdContainer);
});


document.addEventListener("DOMContentLoaded", function() {
    let loginIdInput = document.getElementById("input_login_id");
    let loginPwInput = document.getElementById("input_login_pwd");
    let loginButton = document.querySelector(".login_button");

    function updateLoginButtonState() {
        loginButton.disabled = loginIdInput.value.trim() === "" || loginPwInput.value.trim() === "";
    }

    loginIdInput.addEventListener("input", updateLoginButtonState);
    loginPwInput.addEventListener("input", updateLoginButtonState);

    updateLoginButtonState();
});
