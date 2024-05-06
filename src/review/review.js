// 상세 페이지 영화 id
const similarMovieId = new URLSearchParams(location.search).get("id");

// 리뷰 작성 수행 함수
const controlReview = () => {
  addTable();

  const writeBtn = document.querySelector(".writeBtn");
  writeBtn.addEventListener("click", () => {
    openWriteModal();
    addLocalStorage();
  });

  printReview();
};

// 초기 리뷰 작성 테이블 tr 구현
let addTable = () => {
  const reviewContent = document.querySelector(".reviewContent");
  const reviewTable = document.createElement("table");
  reviewTable.className = "reviewTable";
  reviewTable.innerHTML = `
  <table class="reviewTable">
    <tr>
      <td><input class="reviewText" type="text" placeholder="리뷰 내용 (최대 30자)" size=60 maxlength=30 /></td>
      <td>
        <select class="ratingStar">
          <option value = "none">별점</option>
          <option value = "☆">☆</option>
          <option value = "☆☆">☆☆</option>
          <option value = "☆☆☆">☆☆☆</option>
          <option value = "☆☆☆☆">☆☆☆☆</option>
          <option value = "☆☆☆☆☆">☆☆☆☆☆</option>
        </select>
      </td>
      <td><button class="writeBtn" type="button">작성</button></td>
    </tr>
  </table>
  `;
  reviewContent.appendChild(reviewTable);
};

// 모달창에서 입력된 작성자와, 비밀번호를 받아 localStorage에 저장 후 리로드
let addLocalStorage = () => {
  const reviewText = document.querySelector(".reviewText").value;
  const writer = document.querySelector(".writer").value;
  const ratingStar = document.querySelector(".ratingStar").value;

  const checkBtn = document.querySelector(".checkBtn");
  const reviewModal = document.querySelector(".reviewModal");

  checkBtn.addEventListener("click", () => {
    reviewModal.style.display = "none";
    let reviewPassword = document.querySelector(".reviewPassword").value;
    let writer = document.querySelector(".writer").value;

    const reviewArrJson = JSON.stringify([reviewText, writer, ratingStar, reviewPassword]);
    localStorage.setItem(`${similarMovieId} ${writer}`, reviewArrJson);

    location.reload(true);
  });
};

// 영화 id를 확인하여 해당 영화의 리뷰를 출력
let printReview = () => {
  const reviewTable = document.querySelector(".reviewTable");

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const splitKey = key.split(" ");
    if (splitKey[0] === similarMovieId) {
      const reviewArr = JSON.parse(localStorage.getItem(key));
      const newRow = reviewTable.insertRow(0);
      newRow.innerHTML = `
      <tr class="reviewRow">
        <td>${reviewArr[0]}</td>
        <td>${reviewArr[1]}</td>
        <td>${reviewArr[2]}</td>
        <td>
          <button class="writeBtn" type="button">수정</button>
          <button class="writeBtn" type="button">삭제</button>
        </td>
      </tr>
    `;
      // 비밀번호 확인용 콘솔
      // console.log(reviewArr[3]);
    }
  }
};

// 리뷰 작성 모달창 구현
let openWriteModal = () => {
  const closeWriteModal = document.querySelector(".closeWriteModal");
  const reviewModal = document.querySelector(".reviewModal");
  const closeBtn = document.querySelector(".closeBtn");

  closeWriteModal.addEventListener("click", () => {
    reviewModal.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    reviewModal.style.display = "none";
  });

  let clickWrite = () => {
    reviewModal.style.display = "block";
  };

  clickWrite();
};

// 리뷰 작성 수행 함수 실행
controlReview();
