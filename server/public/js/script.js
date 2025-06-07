function login() {
    const userId = document.getElementById("userId").value;
    const userPwd = document.getElementById("userPwd").value;

    if (!userId || !userPwd) {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }

    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userPwd })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // 숫자 role → 문자열로 매핑
                const roleMap = {
                    1: 'student',
                    2: 'professor',
                    3: 'staff'
                };

                const roleValue = roleMap[data.role];

                if (roleValue) {
                    alert(`${roleValue}로 로그인되었습니다.`);
                    location.href = `/html/${roleValue}_main.html`;
                } else {
                    alert('알 수 없는 사용자 유형입니다.');
                }
            } else {
                alert(data.message);
            }
        })
        .catch(err => console.error(err));
}

// 로그아웃 함수 (login 함수 밖)
function logout() {
    alert('로그아웃되었습니다.');
    location.href = '/html/login.html';
}

// 로그아웃 버튼연결
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

//자동 로그아웃 타이머 
let remainingSeconds = 3600;
const timerElement = document.getElementById("timer");

function updateTimer() {
    if (remainingSeconds <= 0) {
        alert("1시간이 지나 자동 로그아웃됩니다.");
        location.href = "/html/login.html";
        return;
    }

    remainingSeconds--;

    const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
    const secs = String(remainingSeconds % 60).padStart(2, '0');

    if (timerElement) {
        timerElement.textContent = `${mins}:${secs}`;
    }
}

setInterval(updateTimer, 1000);