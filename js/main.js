window.addEventListener('load', () => {
    console.log('evento: load')

    const btEstado = document.getElementById('btEstado')
    const Status = document.getElementById('cpStatus')
    const spLatitude = document.getElementById('spLatitude')
    const spLongitude = document.getElementById('spLongitude')
    const estado = document.getElementById('cpEstado')
    const cidade = document.getElementById('cpCidade')


    btEstado.addEventListener('click', () => {
        console.log('botão foi pressionado')
        encontreEstado()
    })


    function encontreEstado() {
        console.log('encontre estado')
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                console.log(posicao)
            },
            (erro) => {
                console.log(erro)
            }
        )
    }

})


