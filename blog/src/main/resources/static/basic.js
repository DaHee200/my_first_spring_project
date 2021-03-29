$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getMessages();

})

function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 60) {
        alert('공백 포함 60자 이하로 입력해주세요');
        return false;
    }
    return true;
}

// 수정 버튼을 눌렀을 때, 기존 작성 내용을 textarea 에 전달합니다.
// 숨길 버튼을 숨기고, 나타낼 버튼을 나타냅니다.
function editPost(id) {
    showEdits(id);
    let title = $(`#${id}-title`).text().trim();
    let contents = $(`#${id}-contents`).text().trim();
    let name = $(`#${id}-name`).text().trim();
    $(`#${id}-edtitle`).val(title);
    $(`#${id}-textarea`).val(contents);
    $(`#${id}-edname`).val(name);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-edtitle`).show();
    $(`#${id}-textarea`).show();
    $(`#${id}-edname`).show();
    $(`#${id}-edit`).hide();
    $(`#${id}-modifiedAt`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-edtitle`).hide();
    $(`#${id}-textarea`).hide();
    $(`#${id}-edname`).hide();
    $(`#${id}-edit`).show();
    $(`#${id}-modifiedAt`).show();
}


// 메모를 불러와서 보여줍니다.
function getMessages() {
    // 1. 기존 메모 내용을 지웁니다.
    $('#cards-box').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: '/api/bloglists',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let message = response[i];
                let id = message['id'];
                let title = message['title'];
                let contents = message['contents'];
                let name = message['name'];
                let modifiedAt = message['modifiedAt'];
                addHTML(id, name, contents, title, modifiedAt);
            }
        }
    })
}

// <!-- date/username 영역 -->
// <div class="metadata">
//     <div class="date">
//
//     </div>
// </div>
// <!-- contents 조회/수정 영역-->
// <div id="${id}-title" class="title">
//     <a href="/detail01?{id}"=$(Json.strinify(id)}">${title}</a>
// </div>
// <div class="contents">
// <div id="${id}-contents" class="text">
// ${contents}
// </div>
// <div id="${id}-editarea" class="edit">
// <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
// </div>
// </div>
// <div id="${id}-name" class="name">
// ${name}
// </div>

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, name, contents, title, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
    let tempHtml = `<div class="card">
<!--                            <div class="card w-75">-->
                                <div class="card-body" >
                                    <h5  id="${id}-title" class="title">
                                        <a id="${id}-title01" href="/detail01?${id}">${title}</a>
                                        <div id="${id}-edit-title" class="edtitle">
                                        <input id="${id}-edtitle" class="te-edit" name="" id="" cols="30" rows="5"> </input>
                                        </div>
                                    </h5>
                                    <p  id="${id}-contents" class="text">${contents}</p>
                                    <div id="${id}-editarea" class="edit">
                                    <input id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"> </input>
                                    </div>
                                    <p  id="${id}-name" class="name">${name}</p>
                                    <div id="${id}-edit-name" class="edname">
                                    <input id="${id}-edname" class="te-edit" name="" id="" cols="30" rows="5"></input>
                                    </div>
                                     <p id="${id}-modifiedAt" class="metadata" >[${modifiedAt}]</p>
                                    <div class="footer">
                                        <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                                        <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                                        <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
                                    </div>
<!--                            </div>-->
                            
                                    <!-- 버튼 영역-->
                                
                                </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#boxs01').append(tempHtml);
}

// 메모를 생성합니다.
function writePost() {
    // 1. 작성한 메모
    let contents = $('#contents').val().trim();
    let title = $('#title').val().trim();
    let name = $('#name').val().trim();

    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(title) == false) {
        return;}
    if (isValidContents(contents) == false) {
        return;
    }
    if (isValidContents(name) == false) {
        return;
    }

    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'contents': contents, 'name': name};

    // 5. POST /api/bloglists 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/bloglists",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 작성되었습니다.');
            close_pop()
            window.location.reload();
        }
    });
}

function close_pop() {
    $('#index').hide();
}

// 메모를 수정합니다.
function submitEdit(id) {
    // 1. 작성 대상 메모의 name과 contents 를 확인합니다.
    let title = $(`#${id}-edtitle`).val().trim();
    let contents = $(`#${id}-textarea`).val().trim();
    let name = $(`#${id}-edname`).val().trim();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(title) == false) {
        return;}
    if (isValidContents(contents) == false) {
        return;
    }
    if (isValidContents(name) == false) {
        return;
    }

    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'contents': contents, 'name': name};

    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/bloglists/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 변경되었습니다.');
            hideEdits()
            window.location.reload();
        }
    });
}

function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/bloglists/${id}`,
        success: function (response) {
            alert('삭제 되었습니다.');
            window.location.reload();
        }
    });
}
