# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  root to: 'home#index', to: redirect('/users/')

  resources :users, only: %i[index show edit update] do
    resources :podcasts do
      resources :episodes
    end
    resource :dashboard, only: [:show]
  end
end
