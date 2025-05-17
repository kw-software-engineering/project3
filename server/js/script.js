function login() {
    const userId = document.getElementById("userId").value;
    const userPwd = document.getElementById("userPwd").value;
    const rememberId = document.getElementById("rememberId").checked;

    if (!userId || !userPwd) {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }


	//확인용
	if (userId == 1){ //학생
		alert("학생으로 로그인되었습니다.");
        location.href = "../html/student_main.html";
        return;
	}
	if (userId == 2) {//교수
		alert("교수로 로그인되었습니다.");
        location.href = "../html/professor_main.html";
        return;
	}

    alert("로그인 요청이 전송되었습니다.");
}


let remainingSeconds = 3600; // 1시간 = 3600초
const timerElement = document.getElementById("timer");

function updateTimer() {
  if (remainingSeconds <= 0) {
    alert("1시간이 지나 자동 로그아웃됩니다.");
    location.href = "login.html"; // 로그인 페이지 경로
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