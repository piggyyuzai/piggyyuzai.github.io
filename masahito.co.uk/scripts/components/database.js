
//* notes for resizing:
//Hori 1000
//vert 600
//Th 400

const images = [
  {
    url: 'icecream-bunny',
    // color: 'red',
    thumb: 'icecream_bunny_th.png',
    illustrations: [
      {
        file: 'icecream_bunny.png',
        type: 'vert',
        notes: 'Bunny pretending to be an icecream.'
      }
    ]
  },
  {
    url: 'sleeping-bunnies',
    // color: 'red',
    thumb: 'sleeping_bunnies_th.png',
    illustrations: [
      {
        file: 'sleeping_bunnies.png',
        type: 'vert',
        notes: 'Sleeping bunnies.'
      }
    ]
  },
  {
    url: 'lion-lovers',
    // color: 'red',
    thumb: 'lion_lovers_th.png',
    illustrations: [
      {
        file: 'lion_lovers.png',
        type: 'hori',
        notes: 'Lion lovers.'
      }
    ]
  },
  {
    url: 'cat-dessert',
    // color: 'red',
    thumb: 'cat_dessert_th.png',
    illustrations: [
      {
        file: 'cat_dessert.png',
        type: 'vert',
        notes: 'Cat pretending to be a dessert.'
      }
    ]
  },
  {
    url: 'tiger-and-kittens',
    // color: 'red',
    thumb: 'tiger_and_kittens_th.png',
    illustrations: [
      {
        file: 'tiger_and_kittens.png',
        type: 'hori',
        notes: 'Tiger and her kitten friends.'
      }
    ]
  },
  {
    url: 'rockers',
    // color: 'red',
    thumb: 'kitten_rock_th.png',
    illustrations: [
      {
        file: 'kitten_rock.png',
        type: 'vert',
        notes: 'Kitten rock.'
      },
      {
        file: 'hamster_rock.png',
        type: 'vert',
        notes: 'Hamster rock.'
      }
    ]
  },
  {
    url: 'cocoa-koala',
    // color: 'red',
    thumb: 'cocoala_th.png',
    illustrations: [
      {
        file: 'cocoala.png',
        type: 'vert',
        notes: 'Cocoa koala.'
      }
    ]
  },
  {
    url: 'penguin-march',
    // color: 'red',
    thumb: 'penguin_march_th.png',
    illustrations: [
      {
        file: 'penguin_march.png',
        type: 'hori',
        notes: 'Marching penguins.'
      }
    ]
  },
  {
    url: 'popcorn-bunnies',
    // color: 'red',
    thumb: 'popcorn_bunnies_th.png',
    illustrations: [
      {
        file: 'popcorn_bunnies.png',
        type: 'vert',
        notes: 'Popcorn bunnies.'
      }
    ]
  },
  {
    url: 'puppy-choc-cake',
    color: 'rgb(109, 64, 44)',
    thumb: 'puppy_choc_cake_th.png',
    illustrations: [
      {
        file: 'puppy_choc_cake.png',
        type: 'hori',
        notes: 'Puppy chocolate cake.'
      }
    ]
  },
  {
    url: 'ted-idiom',
    // color: 'red',
    thumb: 'donguri_th.png',
    illustrations: [
      {
        file: 'donguri.png',
        type: 'vert',
        notes: '"Acorns comparing their heights" (Japanese idiom used to describe pointless comparison, eg when people are bad as each other).'
      },
      {
        file: 'cowandbuffalo.png',
        type: 'vert',
        notes: '"Cowness hasn\'t gone, buffaloness intervened" (Thai idiom, meaning new issues arising when the existing problem hasn\'t resolved.)'
      },
      {
        iframe: '<iframe  width="640" height="360" src="https://www.youtube.com/embed/DahAZ2DQ738?rel=0" frameborder="0" allowfullscreen></iframe>',
        type: 'hori',
        notes: 'I illustrated idioms from around the world for TED. You can read more about it on <a class="email" href="http://blog.ted.com/meet-some-of-the-worlds-best-idioms/" target="_blank">this page</a> and <a class="email" href="https://tedtranslators.com/2016/06/27/connecting-over-idioms-from-around-the-world/" target="_blank">this page</a>. You can view the whole set of idiom <a href="/TED_Booklet.pdf" target="_blank"/>here</a>.'
      }
    ]
  },
  {
    url: 'pandas',
    // color: 'red',
    thumb: 'panda_office_th.png',
    illustrations: [
      {
        file: 'panda_office.png',
        type: 'hori',
        notes: 'Panda office.'
      },
      {
        file: 'panda_kitchen.png',
        type: 'hori',
        notes: 'Panda kitchen.'
      },
      {
        file: 'panda_space.png',
        type: 'hori',
        notes: 'Pandas in space.'
      },
      {
        file: 'panda_arcade.png',
        type: 'hori',
        notes: 'Panda arcade.'
      },
      {
        file: 'panda_gallery.png',
        type: 'hori',
        notes: 'Panda gallery.'
      }
    ]
  },
  {
    url: 'animals',
    // color: 'red',
    thumb: 'animals_th.png',
    illustrations: [
      {
        file: 'animals.png',
        type: 'vert',
        notes: 'Animal friends.'
      }
    ]
  },
  {
    url: 'bunny-gifs',
    color: 'rgb(194, 248, 255)',
    thumb: 'bunny_smile_th.gif',
    illustrations: [
      {
        file: 'bunny_smile.gif',
        type: 'vert',
        notes: 'Smile!'
      },
      {
        file: 'mochi_bunny.gif',
        type: 'vert',
        notes: 'Mochi bunny.'
      }
    ]
  },
  {
    url: 'rhino-banana',
    // color: 'red',
    thumb: 'rhino_banana_th.png',
    illustrations: [
      {
        file: 'rhino_banana.png',
        type: 'vert',
        notes: 'Rhino banana.'
      }
    ]
  },
  {
    url: 'pizza-squirrel',
    // color: 'red',
    thumb: 'pizza_squirrel_th.png',
    illustrations: [
      {
        file: 'pizza_squirrel.png',
        type: 'hori',
        notes: 'Pizza squirrel.'
      }
    ]
  }
]

export default images