require 'rails_helper'

RSpec.xdescribe '/episodes', type: :request do
  let(:user) { create(:user) }
  let(:podcast) { create(:podcast, user:) }
  let(:episode) { create(:episode, podcast_id: podcast.id) }

  let(:valid_attributes) do
    {
      title: episode.title,
      description: episode.description,
      audio_file: episode.audio_file,
      podcast_id: podcast.id
    }
  end

  let(:invalid_attributes) do
    skip('Add a hash of attributes invalid for your model')
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Episode.create! valid_attributes
      get user_podcast_episodes_url user.id, podcast.id
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      episode = Episode.create! valid_attributes
      get episode_url(episode)
      expect(response).to be_successful
    end
  end

  describe 'GET /new' do
    it 'renders a successful response' do
      get new_episode_url
      expect(response).to be_successful
    end
  end

  describe 'GET /edit' do
    it 'renders a successful response' do
      episode = Episode.create! valid_attributes
      get edit_episode_url(episode)
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Episode' do
        expect do
          post user_podcast_episodes_url, params: { episode: valid_attributes }
        end.to change(Episode, :count).by(1)
      end

      it 'redirects to the created episode' do
        post user_podcast_episodes_url, params: { episode: valid_attributes }
        expect(response).to redirect_to(episode_url(Episode.last))
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Episode' do
        expect do
          post user_podcast_episodes_url, params: { episode: invalid_attributes }
        end.to change(Episode, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post user_podcast_episodes_url, params: { episode: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        skip('Add a hash of attributes valid for your model')
      end

      it 'updates the requested episode' do
        episode = Episode.create! valid_attributes
        patch episode_url(episode), params: { episode: new_attributes }
        episode.reload
        skip('Add assertions for updated state')
      end

      it 'redirects to the episode' do
        episode = Episode.create! valid_attributes
        patch episode_url(episode), params: { episode: new_attributes }
        episode.reload
        expect(response).to redirect_to(episode_url(episode))
      end
    end

    context 'with invalid parameters' do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        episode = Episode.create! valid_attributes
        patch episode_url(episode), params: { episode: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested episode' do
      episode = Episode.create! valid_attributes
      expect do
        delete episode_url(episode)
      end.to change(Episode, :count).by(-1)
    end

    it 'redirects to the episodes list' do
      episode = Episode.create! valid_attributes
      delete episode_url(episode)
      expect(response).to redirect_to(user_podcast_episodes_url)
    end
  end
end
