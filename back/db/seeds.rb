# db/seeds.rb
require "open-uri"

puts "Seeding users..."

gallery_owner = User.find_or_create_by!(email: "gallery_owner@example.com") do |user|
  user.password = "password123"
  user.password_confirmation = "password123"
  user.role = "gallery_owner"
end

visitor = User.find_or_create_by!(email: "visitor@example.com") do |user|
  user.password = "password456"
  user.password_confirmation = "password456"
  user.role = "visitor"
end

puts "Users created: #{User.count}"

puts "Seeding categories..."

category_names = %w[
  painting
  sculpture
  photography
  illustration
  drawing
  impressionism
  surrealism
  renaissance
  cubism
  baroque
  contemporary
  conceptual
  dadaism
  ukiyoe
  photojournalism
]

category_names.each do |name|
  Category.find_or_create_by!(name: name)
end

puts "Categories created: #{Category.count}"

puts "Seeding artworks..."

artworks_data = [
  {
    title: "Impression, Sunrise",
    artist_name: "Claude Monet",
    category_names: ["painting", "impressionism"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/960px-Monet_-_Impression%2C_Sunrise.jpg",
    description: "« Impression, Sunrise » est bien plus qu’un simple paysage : c’est l’acte fondateur qui donnera naissance à l’impressionnisme. Monet y saisit l’instant fragile du lever du jour sur le port du Havre, enveloppé de brume et de silence. Le soleil rougeoyant, peint d’un geste presque audacieux, perce un ciel aux teintes bleu-gris où les formes semblent se dissoudre dans la lumière. Les silhouettes des bateaux, à peine définies, flottent comme des souvenirs évanescents. Ce tableau n’a pas vocation à représenter précisément la réalité, mais à capturer une sensation — celle d’un moment suspendu, où la lumière gouverne tout. C’est cette volonté de peindre l’impression pure qui révolutionnera la peinture moderne."
  },
  {
    title: "Starry Night",
    artist_name: "Vincent van Gogh",
    category_names: ["painting"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/VanGogh-starry_night.jpg/960px-VanGogh-starry_night.jpg",
    description: "« La Nuit étoilée » n’est pas un paysage fidèle, mais une vision intérieure, un tumulte émotionnel transposé sur toile. Van Gogh y fait tourbillonner le ciel en spirales lumineuses, comme si l’univers lui-même était animé d’une énergie mystérieuse. Chaque étoile semble vibrer et pulser, enveloppée de halos jaunes presque électriques. Le village endormi au premier plan contraste avec l’intensité du firmament, rappelant l’écart entre la tranquillité humaine et la perception hypersensible du peintre."
  },
  {
    title: "Mona Lisa",
    artist_name: "Leonardo da Vinci",
    category_names: ["painting", "renaissance"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mona_Lisa.jpg/500px-Mona_Lisa.jpg",
    description: "Peinture mythique entre toutes, la « Mona Lisa » s’impose comme une énigme artistique infinie. Son sourire, à la fois discret et omniprésent, échappe à toute interprétation définitive, tandis que son regard semble suivre le spectateur avec une douceur presque humaine."
  },
  {
    title: "The Persistence of Memory",
    artist_name: "Salvador Dalí",
    category_names: ["painting", "surrealism"],
    description: "Œuvre phare du surréalisme, « La Persistance de la mémoire » met en scène des montres molles qui semblent se liquéfier sous une lumière crépusculaire. Ces objets du temps, rendus absurdes, se déforment dans un paysage désertique inspiré des terres catalanes de Dalí. Au centre repose une forme biomorphe — souvent interprétée comme un autoportrait du peintre — plongée dans un sommeil étrange. L’ensemble crée une atmosphère où le temps perd sens et rigidité, devenant une matière malléable, propre aux rêves. Dalí y questionne la mémoire, l’inconscient et la fragilité de nos repères."
  },
  {
    title: "Girl with a Pearl Earring",
    artist_name: "Johannes Vermeer",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Girl_with_a_Pearl_Earring.jpg/960px-Girl_with_a_Pearl_Earring.jpg",
    category_names: ["painting", "baroque"],
    description: "Souvent surnommée « la Mona Lisa du Nord », « La Jeune Fille à la perle » est un chef-d’œuvre de délicatesse et de subtilité. Vermeer capture un instant suspendu, comme si la jeune femme venait tout juste de se retourner vers le spectateur. Son turban coloré contraste avec l’éclairage doux qui caresse son visage. La perle, immense et lumineuse, reflète un simple point de lumière, devenant le centre silencieux de la composition. Plus qu’un portrait, l’œuvre évoque une rencontre éphémère, un souffle de vie intemporel."
  },
  {
    title: "The Scream",
    artist_name: "Edvard Munch",
    category_names: ["painting", "contemporary"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/500px-Edvard_Munch.jpg",
    description: "« Le Cri » est l’expression picturale de l’angoisse humaine. Sur un pont, une silhouette déformée ouvre la bouche dans un cri silencieux, tandis que le ciel rouge sang semble vibrer d’une intensité presque apocalyptique. Les lignes courbes et les couleurs violentes traduisent un état de panique intérieure, une fracture émotionnelle profonde. Munch s’inspire d’une véritable crise d’angoisse pour créer cette image devenue un symbole universel de la détresse existentielle. Le contraste entre la figure affolée et les silhouettes indifférentes à l’arrière-plan renforce l’impression d’isolement absolu."
  },
  {
    title: "The Birth of Venus",
    artist_name: "Sandro Botticelli",
    category_names: ["painting", "renaissance"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project.jpg/960px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project.jpg",
    description: "Dans « La Naissance de Vénus », Botticelli peint la déesse surgissant des flots, portée par une coquille comme un symbole de pureté et de beauté idéale. Les vents l’accompagnent, enveloppés de drapés gracieux, tandis qu’une nymphe s’apprête à la couvrir d’un manteau fleuri. Les formes élégantes, les couleurs douces et le mouvement délicat confèrent au tableau une poésie d’une rare finesse. Botticelli ne cherche pas le réalisme anatomique, mais une représentation idéale, presque divine, inspirée des mythes et de la philosophie néoplatonicienne."
  },
  {
    title: "Guernica",
    artist_name: "Pablo Picasso",
    category_names: ["painting", "cubism"],
    description: "“Guernica” est un cri colossal contre la guerre. Inspirée par le bombardement de la ville basque en 1937, l’œuvre représente une scène de chaos où se mêlent douleur, terreur et fragmentation. Picasso utilise uniquement le noir, le blanc et le gris pour renforcer la gravité du sujet. Chevaux agonisants, mères affolées, lumières éblouissantes et corps disloqués composent un ensemble déchirant qui transcende le temps et l’histoire. Cette fresque, immense et brutale, demeure l’une des œuvres les plus puissantes jamais réalisées contre la violence."
  },
  {
    title: "The Great Wave off Kanagawa",
    artist_name: "Hokusai",
    category_names: ["illustration", "ukiyoe"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/960px-The_Great_Wave_off_Kanagawa.jpg",
    description: "La « Grande Vague » de Hokusai représente l’impitoyable force de la nature. Une vague gigantesque, sculpturale, se dresse comme une montagne liquide prête à s’abattre sur les barques fragiles de pêcheurs japonais. À l’horizon se tient le mont Fuji, minuscule mais immuable, symbole de stabilité. L’estampe marie élégance graphique, mouvement dynamique et profondeur symbolique. Elle est devenue une image universelle de la résilience humaine face aux éléments."
  },
  {
    title: "Afghan Girl",
    artist_name: "Steve McCurry",
    category_names: ["photography", "photojournalism"],
    description: "Photographie parmi les plus célèbres du XXe siècle, « Afghan Girl » capture le regard perçant d’une jeune réfugiée rencontrée dans un camp en 1984. Ses yeux verts, d’une intensité bouleversante, contrastent avec son foulard rouge usé. Steve McCurry fige ici une émotion brute, une combinaison de peur, de force et de dignité face à la guerre. Ce portrait est devenu un symbole mondial du photojournalisme et de la condition des réfugiés."
  },
  {
    title: "IKB 191 (International Klein Blue)",
    artist_name: "Yves Klein",
    category_names: ["painting", "contemporary", "conceptual"],
    description: "« IKB 191 » est une œuvre emblématique du monochrome contemporain. Yves Klein y utilise son célèbre International Klein Blue, une teinte profonde, veloutée et vibrante qu’il a lui-même brevetée. Ce bleu intense semble absorber le regard, évoquant la mer, le ciel ou l’infini sans jamais les représenter. Klein cherchait à libérer la couleur de toute forme pour atteindre la sensibilité pure, dépouillée de symboles ou de narration. Le résultat est une expérience contemplative où le spectateur est invité à se perdre dans l’immensité chromatique."
  },
  {
    title: "Fountain",
    artist_name: "Marcel Duchamp",
    category_names: ["sculpture", "dadaism", "conceptual"],
    description: "“Fountain”, un urinoir en porcelaine signé « R. Mutt », est sans doute l’œuvre la plus révolutionnaire du dadaïsme. En choisissant un objet manufacturé et en le présentant comme œuvre d’art, Duchamp renverse la définition même de l’art : il ne s’agit plus de créer, mais de choisir. Le geste est radical, provocateur et profondément intellectuel. Cette pièce ouvre la voie à l’art conceptuel, où l’idée prime sur l’objet."
  },
  {
    title: "Bottle Rack",
    artist_name: "Marcel Duchamp",
    category_names: ["sculpture", "dadaism", "conceptual"],
    description: "Avec le « Porte-bouteilles », Duchamp propose un ‘ready-made’ d’une simplicité désarmante : un objet utilitaire dépouillé de son usage pour devenir une œuvre d’art. En retirant le contexte et en signant l’objet, Duchamp force le spectateur à reconsidérer les frontières entre art et quotidien. Le porte-bouteilles, dans sa neutralité absolue, devient un manifeste silencieux : l’art n’est plus défini par sa beauté, mais par un geste conceptuel."
  }
]

artworks_data.each do |data|
  artwork = Artwork.find_or_create_by!(title: data[:title]) do |a|
    a.artist_name = data[:artist_name]
    a.description = data[:description]

    names = data[:category_names] || []
    a.categories = Category.where(name: names).to_a
  end

  if data[:image_url].present? && !artwork.image.attached?
    file = URI.open(data[:image_url])
    filename = artwork.title.parameterize + ".jpg"

    artwork.image.attach(
      io: file,
      filename: filename,
      content_type: file.content_type || "image/jpeg"
    )
  end
end

puts "Artworks created: #{Artwork.count}"
puts "Seeding completed successfully! 🎨✨"
