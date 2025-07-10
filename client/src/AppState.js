import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {import('./models/TowerEvent.js').TowerEvent[]}*/
  towerEvents: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent}*/
  towerEvent: null,

  /** @type {import('./models/Ticket.js').TicketProfile[]} */
  ticketProfiles: [],

  activeCategory: 'all',

  categories: [
    {
      name: 'all',
      nickname: 'All',
      emoji: 'mdi mdi-all-inclusive',
      color: 'success'
    },
    {
      name: 'concert',
      nickname: 'Concerts',
      emoji: 'mdi mdi-guitar-electric',
      color: 'warning',
    },
    {
      name: 'convention',
      nickname: 'Conventions',
      emoji: 'mdi mdi-account-group',
      color: 'primary'
    },
    {
      name: 'sport',
      nickname: 'Sports',
      emoji: 'mdi mdi-football-australian',
      color: 'info'
    },
    {
      name: 'digital',
      nickname: 'Digital',
      emoji: 'mdi mdi-desktop-classic',
      color: 'danger'
    }
  ],

  slides: [
  {
    imgUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D',
    header: 'More Music for You, More Processing Fees for Us',
    subheader: 'Getting scammed out of 200% the original ticket price for a concert has never been easier than it is with Tower. Now, instead of waiting in line for tickets at a booth all day, you can stay home, kick back your feet, and watch us drain your bank account in real time.'
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1545056453-f0359c3df6db?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym93bGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    header: "What Do You Mean You Didn't Save Your Ticket In Your Apple Wallet?",
    subheader: 'Now you have to sit there awkwardly with a line of people behind you trying to get into the Winnemucca First Intermediate Bowling Tournament, while you dig through your email 6 months back looking for that ticket receipt... Nice, dude.'
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1631885629112-7c9f22447ee1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHBlb3BsZSUyMGF0JTIwYSUyMHBhcnR5fGVufDB8fDB8fHww',
    header: 'Get Out and Find Some Friends, You Dweeb',
    subheader: 'With Tower you can finally find meet & greets or "creepy dude that stands in the corner at parties" conventions where you might be able to meet someone that actually likes your off-putting demeanor (probably not, though).'
  }
]
})

