require 'rails_helper'

RSpec.describe "episodes/show", type: :view do
  before(:each) do
    assign(:episode, Episode.create!(
      title: "Title",
      description: "MyText",
      audio_file: "Audio File",
      podcast: nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(/Audio File/)
    expect(rendered).to match(//)
  end
end
