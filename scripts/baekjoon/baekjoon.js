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

    if (await isProgressRefactoring()) {
      toastThenStopLoader("아직 리팩토링이 진행중입니다", "리팩토링 진행중")
    }

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
          startUpload();
          const bojData = await findData();

          // 날짜가 같은 제출만 보내기
          const [_, year, month, date] = bojData.submissionTime.match(/(\d{4})년\s(\d{1,2})월\s(\d{1,2})일\s(\d{1,2}):(\d{1,2}):(\d{1,2})/);

          const now = new Date();
          const nowYear = now.getFullYear(); // 현재 년도
          const nowMonth = now.getMonth() + 1; // 현재 월 (0부터 시작하므로 1을 더해줌)
          const nowDate = now.getDate(); // 

          if (!(year == nowYear && month == nowMonth && date == nowDate)) {
            toastThenStopLoader("제출 시간이 오늘과 동일해야 전송이 가능합니다", "같은 날짜만!")
            return;
          }

          chrome.storage.local.get(['BaekjoonHub_token', 'gpt_key', 'commit_state'], (data) => {
            const token = data.BaekjoonHub_token;
            const key = data.gpt_key;

            fetch("https://api.openai.com/v1/models",
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${key}`,
                },

              }).then((res) => {
                if (res.status === 200) {
                  bojData.openai_api_key = key;

                  console.log('풀이가 맞았습니다. 전송을 시작합니다..');
                  console.log("보낼 데이터 ", bojData)

                  //fetch 요청
                  return fetch('https://algopat.kr/api/code/problem', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'authorization': token,
                    },
                    body: JSON.stringify(bojData)
                  }).catch((e) => {
                    throw new Error("")
                  })

                } else {
                  throw new Error("key");
                }
              })
              .then((res) => {

                if (res.status == 200) {
                  markUploadedCSS();
                  // 리팩토링 상태 진행중으로 변경
                  chrome.storage.local.set({ commit_state: { submissionId: bojData.submissionId, state: false } }, () => { });
                } else if (res.status == 409) {
                  throw new Error("dupl");
                }

              })
              .catch((e) => {
                if (e.message == "key") {
                  toastThenStopLoader("API Key를 확인해주세요")
                } else if (e.message == "dupl") {
                  toastThenStopLoader("이미 제출한 코드입니다")
                } else {
                  toastThenStopLoader("전송에 실패했습니다")
                }
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
    chrome.storage.local.get(['commit_state'], (data) => {
      console.log("진행중인지 체크 : ", data.commit_state)
      if (data.commit_state && !data.commit_state.state) {
        resolve(true)
      } else {
        resolve(false)
      }
    });
  })

}

// function postData(token, data) {

//   //fetch 요청
//   fetch('https://algopat.kr/api/code/problem', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'authorization': token,
//     },
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       // response.text()
//       markUploadedCSS();
//       // 리팩토링 상태 진행중으로 변경
//       chrome.storage.local.set({ commit_state: "progress" }, () => { });
//     })
//     .catch(error => {
//       // markUploadFailedCSS();
//       toastThenStopLoader("실패했습니다", error);
//       console.error(error)
//     })

// }