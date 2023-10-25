# frozen_string_literal: true

class Episode < ApplicationRecord
  after_save :publish_to_queue

  belongs_to :podcast,
             inverse_of: :episodes,
             class_name: 'Podcast',
             foreign_key: 'podcast_id'

  validates :title, presence: true

  private

  def publish_to_queue
    message = {
      id:,
      title:,
      description:,
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
