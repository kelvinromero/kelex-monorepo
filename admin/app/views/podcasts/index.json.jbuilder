# frozen_string_literal: true

json.array! @podcasts, partial: 'podcasts/podcast', as: :podcast
