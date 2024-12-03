import BaseCommand from '../../libs/BaseCommand.js';

export default class Command extends BaseCommand {
    constructor(client, handler) {
        super(client, handler, {
            command: 'help',
            aliases: ['menu', 'h'],
            category: 'core',
            description: {
                content: 'Displays the menu',
                usage: '[command]'
            },
            dm: true,
            exp: 1
        });
    }

    exec = async (M, parsedArgs) => {
        if (!parsedArgs.text) {
            const commands = this.handler.commands.keys();
            const categories = {};

            for (const command of commands) {
                const info = this.handler.commands.get(command);
                if (!command) continue;
                if (!info?.config?.category || info.config.category === 'dev') continue;

                if (categories[info.config.category]) {
                    categories[info.config.category].push(info.config.command);
                } else {
                    categories[info.config.category] = [info.config.command];
                }
            }

            let text = `🌟 *Welcome, ${M.sender.username}!*\n🤖 *Bot Name:* ${this.client.util.capitalize(this.client.config.name)}\n\n💡 *Prefix:* _${this.client.config.prefix}_\n\n📜 *Available Commands by Category:*\n\n`;
            const keys = Object.keys(categories);

            for (const key of keys) {
                text += `${this.emojis[keys.indexOf(key)]} *${key.toUpperCase()}*\n`;
                text += `    ➤ ${categories[key].join(', ')}\n\n`;
            }

            return void (await M.reply(
                `${text}📌 *Notes:*\n➤ Use \`${this.client.config.prefix}help <command>\` for detailed info.\n➤ Example: \`${this.client.config.prefix}help profile\`\n➤ _<> indicates required arguments, and [] indicates optional ones. Do not include <> or [] when using commands._`
            ));
        }

        const key = parsedArgs.text.toLowerCase();
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key);
        if (!command) return void (await M.reply(`❌ Command or Alias not found: *"${key}"*`));

        const cmdStatus = (await this.client.DB.command.get(command.config?.command)) ?? {
            isDisabled: false,
            reason: ''
        };

        return void (await M.reply(
            `🏷 *Command:* ${command.config.command}\n` +
            `⭐️ *Category:* ${command.config.category}\n` +
            `🎗 *Aliases:* ${command.config.aliases ? command.config.aliases.join(', ') : 'None'}\n` +
            `🔰 *Private Chat:* ${command.config.dm ? 'Yes' : 'No'}\n` +
            `👑 *Admin Only:* ${command.config.adminOnly ? 'Yes' : 'No'}\n` +
            `🎈 *Status:* ${cmdStatus.isDisabled ? 'Disabled' : 'Enabled'} - ${cmdStatus.reason}\n` +
            `❗️ *Usage:* ${this.client.config.prefix}${command.config.command} ${command.config.description.usage ?? ''}\n` +
            `📑 *Description:* ${command.config.description?.content}`
        ));
    };

    replaceWithCustomAlphabet = (sentence) => {
        const customAlphabetMap = {
            a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ',
            i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ',
            q: 'φ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x',
            y: 'ʏ', z: 'ᴢ'
        };
        return sentence
            .split(' ')
            .map((word) =>
                word
                    .split('')
                    .map((letter) => customAlphabetMap[letter.toLowerCase()] || letter)
                    .join('')
            )
            .join(' ');
    };

    emojis = ['🌀', '🎴', '🔮', '👑', '🎈', '⚙️', '🍀', '💈', '🔰'];
}
