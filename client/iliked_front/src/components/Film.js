import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect } from "react";
import {useParams, routeParams} from 'react-router-dom'
import { Tooltip } from '@mui/material';
import Popup from 'reactjs-popup';


import 'reactjs-popup/dist/index.css';
import axios from "axios";


import "./styles/film_styles.css"
import imdb from "../assets/imdb_logo.png"
import yt from "../assets/yt.png"
import like from "../assets/heart.ico"

// const endpointPelicula = 'http://localhost:3000/films/search/';

const Film = () => {
    const [film, setFilm] = useState(null);
    const routeParams = useParams()

    useEffect(() => {
        const getFilm = async () => {
            console.log(routeParams)

            const resp = await fetch(`http://localhost:3000/films/search/${routeParams.title}`);
            const data = await resp.json();

            setFilm(data)
        }
        getFilm()
        
    }, [])


    return (
        <>
        {film == null? (" "): (
            <>
                <div className="marcoFilm" key={film._id}>
                        <img className='imgfilm' src={film.url_img} alt={film.title}></img>
                        <div className="marcoInfo">
                            <h2 className="titulo">{film.title.toUpperCase()}</h2>
                            <p className='line1'>({film.o_title}) Dirección: {film.director}, {film.year}</p>
                            <p className='line2'>Con: {film.cast.join(",  ")}</p>
                            <Tooltip title="Ficha en IMDB" arrow>
                                <a href={film.url_imdb} target="_blank" rel="noopener noreferrer">
                                    <img className="imdb" src={imdb} alt="IMDB Logo"></img>
                                </a>
                            </Tooltip>
                            <Popup trigger={<img className="yt" src={yt} alt="YouTube Logo"></img>} position="left center">
                                <div className='popupVideo'>
                                    <ReactPlayer
                                    url={film.url_video}
                                    className='react-player'
                                    playing
                                    width="640px"
                                    height='360px'
                                    controls
                                    />
                                </div>
                            </Popup>
                            <div className='marcoComentario'>
                                <p className='tituloComentario'>{film.comments[0].comentary_t}</p>
                                <p className='autorLikes'>Autor:  {film.comments[0].username} <i id='bar' className="fa-solid fa-heart-circle-plus"> {film.comments[0].likes}</i></p>
                                <p className='Comentario'>{film.comments[0].comentary}</p>
                                
                            </div>
                        </div>
                </div>
                
            </>
        )};</>
    );

};

export default Film;
