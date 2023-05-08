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
chrome.storage.local.get('BaekjoonHub_token', (data) => {
  const token = data.BaekjoonHub_token;
  console.log(token)
  if (token === null || token === undefined) {
    action = true;
    $('#auth_mode').show();
  } else {
    // To validate user, load user object from GitHub.
    // const AUTHENTICATION_URL = 'https://api.github.com/user';

    fetch('https://algopat.kr/api/code/problem?problemId=1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    }).then((data) => {
      console.log(data)
      $('#commit_mode').show();
      $('#gear_icon').show();
    }).catch((e) => {
      $('#auth_mode').show();
    })

    // const xhr = new XMLHttpRequest();
    // xhr.addEventListener('readystatechange', function () {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       $('#commit_mode').show();
    //       $('#gear_icon').show();

    //     } else if (xhr.status === 401) {
    //       // bad oAuth
    //       // reset token and redirect to authorization process again!
    //       chrome.storage.local.set({ BaekjoonHub_token: null }, () => {
    //         console.log('BAD oAuth!!! Redirecting back to oAuth process');
    //         action = true;
    //         $('#auth_mode').show();
    //       });
    //     }
    //   }
    // });
    // xhr.open('GET', AUTHENTICATION_URL, true);
    // xhr.setRequestHeader('Authorization', `token ${token}`);
    // xhr.send();
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
chrome.storage.local.get('commit_state', (data) => {

  if (!data.commit_state || data.commit_state == "none") {
    $('#commit_state_text').html('<p>진행중인 코드 분석이 없습니다</p>');
  } else if (data.commit_state == "progress") {
    $('#commit_state_text').html('<p>코드 분석이 진행중입니다</p><div class="spinner"></div>');
  } else if (data.commit_state == "completed") {
    $('#commit_state_text').html('<p>코드 분석이 완료되었습니다</p><div class="completed_icon">✓</div>');
    $('#commit_state_text').after('<a id="result_link" target="_blank" href="https://github.com/">분석 결과 보기</a>');

  }
});


/*
  gpt 키
 */
chrome.storage.local.get(['gpt_key'], (data) => {
  if (data?.gpt_key)
    $('#api_key').attr('value', data.gpt_key)
});


