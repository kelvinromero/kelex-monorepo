class User < ApplicationRecord
  has_many :podcasts, dependent: :destroy
  has_many :episodes, through: :podcasts
end
