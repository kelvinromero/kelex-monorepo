class User < ApplicationRecord
  include ActiveModel::Validations

  # Authentication
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :lockable, :trackable

  # Validations
  validates :email, presence: true, uniqueness: true
  validates :password, password_strength: {use_dictionary: true, min_word_length: 6}, on: :create

  # Relationships
  has_many :podcasts, dependent: :destroy
  has_many :episodes, through: :podcasts
end
