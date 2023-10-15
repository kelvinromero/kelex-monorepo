json.extract! episode, :id, :title, :description, :audio_file, :podcast_id, :created_at, :updated_at
json.url episode_url(episode, format: :json)
