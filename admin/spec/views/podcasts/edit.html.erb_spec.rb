require 'rails_helper'

RSpec.describe "podcasts/edit", type: :view do
  let(:podcast) {
    Podcast.create!(
      title: "MyString",
      description: "MyText",
      cover_art: "MyString",
      user: nil
    )
  }

  before(:each) do
    assign(:podcast, podcast)
  end

  it "renders the edit podcast form" do
    render

    assert_select "form[action=?][method=?]", podcast_path(podcast), "post" do

      assert_select "input[name=?]", "podcast[title]"

      assert_select "textarea[name=?]", "podcast[description]"

      assert_select "input[name=?]", "podcast[cover_art]"

      assert_select "input[name=?]", "podcast[user_id]"
    end
  end
end
