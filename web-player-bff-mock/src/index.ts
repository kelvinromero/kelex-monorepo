import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
    type Query {
        episodes: [Episode]
        episodesByTitle(title: String!): [Episode]
        findEpisodeByFuzzyTitle(title: String!): [Episode]
        episodeById(id: ID!): Episode
    }
    
    type Episode {
        id: ID!
        title: String!
        description: String!
        mediaUrl: String!
        transcript: Transcript!
        podcast: Podcast!
    }
    
    type Podcast {
        id: ID!
        title: String!
        description: String!
        episodes: [Episode]
    }
    
    type Transcript {
        lines: [TranscriptLine]
    }
    
    type TranscriptLine {
        text: String!
        start: String!
        duration: String!
    }
    
    type Message {
        content: String!
        role: String!
    }
    
    type Mutation {
        chatAboutEpisode(episodeId: ID!, message: String!): Message!
    }
`;

const episodes = [
    {
        id: '1',
        title: 'Episode 1',
        description: 'The first episode',
        mediaUrl: 'https://www.youtube.com/embed/0OcN30pHXs8?si=N7UChgXJIb-NePXh',
        transcript: {
            lines: [
                {
                    text: 'This is the first line of the transcript',
                    start: '00:00:00',
                    duration: '00:00:05',
                },
                {
                    text: 'This is the second line of the transcript',
                    start: '00:00:05',
                    duration: '00:00:05',
                },
            ],
        },
        podcast: {
            id: '1',
            title: 'Podcast 1',
            description: 'The first podcast',
        },
    },
    {
        id: '2',
        title: 'Episode 2',
        description: 'The second episode',
        mediaUrl: 'https://www.youtube.com/embed/_f7AkEdmqpI?si=-dOTYB1l_RZi8PT1',
            transcript: {
              lines: [
                {
                  duration: "1.022",
                  text: "Hello everyone!",
                  start: "0.0"
                },
                {
                  duration: "0.653",
                  text: "I’m Grace.",
                  start: "1.022"
                },
                {
                  duration: "3.002",
                  text: "Today, I’m going to interview a Chinese language learner",
                  start: "1.675"
                },
                {
                  duration: "3.054",
                  text: "who has reached a high level of proficiency",
                  start: "4.677"
                },
                {
                  duration: "3.519",
                  text: "through self-study in just a year and a half.",
                  start: "7.731"
                },
                {
                  duration: "1.045",
                  text: "In this interview,",
                  start: "19.008"
                },
                {
                  duration: "2.576",
                  text: "you’ll find out what resources and methods",
                  start: "20.053"
                },
                {
                  duration: "2.581",
                  text: "he used to help him reach this level.",
                  start: "22.629"
                },
                {
                  duration: "2.558",
                  text: "And our conversation will be all in Chinese,",
                  start: "25.21"
                },
                {
                  duration: "3.256",
                  text: "so remember to turn on the subtitles if needed.",
                  start: "27.768"
                },
                {
                  duration: "2.742",
                  text: "Now without further ado, let’s get started!",
                  start: "31.024"
                },
                {
                    duration: "3.318",
                    text: "Since our topic for today is how to self-study Chinese,",
                    start: "46.636"
                  },
                  {
                    duration: "2.908",
                    text: "I must introduce you to this exceptional tool",
                    start: "49.954"
                  },
                  {
                    duration: "2.361",
                    text: "that can greatly enhance your learning journey.",
                    start: "52.862"
                  },
                  {
                    duration: "1.544",
                    text: "It’s a Chinese dictionary app",
                    start: "55.223"
                  },
                  {
                    duration: "3.729",
                    text: "that is specifically designed for Chinese language learners",
                    start: "56.767"
                  },
                  {
                    duration: "1.428",
                    text: "Juzi 汉语.",
                    start: "60.496"
                  },
                  {
                    duration: "2.48",
                    text: "It’s also the sponsor of today’s video.",
                    start: "61.924"
                  },
                  {
                    duration: "1.212",
                    text: "I recommend it because",
                    start: "64.404"
                  },
                  {
                    duration: "2.694",
                    text: "it is more than just an ordinary dictionary.",
                    start: "65.616"
                  },
                  {
                    duration: "1.623",
                    text: "When you look up a word in it,",
                    start: "68.31"
                  },
                  {
                    duration: "2.318",
                    text: "it provides not only the meaning",
                    start: "69.933"
                  },
                  {
                    duration: "3.964",
                    text: "but also illustrates how to effectively use the word.",
                    start: "72.251"
                  },
                  {
                    duration: "3.754",
                    text: "It offers common word combinations and structures,",
                    start: "76.215"
                  },
                  {
                    duration: "2.475",
                    text: "each accompanied by multiple examples",
                    start: "79.969"
                  },
                  {
                    duration: "4.056",
                    text: "to help you utilize the word naturally in conversation.",
                    start: "82.444"
                  },
                  {
                    duration: "3.58",
                    text: "For example, many of you might find “就” in Chinese",
                    start: "86.5"
                  },
                  {
                    duration: "3.197",
                    text: "quite confusing as it can appear in many context,",
                    start: "90.08"
                  },
                  {
                    duration: "1.704",
                    text: "expressing different meanings.",
                    start: "93.277"
                  },
                  {
                    duration: "2.612",
                    text: "If you search for it in this dictionary,",
                    start: "94.981"
                  },
                  {
                    duration: "2.757",
                    text: "you can learn in what contexts it shows up",
                    start: "97.593"
                  },
                  {
                    duration: "2.404",
                    text: "and what the meanings of it are.",
                    start: "100.35"
                  },
                  {
                    duration: "2.358",
                    text: "It’s very useful.",
                    start: "102.754"
                  },
                  {
                    duration: "3.423",
                    text: "Also, if you would like to expand your Chinese vocabulary,",
                    start: "105.112"
                  },
                  {
                    duration: "2.125",
                    text: "this dictionary is also very helpful,",
                    start: "108.535"
                  },
                  {
                    duration: "3.392",
                    text: "it helps you grasp the meanings of Chinese characters",
                    start: "110.66"
                  },
                  {
                    duration: "3.264",
                    text: "and lets you know how these characters are used",
                    start: "114.052"
                  },
                  {
                    duration: "1.566",
                    text: "to create different words.",
                    start: "117.316"
                  },
                  {
                    duration: "3.556",
                    text: "It’ll definitely help you learn new words way faster.",
                    start: "118.882"
                  },
                  {
                    duration: "2.794",
                    text: "There are a lot more useful functions in this app,",
                    start: "122.438"
                  },
                  {
                    duration: "0.909",
                    text: "for example,",
                    start: "125.232"
                  },
                  {
                    duration: "2.803",
                    text: "you can view stroke order of the characters,",
                    start: "126.141"
                  },
                  {
                    duration: "1.312",
                    text: "practice writing them",
                    start: "128.944"
                  },
                  {
                    duration: "4.466",
                    text: "or generate printable worksheets for handwriting.",
                    start: "130.256"
                  },
                  {
                    duration: "2.546",
                    text: "For upper-intermediate to advanced learners",
                    start: "134.722"
                  },
                  {
                    duration: "2.856",
                    text: "who often find Chinese synonyms confusing,",
                    start: "137.268"
                  },
                  {
                    duration: "2.152",
                    text: "this dictionary can be very handy.",
                    start: "140.124"
                  },
                  {
                    duration: "2.735",
                    text: "It provides explanations and examples",
                    start: "142.276"
                  },
                  {
                    duration: "2.889",
                    text: "to help you distinguish between similar words.",
                    start: "145.011"
                  },
                  {
                    duration: "2.429",
                    text: "If you're interested in trying out this app,",
                    start: "147.9"
                  },
                  {
                    duration: "2.688",
                    text: "I've included a link in the description.",
                    start: "150.329"
                  },
                  {
                    duration: "1.734",
                    text: "You can try it for free initially,",
                    start: "153.017"
                  },
                  {
                    duration: "1.524",
                    text: "and if it suits your needs,",
                    start: "154.751"
                  },
                  {
                    duration: "2.424",
                    text: "you can use my code \"Grace20\"",
                    start: "156.275"
                  },
                  {
                    duration: "3.176",
                    text: "to get a 20% discount on your subscription.",
                    start: "158.699"
                  },
                  {
                    duration: "1.755",
                    text: "W: At that time, I had a Chinese friend",
                    start: "167.854"
                  },
                  {
                    duration: "2.325",
                    text: "who would chat with me in Chinese for an hour every day.",
                    start: "169.609"
                  },
                  {
                    duration: "2.133",
                    text: "G: But when you were just starting out",
                    start: "171.934"
                  },
                  {
                    duration: "1.626",
                    text: "and hadn't learned anything,",
                    start: "174.067"
                  },
                  {
                    duration: "1.546",
                    text: "how did you chat with him?",
                    start: "175.693"
                  },
                  {
                    duration: "2.992",
                    text: "W: It was simple conversations,",
                    start: "177.239"
                  },
                  {
                    duration: "3.095",
                    text: "like asking, \"What did you have for breakfast today?\"",
                    start: "180.231"
                  },
                  {
                    duration: "2.955",
                    text: "I found those words online",
                    start: "183.326"
                  },
                  {
                    duration: "3.334",
                    text: "and added them to the Anki app to memorize.",
                    start: "186.281"
                  },
                  {
                    duration: "4.466",
                    text: "When I had about 100 words or so,",
                    start: "189.615"
                  },
                  {
                    duration: "2.306",
                    text: "I started chatting with him.",
                    start: "194.081"
                  },
                  {
                    duration: "2.421",
                    text: "He would constantly teach me new expressions.",
                    start: "196.387"
                  },
                  {
                    duration: "3.962",
                    text: "After I had built a solid foundation，",
                    start: "198.808"
                  },
                  {
                    duration: "3.544",
                    text: "I could explore topics that interested me.",
                    start: "202.77"
                  },
                  {
                    duration: "3.046",
                    text: "I developed some simple habits for myself,",
                    start: "208.777"
                  },
                  {
                    duration: "3.824",
                    text: "like listening to podcasts when I go out alone.",
                    start: "211.823"
                  },
                  {
                    duration: "4.79",
                    text: "And when I have free time at home or when I want to relax,",
                    start: "221.494"
                  },
                  {
                    duration: "2.249",
                    text: "I watch Chinese TV dramas.",
                    start: "226.284"
                  },
                  {
                    duration: "2.682",
                    text: "I also make sure to study with Anki every day,",
                    start: "228.533"
                  },
                  {
                    duration: "1.621",
                    text: "adding at least five flashcards.",
                    start: "231.215"
                  },
                  {
                    duration: "0.843",
                    text: "If I add five cards,",
                    start: "232.836"
                  },
                  {
                    duration: "3.342",
                    text: "I need to review them for at least 20 minutes to half an hour each day.",
                    start: "233.679"
                  },
                  {
                    duration: "1.862",
                    text: "However, I may spend more time",
                    start: "237.021"
                  },
                  {
                    duration: "2.865",
                    text: "because my review process",
                    start: "238.883"
                  },
                  {
                    duration: "1.943",
                    text: "is different from most people.",
                    start: "241.748"
                  },
                  {
                    duration: "1.575",
                    text: "Most people might just look at a flashcard",
                    start: "243.691"
                  },
                  {
                    duration: "2.161",
                    text: "and say, \"Oh, I know it,\" and move on.",
                    start: "245.266"
                  },
                  {
                    duration: "2.907",
                    text: "But for me, I constantly create sentences",
                    start: "247.427"
                  },
                  {
                    duration: "1.941",
                    text: "and speak them out loud.",
                    start: "250.334"
                  },
                  {
                    duration: "2.374",
                    text: "I test if I can actually use those words",
                    start: "252.275"
                  },
                  {
                    duration: "1.719",
                    text: "because many people may think",
                    start: "254.649"
                  },
                  {
                    duration: "1.761",
                    text: "they have mastered the words they’re learning,",
                    start: "256.368"
                  },
                  {
                    duration: "2.428",
                    text: "but when they have to speak,",
                    start: "258.129"
                  },
                  {
                    duration: "1.833",
                    text: "they struggle to use them.",
                    start: "260.557"
                  },
                  {
                    duration: "2.599",
                    text: "G: Your method aligns with what I mentioned",
                    start: "262.39"
                  },
                  {
                    duration: "3.26",
                    text: "in a previous video about increasing vocabulary.",
                    start: "264.989"
                  },
                  {
                    duration: "2.632",
                    text: "To remember new words,",
                    start: "268.249"
                  },
                  {
                    duration: "3.878",
                    text: "it's important to not only memorize them",
                    start: "270.881"
                  },
                  {
                    duration: "4.796",
                    text: "but also use them in sentences related to your life.",
                    start: "274.759"
                  },
                  {
                    duration: "4.094",
                    text: "W: Yes, this part is crucial.",
                    start: "279.555"
                  },
                  {
                    duration: "0.916",
                    text: "Why is that?",
                    start: "283.649"
                  },
                  {
                    duration: "2.781",
                    text: "Because our memory itself",
                    start: "284.565"
                  },
                  {
                    duration: "2.018",
                    text: "is related to things that",
                    start: "287.346"
                  },
                  {
                    duration: "3.468",
                    text: "connect to our own lives",
                    start: "289.364"
                  },
                  {
                    duration: "3.014",
                    text: "or have some emotional attachment.",
                    start: "292.832"
                  }
                  
            ],
        },
        podcast: {
            id: '1',
            title: 'Podcast 1',
            description: 'The first podcast',
        },
    },
];

const podcasts = [
    {
        id: '1',
        title: 'Podcast 1',
        description: 'The first podcast',
    },
];

const transcriptLines = [
        {
          duration: "1.022",
          text: "Hello everyone!",
          start: "0.0"
        },
        {
          duration: "0.653",
          text: "I’m Grace.",
          start: "1.022"
        },
        {
          duration: "3.002",
          text: "Today, I’m going to interview a Chinese language learner",
          start: "1.675"
        },
        {
          duration: "3.054",
          text: "who has reached a high level of proficiency",
          start: "4.677"
        },
        {
          duration: "3.519",
          text: "through self-study in just a year and a half.",
          start: "7.731"
        },
        {
          duration: "1.045",
          text: "In this interview,",
          start: "19.008"
        },
        {
          duration: "2.576",
          text: "you’ll find out what resources and methods",
          start: "20.053"
        },
        {
          duration: "2.581",
          text: "he used to help him reach this level.",
          start: "22.629"
        },
        {
          duration: "2.558",
          text: "And our conversation will be all in Chinese,",
          start: "25.21"
        },
        {
          duration: "3.256",
          text: "so remember to turn on the subtitles if needed.",
          start: "27.768"
        },
        {
          duration: "2.742",
          text: "Now without further ado, let’s get started!",
          start: "31.024"
        },
        {
            duration: "3.318",
            text: "Since our topic for today is how to self-study Chinese,",
            start: "46.636"
          },
          {
            duration: "2.908",
            text: "I must introduce you to this exceptional tool",
            start: "49.954"
          },
          {
            duration: "2.361",
            text: "that can greatly enhance your learning journey.",
            start: "52.862"
          },
          {
            duration: "1.544",
            text: "It’s a Chinese dictionary app",
            start: "55.223"
          },
          {
            duration: "3.729",
            text: "that is specifically designed for Chinese language learners",
            start: "56.767"
          },
          {
            duration: "1.428",
            text: "Juzi 汉语.",
            start: "60.496"
          },
          {
            duration: "2.48",
            text: "It’s also the sponsor of today’s video.",
            start: "61.924"
          },
          {
            duration: "1.212",
            text: "I recommend it because",
            start: "64.404"
          },
          {
            duration: "2.694",
            text: "it is more than just an ordinary dictionary.",
            start: "65.616"
          },
          {
            duration: "1.623",
            text: "When you look up a word in it,",
            start: "68.31"
          },
          {
            duration: "2.318",
            text: "it provides not only the meaning",
            start: "69.933"
          },
          {
            duration: "3.964",
            text: "but also illustrates how to effectively use the word.",
            start: "72.251"
          },
          {
            duration: "3.754",
            text: "It offers common word combinations and structures,",
            start: "76.215"
          },
          {
            duration: "2.475",
            text: "each accompanied by multiple examples",
            start: "79.969"
          },
          {
            duration: "4.056",
            text: "to help you utilize the word naturally in conversation.",
            start: "82.444"
          },
          {
            duration: "3.58",
            text: "For example, many of you might find “就” in Chinese",
            start: "86.5"
          },
          {
            duration: "3.197",
            text: "quite confusing as it can appear in many context,",
            start: "90.08"
          },
          {
            duration: "1.704",
            text: "expressing different meanings.",
            start: "93.277"
          },
          {
            duration: "2.612",
            text: "If you search for it in this dictionary,",
            start: "94.981"
          },
          {
            duration: "2.757",
            text: "you can learn in what contexts it shows up",
            start: "97.593"
          },
          {
            duration: "2.404",
            text: "and what the meanings of it are.",
            start: "100.35"
          },
          {
            duration: "2.358",
            text: "It’s very useful.",
            start: "102.754"
          },
          {
            duration: "3.423",
            text: "Also, if you would like to expand your Chinese vocabulary,",
            start: "105.112"
          },
          {
            duration: "2.125",
            text: "this dictionary is also very helpful,",
            start: "108.535"
          },
          {
            duration: "3.392",
            text: "it helps you grasp the meanings of Chinese characters",
            start: "110.66"
          },
          {
            duration: "3.264",
            text: "and lets you know how these characters are used",
            start: "114.052"
          },
          {
            duration: "1.566",
            text: "to create different words.",
            start: "117.316"
          },
          {
            duration: "3.556",
            text: "It’ll definitely help you learn new words way faster.",
            start: "118.882"
          },
          {
            duration: "2.794",
            text: "There are a lot more useful functions in this app,",
            start: "122.438"
          },
          {
            duration: "0.909",
            text: "for example,",
            start: "125.232"
          },
          {
            duration: "2.803",
            text: "you can view stroke order of the characters,",
            start: "126.141"
          },
          {
            duration: "1.312",
            text: "practice writing them",
            start: "128.944"
          },
          {
            duration: "4.466",
            text: "or generate printable worksheets for handwriting.",
            start: "130.256"
          },
          {
            duration: "2.546",
            text: "For upper-intermediate to advanced learners",
            start: "134.722"
          },
          {
            duration: "2.856",
            text: "who often find Chinese synonyms confusing,",
            start: "137.268"
          },
          {
            duration: "2.152",
            text: "this dictionary can be very handy.",
            start: "140.124"
          },
          {
            duration: "2.735",
            text: "It provides explanations and examples",
            start: "142.276"
          },
          {
            duration: "2.889",
            text: "to help you distinguish between similar words.",
            start: "145.011"
          },
          {
            duration: "2.429",
            text: "If you're interested in trying out this app,",
            start: "147.9"
          },
          {
            duration: "2.688",
            text: "I've included a link in the description.",
            start: "150.329"
          },
          {
            duration: "1.734",
            text: "You can try it for free initially,",
            start: "153.017"
          },
          {
            duration: "1.524",
            text: "and if it suits your needs,",
            start: "154.751"
          },
          {
            duration: "2.424",
            text: "you can use my code \"Grace20\"",
            start: "156.275"
          },
          {
            duration: "3.176",
            text: "to get a 20% discount on your subscription.",
            start: "158.699"
          },
          {
            duration: "1.755",
            text: "W: At that time, I had a Chinese friend",
            start: "167.854"
          },
          {
            duration: "2.325",
            text: "who would chat with me in Chinese for an hour every day.",
            start: "169.609"
          },
          {
            duration: "2.133",
            text: "G: But when you were just starting out",
            start: "171.934"
          },
          {
            duration: "1.626",
            text: "and hadn't learned anything,",
            start: "174.067"
          },
          {
            duration: "1.546",
            text: "how did you chat with him?",
            start: "175.693"
          },
          {
            duration: "2.992",
            text: "W: It was simple conversations,",
            start: "177.239"
          },
          {
            duration: "3.095",
            text: "like asking, \"What did you have for breakfast today?\"",
            start: "180.231"
          },
          {
            duration: "2.955",
            text: "I found those words online",
            start: "183.326"
          },
          {
            duration: "3.334",
            text: "and added them to the Anki app to memorize.",
            start: "186.281"
          },
          {
            duration: "4.466",
            text: "When I had about 100 words or so,",
            start: "189.615"
          },
          {
            duration: "2.306",
            text: "I started chatting with him.",
            start: "194.081"
          },
          {
            duration: "2.421",
            text: "He would constantly teach me new expressions.",
            start: "196.387"
          },
          {
            duration: "3.962",
            text: "After I had built a solid foundation，",
            start: "198.808"
          },
          {
            duration: "3.544",
            text: "I could explore topics that interested me.",
            start: "202.77"
          },
          {
            duration: "3.046",
            text: "I developed some simple habits for myself,",
            start: "208.777"
          },
          {
            duration: "3.824",
            text: "like listening to podcasts when I go out alone.",
            start: "211.823"
          },
          {
            duration: "4.79",
            text: "And when I have free time at home or when I want to relax,",
            start: "221.494"
          },
          {
            duration: "2.249",
            text: "I watch Chinese TV dramas.",
            start: "226.284"
          },
          {
            duration: "2.682",
            text: "I also make sure to study with Anki every day,",
            start: "228.533"
          },
          {
            duration: "1.621",
            text: "adding at least five flashcards.",
            start: "231.215"
          },
          {
            duration: "0.843",
            text: "If I add five cards,",
            start: "232.836"
          },
          {
            duration: "3.342",
            text: "I need to review them for at least 20 minutes to half an hour each day.",
            start: "233.679"
          },
          {
            duration: "1.862",
            text: "However, I may spend more time",
            start: "237.021"
          },
          {
            duration: "2.865",
            text: "because my review process",
            start: "238.883"
          },
          {
            duration: "1.943",
            text: "is different from most people.",
            start: "241.748"
          },
          {
            duration: "1.575",
            text: "Most people might just look at a flashcard",
            start: "243.691"
          },
          {
            duration: "2.161",
            text: "and say, \"Oh, I know it,\" and move on.",
            start: "245.266"
          },
          {
            duration: "2.907",
            text: "But for me, I constantly create sentences",
            start: "247.427"
          },
          {
            duration: "1.941",
            text: "and speak them out loud.",
            start: "250.334"
          },
          {
            duration: "2.374",
            text: "I test if I can actually use those words",
            start: "252.275"
          },
          {
            duration: "1.719",
            text: "because many people may think",
            start: "254.649"
          },
          {
            duration: "1.761",
            text: "they have mastered the words they’re learning,",
            start: "256.368"
          },
          {
            duration: "2.428",
            text: "but when they have to speak,",
            start: "258.129"
          },
          {
            duration: "1.833",
            text: "they struggle to use them.",
            start: "260.557"
          },
          {
            duration: "2.599",
            text: "G: Your method aligns with what I mentioned",
            start: "262.39"
          },
          {
            duration: "3.26",
            text: "in a previous video about increasing vocabulary.",
            start: "264.989"
          },
          {
            duration: "2.632",
            text: "To remember new words,",
            start: "268.249"
          },
          {
            duration: "3.878",
            text: "it's important to not only memorize them",
            start: "270.881"
          },
          {
            duration: "4.796",
            text: "but also use them in sentences related to your life.",
            start: "274.759"
          },
          {
            duration: "4.094",
            text: "W: Yes, this part is crucial.",
            start: "279.555"
          },
          {
            duration: "0.916",
            text: "Why is that?",
            start: "283.649"
          },
          {
            duration: "2.781",
            text: "Because our memory itself",
            start: "284.565"
          },
          {
            duration: "2.018",
            text: "is related to things that",
            start: "287.346"
          },
          {
            duration: "3.468",
            text: "connect to our own lives",
            start: "289.364"
          },
          {
            duration: "3.014",
            text: "or have some emotional attachment.",
            start: "292.832"
          }
          
];

const transcript = {
    lines: transcriptLines,
};

const resolvers = {
    Query: {
        episodes: () => episodes,
        episodesByTitle: (parent, args, context, info) => {
            return episodes.filter((episode) => episode.title === args.title);
        },
        findEpisodeByFuzzyTitle: (parent, args, context, info) => {
            return episodes.filter((episode) => episode.title.includes(args.title));
        },
        episodeById: (parent, args, context, info) => {
            return episodes.find((episode) => episode.id === args.id);
        },
    },
    Episode: {
        podcast: (parent, args, context, info) => {
            return podcasts.find((podcast) => podcast.id === parent.podcast.id);
        },
    },
    Podcast: {
        episodes: (parent, args, context, info) => {
            return episodes.filter((episode) => episode.podcast.id === parent.id);
        },
    },
    Transcript: {
        lines: (parent, args, context, info) => {
            return transcriptLines;
        },
    },
    Mutation: {
        chatAboutEpisode: (parent, args, context, info) => {
            return {
                content: args.message,
                role: 'USER',
            };
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});


console.log(`🚀  Server ready at: ${url}`);