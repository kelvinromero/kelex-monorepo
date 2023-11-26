# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # before_action :authenticate_user!
  before_action :set_user

  private

  def set_user
    @user = User.find(5)
  end
end
