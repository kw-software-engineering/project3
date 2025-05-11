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
