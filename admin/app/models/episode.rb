class Episode < ApplicationRecord
  after_save :publish_to_queue

  belongs_to :podcast

  validates :title, presence: true

  private

  def publish_to_queue
    message = {
      id: id,
      title: title,
      description: description,
      media_url: audio_file,
      podcast: {
        id: podcast.id,
        title: podcast.title,
        description: podcast.description,
        cover_art: podcast.cover_art
      }
    }.to_json

    BunnyClient.new.publish(message)
  end
end
