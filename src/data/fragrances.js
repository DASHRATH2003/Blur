import regent1 from '../assets/regent1.jpeg';
import oxford from '../assets/oxfordblue.jpeg';
import midnight from '../assets/midnight.jpeg';
import nacture from '../assets/nacture.jpeg';
import middush from '../assets/Midashrush.jpeg';
export const fragranceCollections = {
  mens: [
    {
      id: 'm1',
      name: 'Regent No.1',
      description: 'An iconic blend of fruits and smoky woods.',
      fullDescription: 'A bold yet refined scent that opens with juicy pineapple and crisp bergamot, softens with floral birch and rose, and settles into a smoky vanilla and musk base.',
      notes: {
        top: ['Pineapple', 'Bergamot', 'Apple'],
        heart: ['Birch', 'Jasmine', 'Rose'],
        base: ['Oakmoss', 'Vanilla', 'Musk']
      },
      family: 'Fruity Woody',
      vibe: ['Sophisticated', 'Powerful', 'Timeless'],
      image: regent1,
      price: 999
    },
    {
      id: 'm2',
      name: 'Oxford Blue',
      description: 'Fresh citrus and spice with a modern edge.',
      fullDescription: 'Bright and invigorating at first whiff, this fragrance evolves into a warm, spicy heart and finishes with woody incense and soft patchouli.',
      notes: {
        top: ['Grapefruit', 'Lemon', 'Mint', 'Pink Pepper'],
        heart: ['Ginger', 'Jasmine', 'Nutmeg'],
        base: ['Incense', 'Cedar', 'Patchouli', 'Sandalwood']
      },
      family: 'Aromatic Woody',
      vibe: ['Clean', 'Confident', 'Refined'],
      image: oxford,
      price: 899
    },
    {
      id: 'm3',
      name: 'Midnight Nomad',
      description: 'Crisp bergamot meets smoky woods.',
      fullDescription: 'This magnetic scent opens with a burst of citrus and pepper, leading into rugged earth tones and a modern musky finish.',
      notes: {
        top: ['Bergamot', 'Pepper'],
        heart: ['Lavender', 'Vetiver', 'Patchouli', 'Geranium'],
        base: ['Cedar', 'Ambroxan', 'Labdanum']
      },
      family: 'Aromatic Fresh',
      vibe: ['Adventurous', 'Rugged', 'Alluring'],
      image: midnight,
      price: 899
    },
    {
      id: 'm4',
      name: 'Nocturne Elixir',
      description: 'Sweet vanilla and smoky warmth collide.',
      fullDescription: 'A deep, sensual fragrance that blends cool mint and lavender with a rich, sweet core of vanilla and honeyed tobacco.',
      notes: {
        top: ['Lavender', 'Mint'],
        heart: ['Vanilla', 'Benzoin'],
        base: ['Honey', 'Tobacco', 'Tonka Bean']
      },
      family: 'Oriental Sweet',
      vibe: ['Bold', 'Seductive', 'Addictive'],
      image: nacture,
      price: 999
    },
    {
      id: 'm5',
      name: 'Midas Rush',
      description: 'Energizing citrus, spices, and leather.',
      fullDescription: 'Explosive citrus and mint meet a spicy heart of cinnamon and rose, layered over a masculine base of leather and amber.',
      notes: {
        top: ['Blood Mandarin', 'Mint', 'Grapefruit'],
        heart: ['Cinnamon', 'Rose', 'Spices'],
        base: ['Amber', 'Leather', 'Patchouli', 'Woody Notes']
      },
      family: 'Spicy Leather',
      vibe: ['Daring', 'Energetic', 'Irresistible'],
      image: middush,
      price: 899
    }
  ],
  womens: [
    {
      id: 'w1',
      name: 'Midnight Bloom',
      description: 'Sweet fruits meet deep coffee & vanilla.',
      fullDescription: 'A seductive contrast of bright pear and pink pepper with a bold coffee heart, softened by sweet vanilla and woods.',
      notes: {
        top: ['Pear', 'Pink Pepper', 'Orange Blossom'],
        heart: ['Coffee', 'Jasmine', 'Bitter Almond', 'Licorice'],
        base: ['Vanilla', 'Patchouli', 'Cedar', 'Cashmere Wood']
      },
      family: 'Gourmand Floral',
      vibe: ['Sensual', 'Addictive', 'Glamorous'],
      image: '/images/midnight-bloom.jpg',
      price: 899
    },
    {
      id: 'w2',
      name: 'Velvet Heel',
      description: 'Red berries, blooming rose, warm vanilla.',
      fullDescription: 'This modern floral scent opens with juicy litchi and red currant, centering around a lush rose and grounded in creamy vanilla and vetiver.',
      notes: {
        top: ['Litchi', 'Red Currant'],
        heart: ['Rose'],
        base: ['Vanilla', 'Vetiver']
      },
      family: 'Floral Fruity',
      vibe: ['Elegant', 'Playful', 'Bold'],
      image: '/images/velvet-heel.jpg',
      price: 799
    },
    {
      id: 'w3',
      name: 'Crush Amour',
      description: 'A fruity floral explosion with a soft finish.',
      fullDescription: 'Bursting with tropical fruit and sweet florals, this youthful scent is balanced by a soft musk and earthy base.',
      notes: {
        top: ['Passion Fruit', 'Pineapple', 'Grapefruit', 'Strawberry'],
        heart: ['Jasmine', 'Red Berries', 'Lily of the Valley'],
        base: ['Musk', 'Oakmoss', 'Woody Notes']
      },
      family: 'Fruity Floral',
      vibe: ['Vibrant', 'Flirty', 'Radiant'],
      image: '/images/crush-amour.jpg',
      price: 799
    },
    {
      id: 'w4',
      name: 'Parisian Muse',
      description: 'Elegant florals and soft earthy depth.',
      fullDescription: 'Sophisticated and timeless, this scent opens with citrus, blooms into soft rose and jasmine, and lingers with patchouli and warm musk.',
      notes: {
        top: ['Orange', 'Bergamot', 'Grapefruit'],
        heart: ['Rose', 'Jasmine', 'Litchi'],
        base: ['Patchouli', 'Vanilla', 'Musk', 'Vetiver']
      },
      family: 'Chypre Floral',
      vibe: ['Chic', 'Modern', 'Feminine'],
      image: '/images/parisian-muse.jpg',
      price: 899
    },
    {
      id: 'w5',
      name: 'Lumiere Belle',
      description: 'Soft florals & praline on a sweet base.',
      fullDescription: 'A luminous, feminine scent blending elegant florals with sweet praline and warm vanilla for a lasting impression.',
      notes: {
        top: ['Pear', 'Blackcurrant'],
        heart: ['Iris', 'Jasmine', 'Orange Blossom'],
        base: ['Praline', 'Patchouli', 'Tonka Bean', 'Vanilla']
      },
      family: 'Floral Gourmand',
      vibe: ['Radiant', 'Romantic', 'Uplifting'],
      image: '/images/lumiere-belle.jpg',
      price: 899
    }
  ],
  sugar: [
    {
      id: 's1',
      name: 'Sugar Oud',
      description: 'Warm vanilla, brown sugar, and golden amber.',
      fullDescription: 'A decadent fusion of jasmine and vanilla orchid at the top, mellowed by sweet tonka and brown sugar, with a cozy amber-musk finish.',
      notes: {
        top: ['Vanilla Orchid', 'Jasmine'],
        heart: ['Brown Sugar', 'Tonka Bean'],
        base: ['Amber', 'Patchouli', 'Musk']
      },
      family: 'Gourmand Amber',
      vibe: ['Cozy', 'Luxe', 'Addictive'],
      image: '/images/sugar-oud.jpg',
      price: 799
    },
    {
      id: 's2',
      name: 'Cream Cloud',
      description: 'A dreamy, airy blend of sweets and musk.',
      fullDescription: 'Fluffy whipped cream and praline meet delicate florals and tropical coconut, grounded by a soft, comforting base of musk and woods.',
      notes: {
        top: ['Pear', 'Lavender', 'Bergamot'],
        heart: ['Coconut', 'Whipped Cream', 'Praline', 'Vanilla Orchid'],
        base: ['Vanilla', 'Musk', 'Woody Notes']
      },
      family: 'Sweet Floral',
      vibe: ['Soft', 'Playful', 'Airy'],
      image: '/images/cream-cloud.jpg',
      price: 799
    },
    {
      id: 's3',
      name: 'Cotton Candy Kiss',
      description: 'Candy-coated fruits on a sugar-spun base.',
      fullDescription: 'This nostalgic scent swirls vibrant citrus and berries with sugary cotton candy and finishes in warm vanilla caramel delight.',
      notes: {
        top: ['Orange', 'Bergamot', 'Fig Leaves'],
        heart: ['Cotton Candy', 'Licorice', 'Red Berries', 'Strawberry'],
        base: ['Caramel', 'Musk', 'Vanilla', 'Tonka Bean']
      },
      family: 'Sweet Fruity',
      vibe: ['Flirty', 'Sweet', 'Fun-loving'],
      image: '/images/cotton-candy-kiss.jpg',
      price: 799
    },
    {
      id: 's4',
      name: 'Marshmallow Musk',
      description: 'Sugar and floral harmony on a musky base.',
      fullDescription: 'A sensual and sweet blend of orange blossom, jasmine, and honeysuckle, layered over warm vanilla, caramel, and soft musks.',
      notes: {
        top: ['Neroli', 'Bergamot', 'Pink Pepper', 'Coriander'],
        heart: ['Orange Blossom', 'Honeysuckle', 'Jasmine', 'Rose'],
        base: ['Sugar', 'Vanilla', 'Caramel', 'Musk', 'Labdanum']
      },
      family: 'Floral Gourmand',
      vibe: ['Sweet', 'Soft', 'Captivating'],
      image: '/images/marshmallow-musk.jpg',
      price: 799
    },
    {
      id: 's5',
      name: 'Caramel Rouge',
      description: 'Smooth caramel with powdery musk and warm vanilla.',
      fullDescription: 'Simple yet luxurious, this fragrance opens with rich caramel and melts into soft musk and sensual vanilla-benzoin.',
      notes: {
        top: ['Caramel'],
        heart: ['Musk', 'Powdery Notes'],
        base: ['Vanilla', 'Benzoin']
      },
      family: 'Gourmand Oriental',
      vibe: ['Warm', 'Feminine', 'Cozy'],
      image: '/images/caramel-rouge.jpg',
      price: 799
    }
  ]
}; 