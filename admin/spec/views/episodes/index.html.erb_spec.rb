require 'rails_helper'

RSpec.describe "episodes/index", type: :view do
  before(:each) do
    assign(:episodes, [
      Episode.create!(
        title: "Title",
        description: "MyText",
        audio_file: "Audio File",
        podcast: nil
      ),
      Episode.create!(
        title: "Title",
        description: "MyText",
        audio_file: "Audio File",
        podcast: nil
      )
    ])
  end

  it "renders a list of episodes" do
    render
    cell_selector = Rails::VERSION::STRING >= '7' ? 'div>p' : 'tr>td'
    assert_select cell_selector, text: Regexp.new("Title".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("MyText".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Audio File".to_s), count: 2
    assert_select cell_selector, text: Regexp.new(nil.to_s), count: 2
  end
end
