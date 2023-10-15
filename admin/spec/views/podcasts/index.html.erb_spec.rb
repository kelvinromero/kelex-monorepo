require 'rails_helper'

RSpec.describe "podcasts/index", type: :view do
  before(:each) do
    assign(:podcasts, [
      Podcast.create!(
        title: "Title",
        description: "MyText",
        cover_art: "Cover Art",
        user: nil
      ),
      Podcast.create!(
        title: "Title",
        description: "MyText",
        cover_art: "Cover Art",
        user: nil
      )
    ])
  end

  it "renders a list of podcasts" do
    render
    cell_selector = Rails::VERSION::STRING >= '7' ? 'div>p' : 'tr>td'
    assert_select cell_selector, text: Regexp.new("Title".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("MyText".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Cover Art".to_s), count: 2
    assert_select cell_selector, text: Regexp.new(nil.to_s), count: 2
  end
end
