$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    let id = window.location.search.split('?')[1]
    getMessages(id);
})

function getQuerystring(id) {
    return id;

}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}


function getMessages(id) {
    let idx = id
    // 1. 기존 메모 내용을 지웁니다.
    $.ajax({
        type: 'GET',
        url: `/api/detail/${idx}`,
        success: function (response) {
            addHTML(response['id'], response['title'], response['contents'], response['name'], response['modifiedAt'])

        }

    })


    function addHTML(id, title, contents, name, modifiedAt) {
        let tempHtml = `<div class="card">
                                <div class="card-body">
                                    <h5  id="${id}-title" class="title">
<!--                                    <button location.href="/">돌아가기</button>-->
                                        <a href="/">${title}</a>
                                    </h5>
                                    <p  id="${id}-contents" class="text">${contents}</p>
                                    <p  id="${id}-name" class="name">${name}<span class="metadata" >|${modifiedAt}</span></p>
                                    <div class="footer">
                                        <img id="${id}-delete" class="icon-delete" src="images/delete.png" onclick="deleteOne('${id}')"/>
                                    </div>
                                </div>
                       </div>`;
        // 2. #cards-box 에 HTML을 붙인다.
        $('#boxs').append(tempHtml);

    }


    // // 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
    // function addHTML(id, name, contents, title, modifiedAt) {
    //     // 1. HTML 태그를 만듭니다.
    //     let tempHtml = `<div class="card">
    //             <div class="card w-75">
    //                 <div class="card-body">
    //                     <h5  id="${id}-title" class="title">
    //                         <a href="/detail01?${id}">${title}</a>
    //                     </h5>
    //                     <p  id="${id}-contents" class="text">${contents}</p>
    //                     <p  id="${id}-name" class="name">${name}<span class="metadata" >|${modifiedAt}</span></p>
    //
    //             </div>
    //
    //                     <!-- 버튼 영역-->
    //                 <div class="footer">
    //                 <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
    //                 <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
    //                 <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
    //                 </div>
    //                 </div>`;
    //     // 2. #cards-box 에 HTML을 붙인다.
    //     $('#boxs01').append(tempHtml);
    // }

    // function getId(){
    //     let id = location.search.split('=')[1]
    //     return getdetail01(id);
    // }

    //
    //     $('#GoToMain').on('click', function () {
    //         window.location.href = "/"
    //     })

}

function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/bloglists/${id}`,
        success: function (response) {
            alert('삭제 되었습니다.');
            window.location.href = "/";
        }
    });
}



