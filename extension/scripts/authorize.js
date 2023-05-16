/* 
    (needs patch) 
    IMPLEMENTATION OF AUTHENTICATION ROUTE AFTER REDIRECT FROM GITHUB.
*/

const localAuth = {
  /**
   * Initialize
   */
  init() {
    this.KEY = 'BaekjoonHub_token';
    this.ACCESS_TOKEN_URL = 'https://algopat.kr/api/auth/code';
    this.AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize';
    this.CLIENT_ID = '62a8bd9fd0300fdc6d37';
    // this.CLIENT_SECRET = '4eeaf035a6afe6d4e6fd7698cc2714d1a2076096';
    this.REDIRECT_URL = 'https://github.com/'; // for example, https://github.com
    this.SCOPES = ['repo'];
  },

  /**
   * Parses Access Code
   *
   * @param url The url containing the access code.
   */
  parseAccessCode(url) {
    if (url.match(/\?error=(.+)/)) {
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id, function () { });
      });
    } else {
      // eslint-disable-next-line
      const accessCode = url.match(/\?extension=true&code=([\w\/\-]+)/);
      if (accessCode) {
        this.requestToken(accessCode[1]);
      }
    }
  },

  /**
   * Request Token
   *
   * @param code The access code returned by provider.
   */
  requestToken(code) {

    const that = this;
    // const data = new FormData();
    // data.append('client_id', this.CLIENT_ID);
    // data.append('isExtension', true);
    // // data.append('client_secret', this.CLIENT_SECRET);
    // data.append('code', code);

    const data = {
      code,
      isExtension: "YES",
    }


    fetch('https://algopat.kr/api/auth/code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      const accessToken = res.headers.get("authorization");
      console.log(accessToken)
      if (!accessToken) throw new Error("");
      chrome.runtime.sendMessage({
        closeWebPage: true,
        isSuccess: true,
        token: accessToken,
        KEY: this.KEY,
      })

      alert("로그인이 성공했습니다. 제출 전 extension을 한번 실행해 주세요")

      setTimeout(() => {
        window.close();
      }, 500);

    }).catch((e) => {
      alert("로그인이 실패했습니다")
    })
  },

};

localAuth.init(); // load params.
const link = window.location.href;

/* Check for open pipe */
if (window.location.host === 'algopat.kr') {
  chrome.storage.local.get('pipe_baekjoonhub', (data) => {
    if (data && data.pipe_baekjoonhub) {
      localAuth.parseAccessCode(link);
    }
  });
}
