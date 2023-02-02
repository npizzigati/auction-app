task seed_bids: :environment do

  Bid.all.destroy_all

  Bid.create(
    user_id: User.first.id,
    item_id: Item.first.id,
    amount: 10
  )

  Bid.create(
    user_id: User.second.id,
    item_id: Item.second.id,
    amount: 20
  )

  Bid.create(
    user_id: User.second.id,
    item_id: Item.third.id,
    amount: 30
  )

  puts 'complete'
end
