FactoryBot.define do
  factory :podcast do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    user
  end
end
