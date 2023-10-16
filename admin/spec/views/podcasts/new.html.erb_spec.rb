require 'rails_helper'

RSpec.describe "podcasts/new", type: :view do
  before(:each) do
    assign(:podcast, Podcast.new(
      title: "MyString",
      description: "MyText",
      cover_art: "MyString",
      user: nil
    ))
  end

  it "renders new podcast form" do
    render

    assert_select "form[action=?][method=?]", user_podcast_path, "post" do

      assert_select "input[name=?]", "podcast[title]"

      assert_select "textarea[name=?]", "podcast[description]"

      assert_select "input[name=?]", "podcast[cover_art]"

      assert_select "input[name=?]", "podcast[user_id]"
    end
  end
end
