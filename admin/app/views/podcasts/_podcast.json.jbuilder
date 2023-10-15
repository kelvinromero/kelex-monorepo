json.extract! podcast, :id, :title, :description, :cover_art, :user_id, :created_at, :updated_at
json.url user_podcast_path(podcast, format: :json)
