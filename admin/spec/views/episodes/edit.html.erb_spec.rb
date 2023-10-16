require 'rails_helper'

RSpec.describe "episodes/edit", type: :view do
  let(:episode) {
    Episode.create!(
      title: "MyString",
      description: "MyText",
      audio_file: "MyString",
      podcast: nil
    )
  }

  before(:each) do
    assign(:episode, episode)
  end

  it "renders the edit episode form" do
    render

    assert_select "form[action=?][method=?]", episode_path(episode), "post" do

      assert_select "input[name=?]", "episode[title]"

      assert_select "textarea[name=?]", "episode[description]"

      assert_select "input[name=?]", "episode[audio_file]"

      assert_select "input[name=?]", "episode[podcast_id]"
    end
  end
end
