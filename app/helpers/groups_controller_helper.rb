module GroupsControllerHelper

  def show_last_message(group)
    if (last_message = group.messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end

end

