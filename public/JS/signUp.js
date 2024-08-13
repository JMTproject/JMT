async function emailCheckFunc() {
    const email = document.querySelector('#email');
    const authCode = document.querySelector('#authCode');
    const emailBtn = document.querySelector('#emailFuncBtn');
    const authBtn = document.querySelector('#authCheckBtn');
    const emailP = document.querySelector('#emailResult');
    const authDiv = document.querySelector('#authDiv');
    const data = { email: email.value };

    emailBtn.textContent = '재전송';

    let res;
    try {
        res = await axios({
            method: 'post',
            url: '/api/user/emailcheck',
            data,
        });
    } catch (error) {
        emailP.textContent = '이미 존재하는 이메일입니다.';
        emailP.style.color = 'red';
        return;
    }

    if (res.data.result) {
        try {
            emailP.textContent = '이메일을 전송하였습니다.';
            emailP.style.color = 'green';
            res = await axios({
                method: 'post',
                url: '/api/user/mail',
                data,
            });
            if (res.data.result) {
                console.log(res.data.code);
                email.disabled = true;
                emailP.textContent = '인증번호를 입력해주세요.';
                emailP.style.color = 'green';
                authCode.hidden = false;
                authBtn.hidden = false;
                authDiv.hidden = false;

                authCode.dataset.code = res.data.code;
            } else {
                emailP.textContent = '이메일을 입력해주세요.';
                emailP.style.color = 'red';
            }
        } catch {
            console.log('네트워크 에러');
        }
    }
}

document.querySelector('#authCheckBtn').addEventListener('click', function () {
    const authCode = document.querySelector('#authCode');
    const authBtn = document.querySelector('#authCheckBtn');
    const emailP = document.querySelector('#emailResult');
    const authP = document.querySelector('#authResult');
    const authDiv = document.querySelector('#authDiv');
    const emailBtn = document.querySelector('#emailFuncBtn');
    const inputCode = authCode.value;
    const savedCode = authCode.dataset.code;

    authCheckFunc(savedCode, inputCode, emailP, authP, authCode, authBtn, authDiv, emailBtn);
});

async function authCheckFunc(authcode, inputcode, emailP, authP, authCode, authBtn, authDiv, emailBtn) {
    if (String(authcode) === String(inputcode)) {
        emailP.textContent = '인증이 완료되었습니다.';
        emailP.style.color = 'green';
        authCode.hidden = true;
        authBtn.hidden = true;
        authP.hidden = true;
        authDiv.hidden = true;
        emailBtn.textContent = '완료';
    } else {
        authP.textContent = '인증번호를 확인해주세요';
        authP.style.color = 'red';
    }
}

function PwdCheck() {
    const pwd1 = document.querySelector('#pwd1').value;
    const pwd2 = document.querySelector('#pwd2').value;
    const checkPwd = document.querySelector('#checkPwd');
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;
    if (passwordRegex.test(pwd1)) {
        if (pwd1 === pwd2) {
            checkPwd.textContent = '비밀번호가 일치합니다.';
            checkPwd.style.color = 'green';
        } else {
            checkPwd.textContent = '비밀번호가 일치하지 않습니다.';
            checkPwd.style.color = 'red';
        }
    } else {
        checkPwd.textContent = '비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.';
        checkPwd.style.color = 'red';
    }
}

function NNcheckFunc() {
    const checkNN = document.querySelector('#checkNN');
    const nickName = document.querySelector('#nickname');
    const NNBtn = document.querySelector('#NNBtn');
    const data = {
        nickName: nickName.value,
    };

    if (NNBtn.textContent === '중복검사') {
        axios({
            method: 'get',
            url: '/api/user/findNN',
            params: data,
        }).then((res) => {
            if (res.data.result) {
                checkNN.textContent = '사용 가능한 닉네임입니다.';
                checkNN.style.color = 'green';
                nickName.disabled = true;
                NNBtn.textContent = '수정';
            } else {
                checkNN.textContent = '이미 존재하는 닉네임입니다.';
                checkNN.style.color = 'red';
            }
        });
    } else {
        nickName.value = '';
        nickName.disabled = false;
        NNBtn.textContent = '중복검사';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const emailResult = document.querySelector('#emailResult');
    const checkPwd = document.querySelector('#checkPwd');
    const checkNN = document.querySelector('#checkNN');
    const checkBox = document.querySelector('#signUpRadioInput');
    const signUpBtn = document.querySelector('#signUpBtn');

    function updateButton() {
        const email = emailResult.textContent === '인증이 완료되었습니다.';
        const pwd = checkPwd.textContent === '비밀번호가 일치합니다.';
        const name = checkNN.textContent === '사용 가능한 닉네임입니다.';
        const box = checkBox.checked;

        if (email && pwd && name && box) {
            signUpBtn.disabled = false;
            signUpBtn.style.backgroundColor = '#fca391';
            signUpBtn.style.border = '1px solid #fca391';
            signUpBtn.style.cursor = 'pointer';
        } else {
            signUpBtn.disabled = true;
            signUpBtn.style.backgroundColor = '#fdd8d1';
            signUpBtn.style.border = '1px solid #fca391';
            signUpBtn.style.cursor = 'not-allowed';
        }
    }

    emailResult.addEventListener('change', updateButton);
    checkPwd.addEventListener('change', updateButton);
    checkNN.addEventListener('change', updateButton);
    checkBox.addEventListener('change', updateButton);
});

function checkBoxFunc() {
    const agreement = document.querySelector('#agreement');
    agreement.hidden = false;
}

function closeBoxFunc() {
    const agreement = document.querySelector('#agreement');
    agreement.hidden = true;
}

function signUpFunc() {
    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('pwd1').value,
        nickName: document.getElementById('nickname').value,
    };

    axios({
        method: 'post',
        url: '/api/user/signup',
        data,
    }).then((res) => {
        if (res.data.result) {
            alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
            // document.location.href = '/login';
        }
    });
}
