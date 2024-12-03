export const ranks = {
    Squire: {
        exp: 0,
        emoji: '🔨'
    },
    Knight: {
        exp: 1000,
        emoji: '🛡️'
    },
    Baron: {
        exp: 5000,
        emoji: '⚔️'
    },
    Viscount: {
        exp: 10000,
        emoji: '🏰'
    },
    Count: {
        exp: 20000,
        emoji: '⚜️'
    },
    Duke: {
        exp: 50000,
        emoji: '👑'
    },
    Marquis: {
        exp: 100000,
        emoji: '🔮'
    },
    Grand Duke: {
        exp: 135000,
        emoji: '🎩'
    },
    Prince: {
        exp: 175000,
        emoji: '👑'
    },
    King: {
        exp: 200000,
        emoji: '👑'
    },
    Emperor: {
        exp: 350000,
        emoji: '🌟'
    },
    Immortal King: {
        exp: 425000,
        emoji: '💀'
    },
    Celestial Monarch: {
        exp: 500000,
        emoji: '💫'
    },
    Godlike Emperor: {
        exp: 650000,
        emoji: '🔥'
    },
    Divine Overlord: {
        exp: 850000,
        emoji: '⚡'
    },
    Immortal God: {
        exp: 1000000,
        emoji: '🌌'
    },
    Celestial Deity: {
        exp: 2000000,
        emoji: '✨'
    }
};

export const getRank = (exp) => {
    const lranks = Object.entries(ranks);
    const [name, rank] = lranks.reduce(
        ([currentName, currentRank], [key, value]) => {
            if (exp >= value.exp) {
                return [key, value];
            }
            return [currentName, currentRank];
        },
        ['Squire', ranks['Squire']]
    );
    return { name, data: rank };
};
