task seed_bids: :environment do

  Bid.all.destroy_all

  Bid.create(
    user_id: User.first.id,
    item_id: Item.first.id,
    amount: Item.first.reserve_price + 1
  )

  Bid.create(
    user_id: User.second.id,
    item_id: Item.second.id,
    amount: Item.second.reserve_price + 1
  )

  puts 'complete'
end
