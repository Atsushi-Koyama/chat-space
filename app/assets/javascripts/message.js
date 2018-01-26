$(function(){
  function buildHTML(message) {
    var image = "";
    if (message.image) {
       image = `<img src="${ message.image }">`;
    }
    var html = `<div class="chat-main__body__content" data-message-id="${message.id}">
                  <div class = "chat-main__body__message">
                    <div class = "chat-main__body__message__messages__message">
                      ${ message.name }
                    </div>
                    <div class = "chat-main__body__message__messages__date">
                      ${ message.time }
                    </div>
                    <div class = "chat-main__body__message__messages__low-message">
                      ${ message.message }
                    </div>
                    <div class = "imagefile">
                      ${ image }
                    </div>
                  </div>
                </div>`
      return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body').append(html);
      $('.form__message').val('');
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })
  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var id = $('.chat-main__body__content').last().data('message-id')
      $.ajax({
        url: location.href,
        data: { id: id },
        dataType: 'json',
      })
      .done(function(data) {
        var insertHTML = '';
        data.forEach(function(message) {
          if (message.id > id ) {
            insertHTML += buildHTML(message);
          }
        });
        $('.chat-main__body').append(insertHTML);
      })
      .fail(function(json) {
        alert('error');
      });
    }
    else {
      clearInterval(interval);
    }
  }, 5000);
});
