Rails.application.routes.draw do
  devise_for :users

  root to: "home#index", to: redirect('/users/')

  resources :users, only: [:index, :show, :edit, :update] do
    resources :podcasts do
      resources :episodes
    end
    resource :dashboard, only: [:show]
  end

end
