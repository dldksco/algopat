/* global oAuth2 */
/* eslint no-undef: "error" */
let action = false;
const blockElement = `#popup_container #col div[style*="display: block"]`

// 깃허브 로그인 버튼 클릭
$('#authenticate').on('click', () => {
  if (action) {
    oAuth2.begin();
    setTimeout(() => {
      window.close();
    }, 500);
  }
});

// // 임시
// $('#api_key_button').on('click', () => {
//   $("#auth_mode").hide();

//   $("#commit_mode").show();
//   $('#gear_icon').show();

// })

// api key 저장 버튼 클릭
$('#api_key_save').on('click', () => {
  const value = $('#api_key').val()


  fetch("https://api.openai.com/v1/models",
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${value}`,
      },

    }).then((res) => {
      if (res.status === 200) {
        chrome.storage.local.set({ "gpt_key": value }, () => { })
        $("#save_message").html("<p style='color: green;'>저장되었습니다</p>")
      } else {
        $("#save_message").html("<p style='color: red;'>유효하지 않은 키입니다</p>")
      }
    }).catch(() => {
      $("#save_message").html("<p style='color: red;'>유효하지 않은 키입니다</p>")
    })


})

/*
  활성화 버튼 클릭 시 storage에 활성 여부 데이터를 저장.
 */
$('#onffbox').on('click', () => {
  chrome.storage.local.set({ bjhEnable: $('#onffbox').is(':checked') }, () => { });
});


// 세팅 박스 클릭
$('#gear_icon').on('click', () => {

  const blockElementId = $(blockElement)[0].id;

  $(blockElement).hide();

  if (blockElementId == 'commit_mode') {
    $("#setting_mode").show();
  } else {
    $("#commit_mode").show();
  }
});

///////////////////////////////////////////////////////////////////////////////////
/*
  깃허브 auth 로그인
 */
chrome.storage.local.get(['BaekjoonHub_token', 'commit_state'], (data) => {
  const token = data.BaekjoonHub_token;
  const commit_state = data.commit_state;
  // console.log(token)
  if (token === null || token === undefined) {
    action = true;
    $('#auth_mode').show();
  } else {
    // To validate user, load user object from GitHub.
    // const AUTHENTICATION_URL = 'https://api.github.com/user';

    fetch('https://algopat.kr/api/auth/token/parse', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    }).then((res) => {

      if (res.status == 401) {
        throw new Error("로그인 정보가 유효하지 않습니다.")
      } else {
        return res.json()
      }
    })
      .then((data) => {
        console.log(data)

        $('#commit_mode').show();
        $('#gear_icon').show();

        chrome.storage.local.set({ userGithubId: data.userGithubId }, () => { });
        chrome.storage.local.set({ userSeq: data.userSeq }, () => { });

        chrome.runtime.sendMessage({
          sseEvent: true
        })

        commitMode(commit_state, token);

      }).catch((e) => {
        console.error(e)
        $('#auth_mode').show();
      })
  }
});


/*
  초기에 활성화 데이터가 존재하는지 확인, 없으면 새로 생성, 있으면 있는 데이터에 맞게 버튼 조정
 */
chrome.storage.local.get('bjhEnable', (data4) => {
  if (data4.bjhEnable === undefined) {
    $('#onffbox').prop('checked', true);
    chrome.storage.local.set({ bjhEnable: $('#onffbox').is(':checked') }, () => { });
  } else {
    $('#onffbox').prop('checked', data4.bjhEnable);
    chrome.storage.local.set({ bjhEnable: $('#onffbox').is(':checked') }, () => { });
  }
});

/*
  코드 리팩토링 상태
 */
function commitMode(commit_state, token) {
  console.log("commit_state : ", commit_state)
  if (commit_state && commit_state.submissionId && !commit_state.state) { // 코드 분석 진행중

    fetch(`https://algopat.kr/api/code/problem/submission/solution/exist/${commit_state.submissionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    }).then((res) => res.json())
      .then(data => {
        if (data.data) { // 분석 완료
          if (commit_state.problemId && commit_state.title)
            $('#commit_state_text').html(`<p>${commit_state.problemId} ${commit_state.title}</p>`);

          let url = `https://algopat.kr/extension?problemtitle=${commit_state.title}&problemid=${commit_state.problemId}&problemlevel=${commit_state.level}&submissionid=${commit_state.submissionId}&token=${token}`

          $('#commit_state_text').after(`<p>코드 분석이 완료되었습니다</p><p><a title="myLink" id="myCodeLink" href="${url}" target="_blank">분석 결과 보기</a></p>`);
          chrome.storage.local.set({ commit_state: { ...commit_state, state: true } }, () => { });
        } else { // 분석 진행중
          if (commit_state.problemId && commit_state.title)
            $('#commit_state_text').html(`<p>${commit_state.problemId} ${commit_state.title}</p>`);
          $('#commit_state_text').after('<p>코드 분석이 진행중입니다</p><div class="spinner"></div>');
        }
      }).catch((e) => {
        $('#commit_state_text').html('<p>에러!!</p>');
      })

  } else if (commit_state && commit_state.submissionId && commit_state.state) {
    $('#commit_state_text').html('<p>진행중인 코드 분석이 없습니다</p>');
  } else {
    $('#commit_state_text').html('<p>진행중인 코드 분석이 없습니다</p>');
  }
}

/*
  gpt 키
 */
chrome.storage.local.get(['gpt_key'], (data) => {
  if (data?.gpt_key)
    $('#api_key').attr('value', data.gpt_key)
});


