# frozen_string_literal: true

FactoryBot.define do
  factory :episode do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.sentence }
    audio_file { Faker::Internet.url }
    podcast
  end
end
