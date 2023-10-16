require 'rails_helper'

RSpec.describe "episodes/new", type: :view do
  before(:each) do
    assign(:episode, Episode.new(
      title: "MyString",
      description: "MyText",
      audio_file: "MyString",
      podcast: nil
    ))
  end

  it "renders new episode form" do
    render

    assert_select "form[action=?][method=?]", episodes_path, "post" do

      assert_select "input[name=?]", "episode[title]"

      assert_select "textarea[name=?]", "episode[description]"

      assert_select "input[name=?]", "episode[audio_file]"

      assert_select "input[name=?]", "episode[podcast_id]"
    end
  end
end
