class DashboardController < ApplicationController
  before_action :set_user
  before_action :set_podcast

  def index

  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_podcast
    @podcast = @user.podcasts.last
  end

end
