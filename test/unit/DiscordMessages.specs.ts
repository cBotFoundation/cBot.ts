import { DefaultTheme } from "../../src/core/messages/api/cTheme";
import DiscordMessageFactory from "../../src/core/messages/factory/DiscordMessageFactory"
import { cMessage } from "../../src/core/messages/messages.module";
import cActionContext from "../../src/core/messages/api/cActionContext";
import { expect } from "chai";

describe('DiscordMessageFactory', function() {
    describe('#createMessage()', function() {
        it('Should create discord embed with an action row', function() {
            const messageFactory = new DiscordMessageFactory();
            const message: cMessage = {
                theme: DefaultTheme,
                content: "Test Message",
                actions: [{
                    name: 'Test_Button',
                    text: 'Test Button',
                    color: 'Primary',
                    onlyOwnerInteraction: false,
                    actionCall: (payload: cActionContext) => {console.log('Test button pressed')}
                }]
            }
            const result = messageFactory.createMessage(message)

            expect(result).to.have.property('embeds')
            expect(result).to.have.property('components')
            expect(result.components).to.be.a('array')
            expect(result.components).to.have.lengthOf(1)
        })
        it('Should create an empty action row if no actions provided', function() {
            const messageFactory = new DiscordMessageFactory();
            const message: cMessage = {
                theme: DefaultTheme,
                content: "Test Message",
                actions: [] //todo: Should be optional to pass in
            }
            const result = messageFactory.createMessage(message)
            expect(result).to.have.property('components')
            expect(result.components).to.be.a('array')
            expect(result.components).to.have.lengthOf(0)
        })
    })
})