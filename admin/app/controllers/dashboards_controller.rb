class DashboardsController < ApplicationController
  before_action :set_podcast

  def show

  end

  private

  def set_podcast
    @podcast = @user.podcasts.last
  end

end
