import getLinks from '../files.js'

describe('Testando a função getLinks()', () => {

    it('Deve ser uma função', () => {
        expect(typeof getLinks).toBe('function')
    })

    it('Deve retornar um arreio de links de um arquivo markdown passado como parâmetro', async () => {
        expect(await getLinks('./src/tests/assets/file01.md')).toStrictEqual(
            [
                { 'markdownum mihi cunctosque': "http://www.uterqueter.com/" },
                { 'Abarin memorant': "http://illosepulchro.net/" },
                { Celerique: 'http://mea-silvis.org/devestem' }
            ]
        )
    })

    it('Deve retornar um arreio de links de um conjunto de arquivos markdown presentes em um diretório passado como parâmetro', async () => {
        expect(await getLinks('./src/tests/assets/')).toStrictEqual(
            [
                [
                    { 'markdownum mihi cunctosque': 'http://www.uterqueter.com/' },
                    { 'Abarin memorant': 'http://illosepulchro.net/' },
                    { Celerique: 'http://mea-silvis.org/devestem' }
                ],
                [
                    { 'iaculatur formasque' : 'http://www.similisiris.io/'},
                    { 'ora' : 'http://umeris.org/iphisramis.html'}
                ],
                "No one link identified"
            ]
        )
    })

    it('Deve retornar "No one link identified" quando um arquivo markdown sem links é passado como parâmetro', async () => {
        expect(await getLinks('./src/tests/assets/fileWithoutContent.md')).toEqual('No one link identified')
    })


})
