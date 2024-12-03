export const ranks = {
    Peasant: {
        exp: 0,
        emoji: '🪓'
    },
    Squire: {
        exp: 1000,
        emoji: '🛡️'
    },
    Knight: {
        exp: 5000,
        emoji: '⚔️'
    },
    Baron: {
        exp: 10000,
        emoji: '🏰'
    },
    Viscount: {
        exp: 20000,
        emoji: '🎖️'
    },
    Count: {
        exp: 50000,
        emoji: '👑'
    },
    Duke: {
        exp: 100000,
        emoji: '⚜️'
    },
    'Grand Duke': {
        exp: 150000,
        emoji: '⚜️'
    },
    Archduke: {
        exp: 200000,
        emoji: '🛡️'
    },
    Prince: {
        exp: 350000,
        emoji: '👑'
    },
    King: {
        exp: 500000,
        emoji: '👑'
    },
    Emperor: {
        exp: 1000000,
        emoji: '👑'
    },
    Overlord: {
        exp: 2000000,
        emoji: '🔥'
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
        ['Peasant', ranks['Peasant']]
    );
    return { name, data: rank };
};
