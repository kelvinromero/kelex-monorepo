class Episode < ApplicationRecord
  after_save :publish_to_queue

  belongs_to :podcast

  validates :title, presence: true

  private

  def publish_to_queue
    message = {
      episode_id: id,
      title: title,
      podcast_id: podcast_id,
      media_url: audio_file
    }.to_json

    BunnyClient.new.publish(message)
  end
end
