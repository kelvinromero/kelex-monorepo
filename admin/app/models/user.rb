class User < ApplicationRecord
  has_many :podcasts, dependent: :destroy
  has_many :episodes, through: :podcasts

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
end
