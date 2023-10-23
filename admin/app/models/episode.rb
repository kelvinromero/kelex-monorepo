class Episode < ApplicationRecord
  belongs_to :podcast

  validates :title, presence: true
end
