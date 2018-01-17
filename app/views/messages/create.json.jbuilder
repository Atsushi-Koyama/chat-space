json.name    @message.user.name
json.time    @message.created_at.to_s(:default)
json.message @message.content
json.image   @message.image.to_s
