import BaseCommand from '../../libs/BaseCommand.js';

export default class Command extends BaseCommand {
    constructor(client, handler) {
        super(client, handler, {
            command: 'info',
            aliases: ['i'],
            category: 'core',
            description: {
                content: "Displays the bot's info"
            },
            dm: true,
            exp: 1
        });
    }

    exec = async (M) => {
        const totalUsers = (await this.client.DB.getAllUsers()).length;
        const totalGroups = Object.keys(await this.client.groupFetchAllParticipating()).length;
        const totalMods = this.client.config.mods.length;
        const totalCommands = this.handler.commands.size;
        const bot = this.client.config.name;
        
        return void (await M.reply(`
        * ${bot} * 

        ═════════════════════════════════════

        #️⃣ *Users:* ${totalUsers}
        🎗 *Groups:* ${totalGroups}
        ⚜️ *Moderators:* ${totalMods}
        🎈 *Commands Available:* ${totalCommands}

        ═════════════════════════════════════

        ⚡ *Bot Status:*
        💻 *Uptime:* ${this.formatUptime(process.uptime())}
        🕒 *Current Time:* ${new Date().toLocaleString()}

        ═════════════════════════════════════
        `));
    };

    formatUptime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours}h ${minutes}m ${secs}s`;
    };
}
