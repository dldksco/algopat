function handleMessage(request) {
  console.log("receive")
  if (request && request.closeWebPage === true && request.isSuccess === true) {
    /* Set username */
    // chrome.storage.local.set(
    //   { BaekjoonHub_username: request.username } /* , () => {
    //   window.localStorage.BaekjoonHub_username = request.username;
    // } */,
    // );

    /* Set token */
    chrome.storage.local.set(
      { BaekjoonHub_token: request.token } /* ]], () => {
      window.localStorage[request.KEY] = request.token;
    } */,
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

chrome.runtime.onMessage.addListener(handleMessage);

chrome.storage.local.get('userSeq', (data) => {

  const userSeq = data.userSeq;

  if (!userSeq) return;

  let eventSource = new EventSource(`https://algopat.kr/api/alert/sse/${userSeq}`);

  eventSource.onmessage = function (event) {
    console.log(event)
    chrome.notifications.create('my-notification', {
      type: 'basic',
      iconUrl: `chrome-extension://${chrome.runtime.id}/assets/icon.png`,
      title: '분석완료',
      message: '코드리펙토링이 완료되었습니다'
    });
  };

  eventSource.onerror = function (event) {
    console.log("SSE Error : ", event)
  }

});


