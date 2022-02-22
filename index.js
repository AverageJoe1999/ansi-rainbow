const { Plugin } = require("powercord/entities");

module.exports = class AnsiRainbow extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'rainbow',
            description: 'Sends the text as rainbow with ansi codeblock.',
            usage: '{c} [...arguments]',
            executor: async(args) => {
                return {
                    send: true  ,
                    result: ['```ansi', generateRainbow(args.join(" ")), '```'].join("\n")
                }
            }
        })
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('rainbow')
    }
}

// Taken from other project code.
const generateRainbow = (content) => {
    if (typeof content != 'string') {
        content = "type not a string"
    }
    let letters = content.split("")
    const colors = [
        '[0;37m[1;31m',      // RED
        '[0;37m[1;33m',      // YELLOW
        '[0;37m[1;32m',      // GREEN
        '[0;37m[1;36m',      // CYAN
        '[0;37m[1;34m',      // BLUE
        '[0;37m[1;35m',      // MAGENTA or PURPLE
    ]

    return letters.map((l, i) => {
        const color = colors[i % colors.length]
        return `${color}${l}`
    }).join("")
}