let eventSource;

function sseEventListener() {
  chrome.storage.local.get('userSeq', (data) => {

    const userSeq = data.userSeq;

    if (!userSeq) return;

    eventSource = new EventSource(`https://algopat.kr/api/alert/sse/${userSeq}`);

    eventSource.onmessage = function (event) {
      console.log(event)
      const data = JSON.parse(event.data)
      chrome.notifications.create('my-notification', {
        type: 'basic',
        iconUrl: `chrome-extension://${chrome.runtime.id}/assets/icon.png`,
        title: `${data.progress_info}`,
        message: `${data.progress_info}`
      });
    };

    eventSource.onerror = function (event) {
      console.log("SSE Error : ", event)
    }

  });
}

function handleMessage(request) {
  console.log("receive ", request)
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

console.log("background start")
chrome.runtime.onMessage.addListener(handleMessage);

sseEventListener();


