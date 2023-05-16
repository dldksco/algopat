let eventSource;

function sseEventListener() {
  chrome.storage.local.get('userSeq', (data) => {

    const userSeq = data.userSeq;

    if (!userSeq) return;

    eventSource = new EventSource(`https://algopat.kr/api/alert/sse/${userSeq}`);

    eventSource.onmessage = function (event) {
      console.log(event)
      const data = JSON.parse(event.data)

      // 로컬 스토리지에 저장
      chrome.storage.local.set(
        { commit_progress: { percentage: data.percentage, progress_info: data.progress_info } }
      );

      if (data.state == "finish") { // 코드 분석 완료
        chrome.notifications.create('my-notification', {
          type: 'basic',
          iconUrl: `chrome-extension://${chrome.runtime.id}/assets/icon.png`,
          title: `${data.progress_info}`,
          message: `${data.progress_info}`
        });
      }


    };

    eventSource.onerror = function (event) {
      console.log("SSE Error : ", event)
      // console.log(JSON.stringify(event))
    }


  });
}

function handleMessage(request) {
  // console.log("receive ", request)
  if (request && request.sseEvent === true) {
    sseEventListener();
  } else if (request && request.closeWebPage === true && request.isSuccess === true) {
    /* Set username */
    // chrome.storage.local.set(
    //   { BaekjoonHub_username: request.username } /* , () => {
    //   window.localStorage.BaekjoonHub_username = request.username;
    // } */,
    // );

    /* Set token */
    chrome.storage.local.set(
      { BaekjoonHub_token: request.token }
    );

    /* Close pipe */
    chrome.storage.local.set({ pipe_BaekjoonHub: false }, () => {
      console.log('Closed pipe.');
    });

    // chrome.tabs.getSelected(null, function (tab) {
    //   chrome.tabs.remove(tab.id);
    // });

    /* Go to onboarding for UX */
    // const urlOnboarding = `chrome-extension://${chrome.runtime.id}/welcome.html`;
    // chrome.tabs.create({ url: urlOnboarding, selected: true }); // creates new tab
  } else if (request && request.closeWebPage === true && request.isSuccess === true) {
    alert('Something went wrong while trying to authenticate your profile!');
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.remove(tab.id);
    });
  }
}


// 현재 활성 창 ID 저장
var activeWindowId = null;

// 활성 창 변경 감지
chrome.windows.onFocusChanged.addListener(function (windowId) {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    activeWindowId = windowId;
  }
});

// 서비스 작업자 비활성화 방지
function preventServiceWorkerDisable() {
  // 현재 활성 창 가져오기
  chrome.windows.getCurrent({ populate: true }, function (window) {
    if (window.id === activeWindowId) {
      console.log("방지")
      // 현재 활성 창이 팝업 창이므로 서비스 작업자 비활성화 방지
      // chrome.windows.update(window.id, { focused: true });
    }
  });
}

// 주기적으로 서비스 작업자 비활성화 방지 실행
setInterval(preventServiceWorkerDisable, 10000);


console.log("background start")
chrome.runtime.onMessage.addListener(handleMessage);

sseEventListener();


