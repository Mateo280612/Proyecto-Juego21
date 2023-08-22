class JuegoDel21 {
    obtenerCartaAleatoria() {
        this.cartas = [
            '2 de corazon rojo', '3 de corazon rojo', '4 de corazon rojo', '5 de corazon rojo', '6 de corazon rojo', '7 de corazon rojo',
            '8 de corazon rojo', '9 de corazon rojo', '10 de corazon rojo', 'J de corazon rojo', 'Q de corazon rojo', 'K de corazon rojo', 'A de corazon rojo',
            '2 de diamante rojo', '3 de diamante rojo', '4 de diamante rojo', '5 de diamante rojo', '6 de diamante rojo', '7 de diamante rojo',
            '8 de diamante rojo', '9 de diamante rojo', '10 de diamante rojo', 'J de diamante rojo', 'Q de diamante rojo', 'K de diamante rojo', 'A de diamante rojo',
            '2 de pica negra', '3 de pica negra', '4 de pica negra', '5 de pica negra', '6 de pica negra', '7 de pica negra',
            '8 de pica negra', '9 de pica negra', '10 de pica negra', 'J de pica negra', 'Q de pica negra', 'K de pica negra', 'A de pica negra',
            '2 de trebol negro', '3 de trebol negro', '4 de trebol negro', '5 de trebol negro', '6 de trebol negro', '7 de trebol negro',
            '8 de trebol negro', '9 de trebol negro', '10 de trebol negro', 'J de trebol negro', 'Q de trebol negro', 'K de trebol negro', 'A de trebol negro'
        ]
        const indiceAleatorio = Math.floor(Math.random() * this.cartas.length)
        return this.cartas[indiceAleatorio]
    }
    
    calcularSuma(mano) {
    let suma = 0
    
    for (let i = 0; i < mano.length; i++) {
        const carta = mano[i]
        const partes = carta.split(' ')
        const valor = partes[0]
        
        if (valor === 'A') {
            suma += 1
        } else if (valor === 'K' || valor === 'Q' || valor === 'J') {
            suma += 10
        } else {
            suma += parseInt(valor)
        }
    }
    
    return suma
    }
    
    mostrarCartas(mano) {
        let cartasMostradas = ''
        for (let i = 0; i < mano.length; i++) {
            if (i > 0) {
                cartasMostradas += ', '
            }
            cartasMostradas += mano[i]
        }
        return cartasMostradas
    }
    
    iniciar() {
        this.jugador = []
        this.maquina = []
        this.jugador.push(this.obtenerCartaAleatoria(), this.obtenerCartaAleatoria())
        this.maquina.push(this.obtenerCartaAleatoria(), this.obtenerCartaAleatoria())
      
        this.actualizarSumas();
        document.getElementById('result').textContent = ''
        document.getElementById('playerCards').textContent = ''
        document.getElementById('machineCards').textContent = ''
    }
    
    jugar() {
        if (this.calcularSuma(this.jugador) > 21) {
            document.getElementById('result').textContent = 'Perdiste. ¡Te pasaste de 21!'
            return;
        }
        
        while (this.calcularSuma(this.maquina) < 17) {
            this.maquina.push(this.obtenerCartaAleatoria())
        }
        
        this.mostrarCartas(this.maquina, 'machineCards')
        this.actualizarSumas();
        
        const sumaJugador = this.calcularSuma(this.jugador)
        const sumaMaquina = this.calcularSuma(this.maquina)
        
        if (sumaMaquina > 21 || sumaJugador > sumaMaquina) {
            document.getElementById('result').textContent = '¡Ganaste!'
            document.getElementById('playerCards').textContent = 'Cartas del Jugador: ' + this.mostrarCartas(this.jugador)
            document.getElementById('machineCards').textContent = 'Cartas de la Maquina: ' + this.mostrarCartas(this.maquina)
        } else if (sumaJugador === sumaMaquina) {
            document.getElementById('result').textContent = 'Empate'
            document.getElementById('playerCards').textContent = 'Cartas del Jugador: ' + this.mostrarCartas(this.jugador)
            document.getElementById('machineCards').textContent = 'Cartas de la Maquina: ' + this.mostrarCartas(this.maquina)
        } else {
            document.getElementById('result').textContent = 'Perdiste. La Maquina gano.'
            document.getElementById('playerCards').textContent = 'Cartas del Jugador: ' + this.mostrarCartas(this.jugador)
            document.getElementById('machineCards').textContent = 'Cartas de la Maquina: ' + this.mostrarCartas(this.maquina)
        }
    }
    
    agregarCartaJugador() {
        this.jugador.push(this.obtenerCartaAleatoria())
        this.actualizarSumas()
        const sumaJugador = this.calcularSuma(this.jugador)
        if (sumaJugador > 21) {
        document.getElementById('result').textContent = 'Perdiste. ¡Te pasaste de 21!'
        document.getElementById('playerCards').textContent = this.mostrarCartas(this.jugador, 'playerCards')
        document.getElementById('machineCards').textContent = this.mostrarCartas(this.maquina, 'machineCards')
        return
        }   
    }
    
    jugarMaquina() {
        while (this.calcularSuma(this.maquina) < 17) {
            this.maquina.push(this.obtenerCartaAleatoria())
        }
        this.actualizarSumas()
        this.jugar()
    }
    
    actualizarSumas() {
        const sumaJugador = this.calcularSuma(this.jugador)
        const sumaMaquina = this.calcularSuma(this.maquina)
        document.getElementById('playerSum').textContent = sumaJugador
        document.getElementById('machineSum').textContent = sumaMaquina
    }  
}

const juego = new JuegoDel21();