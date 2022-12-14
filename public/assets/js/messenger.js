$(".chat-form").on("submit", function (e) {
    e.preventDefault();
    let msg = $(this).find("textarea").val();

    $.post($(this).attr("action"), $(this).serialize(), function (response) {


        let chat_id = response.conversation_id;
        $(`#counter_${chat_id}`).html();

        addMessage(response, "message-out");



    });

    $(this).find("textarea").val("");
});


const addMessage = function (msg, c = "") {
    $("#chat-body-new").append(` <div class="message
    ${c}
    ">
       <a href="#" data-bs-toggle="modal" data-bs-target="#modal-profile" class="avatar avatar-responsive">


       </a>

       <div class="message-inner">
           <div class="message-body">
               <div class="message-content">

                    <div class="message-text">

                        <p>${msg.body}</p>
                    </div>
                       <input type="hidden" name="conversation_id" value="${
                           msg.conversation_id
                       }">
                    <!-- Dropdown -->
                    <div class="message-action">
                        <div class="dropdown">
                            <a class="icon text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </a>

                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <span class="me-auto">Edit</span>
                                        <div class="icon">
                                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <span class="me-auto">Reply</span>
                                        <div class="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-up-left"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a class="dropdown-item d-flex align-items-center text-danger" href="#">
                                        <span class="me-auto">Delete</span>
                                        <div class="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>

            <div class="message-footer">
                <span class="extra-small text-muted">${moment(
                    msg.created_at
                ).fromNow()}</span>
           </div>
       </div>
   </div>


   <!-- Divider -->
   <div class="message-divider">
       <small class="text-muted">${moment(msg.created_at).format(
           "MMM Do YY"
       )}</small>
   </div>`);
};

// const addMessage = function (msg, c = "") {

//     $("#chat-body").append(`
//     <div class="message
//     ${c}
//      ">
//         <a href="#" data-bs-toggle="modal" data-bs-target="#modal-profile" class="avatar avatar-responsive">

//         </a>

//         <div class="message-inner">
//             <div class="message-body">
//                 <div class="message-content">
//                     <div class="message-text">

//                         <p>${msg.body}</p>
//                     </div>
//                         <input type="hidden" name="conversation_id" value="${msg.conversation_id}">
//                     <!-- Dropdown -->
//                     <div class="message-action">
//                         <div class="dropdown">
//                             <a class="icon text-muted" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
//                             </a>

//                             <ul class="dropdown-menu">
//                                 <li>
//                                     <a class="dropdown-item d-flex align-items-center" href="#">
//                                         <span class="me-auto">Edit</span>
//                                         <div class="icon">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
//                                         </div>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a class="dropdown-item d-flex align-items-center" href="#">
//                                         <span class="me-auto">Reply</span>
//                                         <div class="icon">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-up-left"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>
//                                         </div>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <hr class="dropdown-divider">
//                                 </li>
//                                 <li>
//                                     <a class="dropdown-item d-flex align-items-center text-danger" href="#">
//                                         <span class="me-auto">Delete</span>
//                                         <div class="icon">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
//                                         </div>
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//             </div>

//             <div class="message-footer">
//                 <span class="extra-small text-muted">${moment(
//                     msg.created_at
//                 ).fromNow()}</span>
//             </div>
//         </div>
//     </div>
//     `);
// };

const getConversation = function () {
    $.get("/api/convrsations", function (respoonse) {

        for (i in respoonse.conversations.data) {
            conversation(respoonse.conversations.data[i],respoonse.message);

            $("#tab-content-chats").text(respoonse.total);
        }
    });
};

const conversation = function (chat,message) {
    $("#card-list").append(` <a href="${chat.id}"  data-messages="${
        chat.id
    }" data-name="${chat.participients[0].name}" data-user_id="${
        chat.participients[0].user_id
    }" class="card border-0 text-reset" id="chat-sidebar">
    <div class="card-body">
        <div class="row gx-5">
            <div class="col-auto">
                <div class="avatar avatar-online">
            <img src="${chat.participients[0].avatar_url}">

                </div>

            </div>

            <div class="col">
                <div class="d-flex align-items-center mb-3">
                    <h5 class="me-auto mb-0">${chat.participients[0].name}</h5>

                    <span class="text-muted extra-small ms-2"> ${moment(
                        chat.last_message.created_at
                    ).fromNow()}</span>
                </div>

                <div class="d-flex align-items-center" >
                    <div class="line-clamp me-auto" id="body-msg">
                        ${chat.last_message.body}
                    </div>
                    <div class="badge badge-circle bg-primary">
                    <span id="counter_${chat.id}">${message}

                    </span>
                </div>
                </div>
            </div>
        </div>
    </div><!-- .card-body -->
</a>`);
};

$("#card-list").on("click", "[data-messages]", function (e) {
    e.preventDefault();
    const element = document.getElementById("chat-body-main");
    element.style.display = "block";

    var id = $(this).attr("data-messages");

    var read = $("#counter_" + id);

    $("#chat-body-new").empty();

    $.get(`/api/convrsations/messages/${id}`, function (response) {

        read.html("0");

        $("#chat-name").text(response.conversation.participients[0].name);

        $("input[name=user_id]").val(response.conversation.participients[0].id);
        $("input[name=conversation_id]").val(id);
        $("#chat-avatar").attr(
            "src",
            response.conversation.participients[0].avatar_url
        );

        for (i in response.messages.data) {
            var c =
                response.messages.data[i].user_id == userId
                    ? "message-out"
                    : "";

            addMessage(response.messages.data[i], c);
        }


    });
});

$(document).ready(function () {
    getConversation();
});

$("#search-input").on("keyup", function (e) {
    e.preventDefault();

    if ($(this).val() == "") {
        $.get("/api/friends", function (respoonse) {
            for (i in respoonse.data) {
                friends(respoonse.data[i]);
            }
        });
    } else {
        $.get(
            $("#search").attr("action"),
            $(this).serialize(),
            function (respoonse) {
                for (k in respoonse.data) {
                    friendsSearch(respoonse.data[k]);
                }
            }
        );
    }
});

$("#tab-friends").on("click", function () {
    $.get("/api/friends", function (respoonse) {
        for (i in respoonse.data) {
            friends(respoonse.data[i]);
        }
    });
});

const friends = function (friend) {
    let conversation = "";
    for (j in friend.conversations) {
        conversation = friend.conversations[j].id;
    }
    $("#friends-body").append(`
<div class="row align-items-center gx-5">
<div class="col-auto">
    <a href="#" class="avatar ">

        <img class="avatar-img" src="${friend.avatar_url}"
            alt="">


    </a>
</div>

<div class="col">
    <h5><a href="${conversation}" data-messages="${conversation}" data-name="${friend.name}" data-id="${friend.id}">${friend.name}</a></h5>

</div>


</div>
<br>
`);
};

const friendsSearch = function (friend) {
    let conversation = "";
    for (j in friend.conversations) {
        conversation = friend.conversations[j].id;
    }
    $("#friends-body").html(`
<div class="row align-items-center gx-5">
<div class="col-auto">
    <a href="#" class="avatar ">

        <img class="avatar-img" src=""
            alt="">


    </a>
</div>

<div class="col">
    <h5><a href="${conversation}" data-messages="${conversation}" data-name="${friend.name}" data-id="${friend.id}">${friend.name}</a></h5>

</div>


</div>
`);
};
$("#friends-body").on("click", "[data-messages]", function (e) {
    e.preventDefault();
    const element = document.getElementById("chat-body-main");
    element.style.display = "block";
    let id = $(this).attr("data-messages");
    let name = $(this).attr("data-name");

    let user_id = $(this).attr("data-id");
    $("#chat-body").empty();
    $("input[name=conversation_id]").val(id);

    $.get(`/api/convrsations/messages/${id}`, function (response) {
        if (response.conversation == null) {
            $("#chat-conv-id").remove();
            $("#chat-name").text(name);
            $("input[name=user_id]").val(user_id);
            // $("#chat-avatar").attr(
            //     "src",
            //     response.conversation.participients[0].avatar_url
            // );
        } else {
            $("#chat-name").text(response.conversation.participients[0].name);
            $("input[name=user_id]").val(
                response.conversation.participients[0].id
            );
            $("#chat-avatar").attr(
                "src",
                response.conversation.participients[0].avatar_url
            );
        }

        for (i in response.messages.data) {
            let c =
                response.messages.data[i].user_id == userId
                    ? "message-out"
                    : "";
            addMessage(response.messages.data[i], c);

            // $("#chat-name").text(response.data[i].participients[0].name);
        }
    });
});

// get count chats
