/* global oAuth2 */
/* eslint no-undef: "error" */
let action = false;
const blockElement = `#popup_container #col div[style*="display: block"]`

$('#authenticate').on('click', () => {

  if (action) {
    oAuth2.begin();
  }
});

// 임시
$('#api_key_button').on('click', () => {
  $("#auth_mode").hide();

  $("#commit_mode").show();
  $('#gear_icon').show();

})

$('#api_key_save').on('click', () => {
  const value = $('#api_key').val()
  chrome.storage.local.set({ "gpt_key": value }, () => { })
})

chrome.storage.local.get('BaekjoonHub_token', (data) => {
  const token = data.BaekjoonHub_token;
  if (token === null || token === undefined) {
    action = true;
    $('#auth_mode').show();
  } else {
    // To validate user, load user object from GitHub.
    const AUTHENTICATION_URL = 'https://api.github.com/user';

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          $('#commit_mode').show();
          $('#gear_icon').show();

        } else if (xhr.status === 401) {
          // bad oAuth
          // reset token and redirect to authorization process again!
          chrome.storage.local.set({ BaekjoonHub_token: null }, () => {
            console.log('BAD oAuth!!! Redirecting back to oAuth process');
            action = true;
            $('#auth_mode').show();
          });
        }
      }
    });
    xhr.open('GET', AUTHENTICATION_URL, true);
    xhr.setRequestHeader('Authorization', `token ${token}`);
    xhr.send();
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
  활성화 버튼 클릭 시 storage에 활성 여부 데이터를 저장.
 */
$('#onffbox').on('click', () => {
  chrome.storage.local.set({ bjhEnable: $('#onffbox').is(':checked') }, () => { });
});


chrome.storage.local.get(['gpt_key'], (data) => {
  if (data?.gpt_key)
    $('#api_key').attr('value', data.gpt_key)
});


// 세팅 박스 클릭
$('#gear_icon').on('click', () => {

  // alert($(blockElement))

  const blockElementId = $(blockElement)[0].id;

  console.log(blockElementId)

  $(blockElement).hide();

  if (blockElementId == 'commit_mode') {
    $("#setting_mode").show();
  } else {
    $("#commit_mode").show();
  }
});

// function resizePopup() {
//   var popup = document.getElementById('popup');
//   var content = document.getElementById('popup_container');
//   var height = content.scrollHeight;
//   popup.style.height = height + 'px';
// }

// window.addEventListener('load', resizePopup);