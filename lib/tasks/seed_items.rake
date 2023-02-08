task seed_items: :environment do

  Item.all.destroy_all

  Item.create(
    name: '19th Century Wristwatch',
    description: 'Wristwatch from c.1850, in working condition.',
    filename: 'antique_wristwatch.jpg',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Spanish Civil War Poster',
    description: 'Poster from the Spanish Civil War',
    filename: 'Spanish_poster.jpeg',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Colonial Lamp',
    description: 'Lamp from pre-Independence Maryland',
    filename: 'colonial_lamp.jpg',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Novelty Barware Set',
    description: 'Early 20th century barware set',
    filename: 'toucan-bottle-opener.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Hunting Decoy',
    description: '19th-century decoy, perfect condition',
    filename: 'hunting-decoys.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Depression glass',
    description: 'Patterned glassware',
    filename: 'depression-glass.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Bird Painting',
    description: 'Painting by unknown, c.1960',
    filename: 'original-painting.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Barber Chair',
    description: 'Koken brand barber chair',
    filename: 'barber-chair.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Postcard Collection',
    description: 'Postcard collection from the 1930s',
    filename: 'vintage-postcard.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Rare Antique Clock',
    description: 'Art Deco clock from Brazil',
    filename: 'antique-clock.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Cast Iron Doorstop',
    description: 'Handmade doorstop, like-new condition',
    filename: 'cast-iron-doorstop.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Stained-Glass Window',
    description: 'Ornate leaded-glass decorative piece',
    filename: 'stained-glass-window.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: '19th-Century Cookbook',
    description: 'Antique cookbook in good condition',
    filename: 'rare-cookbook.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'American Crystal Chandelier',
    description: 'Large American crystal chandelier, c.1900, excellent condition',
    filename: 'vintage-chandelier.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Sterling Silver Flatware',
    description: 'Tiffany-style flatware from the pre-Civil War South',
    filename: 'sterling-silver-flatware.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Antique Toolbox',
    description: '19th-century Stanley Toolbox, good condition',
    filename: 'old-tools.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Set of Rare Coins',
    description: 'Set of early 20th-century coins',
    filename: 'antique_coins.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'China Set',
    description: 'Wedgwood China Set, excellent condition',
    filename: 'Wedgwood-china.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Vintage Typewriter',
    description: 'Typewriter c.1930, working condition',
    filename: 'typewriter.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Antique Piano',
    description: 'Antique piano, plays beautifully',
    filename: 'vintage-piano.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  Item.create(
    name: 'Antique Perfume Bottle Set',
    description: 'Victorian crystal perfume bottle set, c.1870, perfect condition',
    filename: 'antique-perfume-bottle.webp',
    bidding_close_datetime: DateTime.new(2023,5,3,4,0,0),
  )

  puts 'complete'
end
