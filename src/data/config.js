/**
 * NOVA ONE — PERSONAL EDITION CONFIGURATION
 * Made exclusively for Thangow 💗
 */

export const CONFIG = {
  PHONE_TITLE: "NOVA ONE — Personal Edition",
  RECIPIENT_NAME: "Thangow",
  NICKNAME: "chelloww",
  BIRTHDAY_DATE: "October 11",
  
  // Lock Screen
  LOCK_GREETING: "Hey Thangow... 👀❤️",
  LOCK_SUBTITLE: "I made something special for you...",
  LOCK_BUTTON: "Unlock Your Surprise 💗",
  LOCK_WALLPAPER: "/assets/images/lockscreen-wallpaper.jpg",

  // Home Screen
  COUPLE_WALLPAPER: "/assets/images/couple-wallpaper.jpg",

  // Messages App
  MESSAGES: [
    {
      id: 1,
      sender: "You",
      text: "Heyyy chellowww 🥹💗 Indha secret phone unakkaga mattum dhaan thangoww! 👀✨",
      time: "10:11 AM"
    },
    {
      id: 2,
      sender: "You",
      text: "Un birthday-ku usual-ah wish panna enakku manasu varala chellow 🫣💗 Adhaan unakkaga ippadi oru cute surprise ready pannirukken, thangowww! 🎀🫶🏻 Ithu unakku nejamave pidikkumanu therila 🙂 irundhalum unakkaga pannirukken 🤩",
      time: "10:11 AM"
    },
    {
      id: 3,
      sender: "You",
      text: "Eppovum ithey maadhiri happy-ah iru chelloww! Un face-la irukkura smile eppovum disappear aaga koodadhu thangoww 🥹💖 Naa unkooda eppovume ithey maadhiri iruppen 🫂 Unna purinjukittu nadandhupen. Unakku ellame nalladha nadakkanum! 🧿✨",
      time: "10:12 AM"
    },
    {
      id: 4,
      sender: "You",
      text: "Innum neraya secrets irukku chelloww 👀💌 Gallery-ah paaru, songs kelu, Notes-la irukkura letter-ah padi… aana Birthday.exe-ah marandhudadha thangowww! 🤭💗",
      time: "10:12 AM"
    }
  ],
  MESSAGES_BUTTON_LABEL: "Next chelloww 💌",

  // Gallery App — Exactly 3 vertical albums
  ALBUMS: [
    {
      id: "quiet-moments",
      title: "Quiet Moments 💗",
      thumbnail: "/assets/images/gallery-quiet-1.jpg",
      description: "Ithuthan en life-la unkooda travel panna marakka mudiyatha travel-nu sollalam 🥰",
      photos: [
        {
          id: "q1",
          url: "/assets/images/gallery-quiet-1.jpg",
          caption: "Unkooda travel panna marakka mudiyatha travel 🥰",
          exif: {
            date: "October 11 // 10:11 AM",
            location: "Our Special Journey",
            clue: "PIN_CODE: 1011",
            note: "Key for Notes Archive Sector 02 is 1011"
          }
        }
      ]
    },
    {
      id: "little-wonders",
      title: "Little Wonders ✨",
      thumbnail: "/assets/images/gallery-wonders-1.jpg",
      description: "Ellarukum payanthu payanthu pona moment ithu 😂",
      photos: [
        {
          id: "w1",
          url: "/assets/images/gallery-wonders-1.jpg",
          caption: "Ellarukum payanthu payanthu pona moment ithu 😂",
          exif: {
            date: "October 11 // 14:32 PM",
            location: "Secret Corner",
            clue: "FREQ_TUNER: 432 Hz",
            note: "Harmonic Audio Tuner in Music should be set to 432 Hz"
          }
        }
      ]
    },
    {
      id: "funny-images",
      title: "Funny Images 😄",
      thumbnail: "/assets/images/gallery-funny-1.jpg",
      description: "Ella photos-ah vida intha photos-la tha romba azhaga irukka 🤩",
      photos: [
        {
          id: "f1",
          url: "/assets/images/gallery-funny-1.jpg",
          caption: "Ella photos-ah vida intha photos-la tha romba azhaga irukka 🤩",
          exif: {
            date: "October 11 // 16:20 PM",
            location: "Happiness HQ",
            clue: "OVERRIDE: PROTOCOL_ORPHEUS",
            note: "Master Terminal Override Passphrase"
          }
        },
        {
          id: "f2",
          url: "/assets/images/gallery-funny-2.jpg",
          caption: "Cutest smile and sweetest laugh 😂💗",
          exif: {
            date: "October 11 // 17:05 PM",
            location: "Smiling always",
            clue: "FRAGMENT_VERIFIED",
            note: "Memory integrity: 100%"
          }
        },
        {
          id: "f3",
          url: "/assets/images/gallery-funny-3.jpg",
          caption: "Unforgettable candid moment ✨🥰",
          exif: {
            date: "October 11 // 18:45 PM",
            location: "Good Times",
            clue: "SECTOR_LOCKED",
            note: "Special memories saved"
          }
        },
        {
          id: "f4",
          url: "/assets/images/gallery-funny-4.jpg",
          caption: "My favorite person in the entire world 💖",
          exif: {
            date: "October 11 // 19:15 PM",
            location: "Forever in my heart",
            clue: "LOVE_OVERFLOW",
            note: "Treasured forever"
          }
        }
      ]
    }
  ],

  // Music App
  SONG: {
    title: "Vaa Senthaazhini",
    movie: "Adiyae",
    singer: "Sid Sriram",
    composer: "Justin Prabhakaran",
    officialLink: "https://www.studioflicks.com/video/vaa-senthaazhini-lyric-video-adiyae/"
  },

  // Notes App
  LETTER: {
    title: "To My Dearest Thangow 💗",
    body: `Happy Birthday, Thangow! 💗🫂

I wanted to make something truly special for you this year — something that couldn't simply be bought in a store, but had to be built with every piece of my heart.

From the quiet conversations to the uncontrollable laughs, having you in my life is the greatest blessing. Your presence brings an effortless warmth that brightens even the cloudiest days.

Never forget how incredibly smart, caring, beautiful, and rare you are. I hope this new year of your life overflows with pure joy, boundless success, vibrant health, and every single dream your heart desires.

Keep shining, keep smiling, and always be the wonderful soul that you are.

Once again, Happy Birthday Thangow! 🎂✨

Forever wishing for your happiness,
— Your Special Person 💖`
  },
  NOTES_PIN: "1011",

  // Special Reasons App
  SPECIAL_REASONS: [
    {
      id: 1,
      tag: "Reason 01",
      title: "Your Contagious Smile 🌸",
      desc: "The way your entire face lights up and your eyes crinkle with genuine joy. One look at you smiling can turn anyone's hardest day around.",
      emoji: "✨"
    },
    {
      id: 2,
      tag: "Reason 02",
      title: "Pure & Empathetic Heart 🤍",
      desc: "You care so deeply about the people in your life. Your kindness isn't an act; it's just who you naturally are, and it inspires me every day.",
      emoji: "🫂"
    },
    {
      id: 3,
      tag: "Reason 03",
      title: "Unmatched Good Energy ⚡",
      desc: "Whether we are doing something exciting or simply chilling in silence, being around you feels like home. There's never a dull second.",
      emoji: "💫"
    },
    {
      id: 4,
      tag: "Reason 04",
      title: "My Safe Haven 🏡",
      desc: "Whenever the world gets overwhelming, talking to you brings an instant sense of calm and clarity. You are truly my comfort zone.",
      emoji: "🌸"
    },
    {
      id: 5,
      tag: "Reason 05",
      title: "Rare & Irreplaceable Soul 💖",
      desc: "In a world of billions of people, there is genuinely nobody like you. Your quirks, your laughter, your heart — they are uniquely yours.",
      emoji: "👑"
    },
    {
      id: 6,
      tag: "Reason 06",
      title: "Master Override Clue 🔐",
      desc: "System Diagnostic Sector 3: The secret override passphrase for Birthday.exe is 'PROTOCOL_ORPHEUS'. Keep this in mind when entering the terminal!",
      emoji: "🔑"
    }
  ],

  // Birthday Welcome Experience
  BIRTHDAY_WELCOME: {
    heading: "Happy Birthday thangow💗🫂",
    wish: "May your day be filled with endless smiles, pure happiness, and all the magical dreams you wish for!",
    buttonText: "Open Your Surprise 💌"
  },

  // Interactive Birthday Surprise
  BIRTHDAY_SURPRISE: {
    heading: "A Special Day For My Special Person 💖",
    cakeHint: "Tap the candles to blow them out! 🎂✨",
    cakeBlown: "Yay! All candles blown out! Make a wish, Thangow! 🌟💗",
    secretBtnText: "ONE LAST SECRET 💌"
  },

  // Secret Message Card
  SECRET_MESSAGES: {
    line1: "Love you so much 🫶🏻😘",
    line2: "Miss you so much 🥹🫠"
  },

  // Final Closing Quote
  FINAL_CLOSING: "The surprise ends here... But the memories continue forever. ✨❤️"
};
