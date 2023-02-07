# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_07_211800) do
  create_table "autobid_configs", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "max", default: "0.0", null: false
    t.integer "alert_percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_autobid_configs_on_user_id"
  end

  create_table "autobids", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "amount_bid", default: "0.0", null: false
    t.index ["item_id"], name: "index_autobids_on_item_id"
    t.index ["user_id", "item_id"], name: "index_autobids_on_user_id_and_item_id", unique: true
    t.index ["user_id"], name: "index_autobids_on_user_id"
  end

  create_table "bids", force: :cascade do |t|
    t.decimal "amount"
    t.integer "user_id", null: false
    t.integer "item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_bids_on_item_id"
    t.index ["user_id"], name: "index_bids_on_user_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "filename"
    t.datetime "bidding_close_datetime"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role"
    t.string "name"
  end

  add_foreign_key "autobid_configs", "users"
  add_foreign_key "autobids", "items"
  add_foreign_key "autobids", "users"
  add_foreign_key "bids", "items"
  add_foreign_key "bids", "users"
end
