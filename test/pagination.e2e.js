import { Selector, ClientFunction } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:9001`;

const _a = Selector('#pagination ul li:nth-child(3) a');
test('When clicke in 3 link goto 3 page and change ur path', async t => {
   	await t
        .click(_a)
        .wait(200);
   	let location = await t.eval(() => window.location);
	await t.expect(location.pathname).eql('/3');
});