require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    it "requires an email" do
      user = User.new(email: "")
      user.valid?
      expect(user.errors.messages).to have_key(:email)
    end

    it "requires a unique email" do
      user = User.create!(email: "mail@teste.com", password: "a12312sdasdASDuijn9Ku1aa1")
      user2 = User.new(email: "mail@teste.com")
      user2.valid?
      expect(user2.errors.messages).to have_key(:email)
    end

    it "requires a password" do
      user = User.new(password: "")
      user.valid?
      expect(user.errors.messages).to have_key(:password)
    end

    it "requires a password with at least 6 characters" do
      user = User.new(password: "12345")
      user.valid?
      expect(user.errors.messages).to have_key(:password)
    end

    it "requires a complex password" do
      user = User.new(password: "123456")
      user.valid?
      expect(user.errors.messages).to have_key(:password)
    end
  end
end