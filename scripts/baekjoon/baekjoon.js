// Set to true to enable console log
const debug = false;

/* 
  문제 제출 맞음 여부를 확인하는 함수
  2초마다 문제를 파싱하여 확인
*/
let loader;

const currentUrl = window.location.href;
log(currentUrl);

// 문제 제출 사이트의 경우에는 로더를 실행하고, 유저 페이지의 경우에는 버튼을 생성한다.
// 백준 사이트 로그인 상태이면 username이 있으며, 아니면 없다.
const username = findUsername();
if (!isNull(username)) {
  if (['status', `user_id=${username}`, 'problem_id', 'from_mine=1'].every((key) => currentUrl.includes(key))) startLoader();
  else if (currentUrl.match(/\.net\/problem\/\d+/) !== null) parseProblemDescription();
}

function startLoader() {
  loader = setInterval(async () => {

    // if (isProgressRefactoring()) {
    //   toastThenStopLoader("아직 리팩토링이 진행중입니다", "리팩토링 진행중")
    // }

    // 기능 Off시 작동하지 않도록 함
    const enable = await checkEnable();
    if (!enable) stopLoader();
    else if (isExistResultTable()) {
      const table = findFromResultTable();
      // console.log("table ",table)
      if (isEmpty(table)) return;
      const data = table[0];
      if (data.hasOwnProperty('username') && data.hasOwnProperty('resultCategory')) {
        const { username, resultCategory } = data;
        if (username === findUsername() && resultCategory.includes(RESULT_CATEGORY.RESULT_ACCEPTED)) {
          stopLoader();
          console.log('풀이가 맞았습니다. 전송을 시작합니다..');
          startUpload();
          const bojData = await findData();

          console.log("보낼 데이터 ", bojData)

          // 리팩토링 상태 진행중으로 변경
          chrome.storage.local.set({ commit_state: "progress" }, () => { });


          chrome.storage.local.get(['BaekjoonHub_token', 'gpt_key'], (data) => {
            const token = data.BaekjoonHub_token;
            const key = data.gpt_key;

            bojData.openai_api_key = key;

            //fetch 요청
            fetch('https://algopat.kr/api/code/problem', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': token,
              },
              body: JSON.stringify(bojData)
            })
              .then(response => {
                // response.text()
                markUploadedCSS();
              })
              .catch(error => {
                // markUploadFailedCSS();
                toastThenStopLoader("실패했습니다", error);
                console.error(error)
              })
          })

          // await beginUpload(bojData);
        }
      }
    }
  }, 2000);
}

function stopLoader() {
  clearInterval(loader);
  loader = null;
}

function toastThenStopLoader(toastMessage, errorMessage) {
  Toast.raiseToast(toastMessage);
  stopLoader();
  throw new Error(errorMessage);
}

async function isProgressRefactoring() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('commit_state', (data) => {
      if (data.commit_state == "progress") {
        resolve(true)
      }
    });
    resolve(false)
  })

}