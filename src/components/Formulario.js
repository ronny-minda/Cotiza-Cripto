import React, { useEffect, useState }from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hook/useModeda';
import Error from './Error';

import useCriptomonedas from '../hook/useCriptomonedas';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [ listadocripto, guardarCritomonedas ] = useState([]);
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXM', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ]

    const [moneda, SelectMonedas, actualizarState ] = useMoneda('Elige tu moneda', '', MONEDAS);

    const [criptomoneda, SelectCripto ] = useCriptomonedas('Eligue tu Criptomoneda', '', listadocripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

            const resultado = await axios.get(url);

            guardarCritomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, [])

    const cotizarMoneda = e => {
        e.preventDefault();

        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
        

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            { error ? <Error mensaje='Todos los campos son obligatorios' />: null} 

            <SelectMonedas />

            <SelectCripto /> 

            <Boton
                type='submit'
                value='Calcular'
            />
        </form>
     );
}
 
export default Formulario;