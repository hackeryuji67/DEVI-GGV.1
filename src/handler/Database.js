import { QuickDB } from 'quick.db'
import { MongoDriver } from 'quickmongo'
export default class DatabaseHandler {
    constructor(config, log) {
        this.config = config
        this.log = log
    }

    connect = () => {
        const url = process.env.MONGODB_URL
        if (!url) {
            this.client.log.error('MONGODB_URL is missing, please fill the value!')
            process.exit(1)
        }
        this.driver = new MongoDriver(url)
        this.driver
            .connect()
            .then(() => {
                this.client.log.info('Database connection opened!')
                this.client.log.info('Database connected!')
            })
            .catch((err) => {
                this.client.log.error(e)
                process.exit(1)
            })
    }

    saveContacts = async (contacts) => {
        await Promise.all(
            contacts.map(async (contact) => {
                if (contact.id) {
                    await this.DB.set(contact.id, {
                        notify: contact.notify,
                        status: contact.status,
                        imgUrl: contact.imgUrl,
                        name: contact.name,
                        verifiedName: contact.verifiedName
                    })
                }
            })
        )
    }

    getContact = async (jid) => {
        const isMod = this.config.mods.includes(jid)
        const { notify, verifiedName, name, ban = false } = await this.DB.get(jid)
        return {
            username: notify || verifiedName || name || 'User',
            jid,
            isMod,
            ban
        }
    }

    database = new QuickDB({
        driver: this.driver
    })
}
