class Podcast < ApplicationRecord
  belongs_to :user
  has_many :episodes,
           dependent: :destroy,
           inverse_of: :podcast,
           class_name: 'Episode',
           foreign_key: 'podcast_id'

  validates :title, presence: true
  validates :description, presence: true
end
