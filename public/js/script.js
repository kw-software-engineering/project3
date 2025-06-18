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

                localStorage.setItem('userId', userId);
                localStorage.setItem('role', data.role);

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

// 로그아웃 버튼연결

function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    alert('로그아웃되었습니다.');
    location.href = '/html/login.html';
}

document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    const loginPageNames = ['login.html', 'signup.html'];
    const isLoginFreePage = loginPageNames.some(name => window.location.href.includes(name));

    // ✅ 변수는 조건문 밖에서 선언
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (!isLoginFreePage) {
        if (!userId || !role) {
            alert("로그인 정보가 없습니다.");
            location.href = "/html/login.html";
            return;
        }

        // ✅ fetch도 여기 안에서 실행
        fetch(`/api/userinfo?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const name = data.user.name;
                    const id = data.user.id;

                    const roleTextMap = {
                        '1': '학생',
                        '2': '교수',
                        '3': '교직원'
                    };

                    const departmentMap = {
                        '1': '컴퓨터정보공학부',
                        '2': '컴퓨터정보공학부',
                        '3': '학사관리부서'
                    };

                    const roleText = roleTextMap[role];
                    const dept = departmentMap[role];

                    const userInfoElem = document.getElementById('user-info');
                    const userDeptElem = document.getElementById('user-department');

                    if (userInfoElem) userInfoElem.textContent = `${name} (${id})`;
                    if (userDeptElem) userDeptElem.textContent = `${dept}(${roleText})`;
                } else {
                    alert('사용자 정보를 불러올 수 없습니다.');
                }
            })
            .catch(err => {
                console.error('오류 발생:', err);
                alert('서버 오류로 사용자 정보를 불러올 수 없습니다.');
            });
    }
});


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