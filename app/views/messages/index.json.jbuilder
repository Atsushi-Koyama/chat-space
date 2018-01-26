json.array! @new_messages do |message|
  json.name          message.user.name
  json.message       message.content
  json.image         message.image.url
  json.date_time     message.created_at.to_s(:default)
  json.id            message.id
end
