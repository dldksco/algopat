// eslint-disable-next-line no-unused-vars
const oAuth2 = {
  /**
   * Initialize
   */
  init() {
    this.KEY = 'BaekjoonHub_token';
    this.ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
    this.AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize';
    this.CLIENT_ID = '62a8bd9fd0300fdc6d37';
    // this.CLIENT_SECRET = '4eeaf035a6afe6d4e6fd7698cc2714d1a2076096';
    this.REDIRECT_URL = 'https://github.com/'; // for example, https://github.com
    // this.SCOPES = ['repo'];
  },

  /**
   * Begin
   */
  begin() {
    this.init(); // secure token params.

    let url = `${this.AUTHORIZATION_URL}?client_id=${this.CLIENT_ID}&redirect_uri=https://algopat.kr/login-process?extension=true`;

    // for (let i = 0; i < this.SCOPES.length; i += 1) {
    //   url += this.SCOPES[i];
    // }

    chrome.storage.local.set({ pipe_baekjoonhub: true }, () => {
      // opening pipe temporarily

      window.open(
        url,
        "로그인 페이지",
        "height=500, width=500, resizable=false, menubar=false, toolbar=false"
      );

      // chrome.tabs.create({ url, selected: true }, function () {
      //   window.close();
      //   chrome.tabs.getCurrent(function (tab) {
      //     // chrome.tabs.remove(tab.id, function () {});
      //   });
      // });
    });
  },
};
