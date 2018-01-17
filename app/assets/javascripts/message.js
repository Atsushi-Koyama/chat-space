$(function(){
  function buildHTML(message) {
    var image = "";
    if (message.image) {
       image = `<img src="${ message.image }">`;
    }
    var html = `<div class = "chat-main__body__message">
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
});
