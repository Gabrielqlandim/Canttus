import { useState, useEffect } from 'react';

export function useTypewriter(texto: string, velocidadeMs: number = 40) {
    const [textoExibido, setTextoExibido] = useState('');

    useEffect(() => {
        setTextoExibido('');
        let indice = 0;

        const intervalo = setInterval(() => {
            indice++;
            setTextoExibido(texto.slice(0, indice));
            if (indice >= texto.length) {
                clearInterval(intervalo);
            }
        }, velocidadeMs);

        return () => clearInterval(intervalo);
    }, [texto, velocidadeMs]);

    return textoExibido;
}
