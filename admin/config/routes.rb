Rails.application.routes.draw do

  # Dashboard


  resources :users do
    resources :podcasts do
      resources :episodes
    end
    get 'dashboard', to: 'dashboard#index'
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"N
end
