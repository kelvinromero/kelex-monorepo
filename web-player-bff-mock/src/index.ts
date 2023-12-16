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
        mediaUrl: 'https://example.com/episode1.mp3',
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
        mediaUrl: 'https://example.com/episode2.mp3',
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
        text: 'This is the first line of the transcript',
        start: '00:00:00',
        duration: '00:00:05',
    },
    {
        text: 'This is the second line of the transcript',
        start: '00:00:05',
        duration: '00:00:05',
    },
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