class Podcast < ApplicationRecord
  belongs_to :user
  has_many :episodes, dependent: :destroy
end
