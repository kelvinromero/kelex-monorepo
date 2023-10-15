require 'rails_helper'

RSpec.describe "podcasts/show", type: :view do
  before(:each) do
    assign(:podcast, Podcast.create!(
      title: "Title",
      description: "MyText",
      cover_art: "Cover Art",
      user: nil
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/MyText/)
    expect(rendered).to match(/Cover Art/)
    expect(rendered).to match(//)
  end
end
