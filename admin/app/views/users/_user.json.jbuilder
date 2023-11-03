# frozen_string_literal: true

json.extract! user, :id, :first_name, :last_name, :email, :created_at, :updated_ats
json.url user_url(user, format: :json)
