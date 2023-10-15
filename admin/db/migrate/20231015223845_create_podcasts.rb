class CreatePodcasts < ActiveRecord::Migration[7.0]
  def change
    create_table :podcasts do |t|
      t.string :title
      t.text :description
      t.string :cover_art
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
