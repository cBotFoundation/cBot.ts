import { expect } from "chai"
import { YesOrNoAction } from "../../src/core/messages/api/cAction"
import cActionContext from "../../src/core/messages/api/cActionContext"

describe('cAction', function() {
    describe('#YesOrNoAction', function() {
        it('Should have 2 elements', function(){
            const irrelevantAction = (payload: cActionContext) => console.log(payload)
            const yesOrNo = YesOrNoAction(irrelevantAction, irrelevantAction)
            
            expect(yesOrNo).to.be.an('array')
            expect(yesOrNo).to.have.lengthOf(2)

            const yes = yesOrNo[0]
            const no = yesOrNo[1]

            expect(yes.name, 'yes.name').eq('yes')
            expect(no.name, 'no.name').eq('no')
        })
    })
})