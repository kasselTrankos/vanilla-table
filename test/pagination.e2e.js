import { Selector, ClientFunction } from 'testcafe';

fixture `Load localhost at port 9001`
    .page `http://localhost:9001`;

const _a = Selector('#pagination ul li:nth-child(3) a');
test('When clicke in 3 link goto 3 page and change url path with pathname === /3', async t => {
   	await t
        .click(_a)
        .wait(1200);
   	let location = await t.eval(() => window.location);
	await t.expect(location.pathname).eql('/3');
});
