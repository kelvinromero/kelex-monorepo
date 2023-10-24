require 'rails_helper'

RSpec.describe Episode, type: :model do
  let(:podcast) { create(:podcast) }

  it "is valid with a title" do
    episode = Episode.new(title: "Sample Episode", podcast: podcast)
    expect(episode).to be_valid
  end

  it "is invalid without a title" do
    episode = Episode.new(title: nil, podcast: podcast)
    expect(episode).to be_invalid
  end

  it "calls the publish_to_queue method after save" do
    episode = Episode.new(title: "Sample Episode", podcast: podcast)
    expect(episode).to receive(:publish_to_queue)
    episode.save
  end

  it "publishes a message to the BunnyClient after save" do
    episode = Episode.new(title: "Sample Episode", podcast: podcast)
    expect(BunnyClient).to receive(:new).and_return(bunny_client = double)
    expect(bunny_client).to receive(:publish)

    episode.save
  end

  it "belongs to a podcast" do
    association = Episode.reflect_on_association(:podcast)
    expect(association.macro).to eq :belongs_to
  end
end
