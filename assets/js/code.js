localStorage.setItem("vista", 'home')
localStorage.setItem("url_api", "https://pokeapi.co/api/v2/pokemon/")
let btn_vista = document.querySelectorAll('[data-img-api]')
btn_vista.forEach(boton => {
    let sprite_api = boton.dataset.imgApi
    let url_api = localStorage.getItem("url_api")
    boton.addEventListener('click', () => {
        carga_api(sprite_api, url_api)
    })
});

let id_buscador = document.querySelector("#buscar_pokemon")
id_buscador.addEventListener("click", () => {
    buscador()
})

async function consumoApi(url_api) {
    let response = await fetch(url_api);
    let jsonPokemon = await response.json()
    return jsonPokemon
}


function carga_api(spriteSelet = 'home', url_api = "https://pokeapi.co/api/v2/pokemon/") {
    document.querySelector(".loader").setAttribute("style", "display: block;")
    localStorage.setItem("url_api", url_api)
    localStorage.setItem("vista", spriteSelet)
    consumoApi(url_api).then(data => {
        let div_contenido = document.querySelector('#contenido')
        let data_results = data.results
        div_contenido.innerHTML = ''
        let btn_prev = (data.previous == null) ? "disabled" : ""
        let btn_next = (data.next == null) ? "disabled" : ""
        data_results.forEach(pokemon => {
            let url_info = pokemon.url;
            consumoApi(url_info).then(info => {
                let pokeimage = ''
                switch (spriteSelet) {
                    case "dream_world":
                        pokeimage = info.sprites.other.dream_world.front_default
                        break;
                    case "home":
                        pokeimage = info.sprites.other.home.front_default
                        break;
                    default:
                        pokeimage = info.sprites.front_default
                        break;
                }
                div_contenido.innerHTML += card_pokemon(pokeimage, info.name, info.id)
            })
        });
        setTimeout(() => {
            div_contenido.innerHTML += `
            <div class="col-12 my-5 d-flex justify-content-center align-items-center">
                <div class="btn-group mb-3" role="group">
                    <button type="button" class="btn btn-dark ${btn_prev}" data-pagina="${data.previous}">Anterior</button>
                    <button type="button" class="btn btn-dark ${btn_next}" data-pagina="${data.next}">Siguiente</button>
                </div>
            </div>
                `

            let botonesPaginacion = document.querySelectorAll("[data-pagina]")
            botonesPaginacion.forEach(boton => {
                let url_api_btn = boton.dataset.pagina
                let vista = localStorage.getItem("vista")
                boton.addEventListener("click", () => {
                    carga_api(vista, url_api_btn)

                })
            });
            eventoClickModal()
            document.querySelector(".loader").setAttribute("style", "display: none;")
        }, 1500);

    })


}

carga_api()


function dashboard() {
    let ul_region = document.querySelector('#region-ul')
    let url_regions = 'https://pokeapi.co/api/v2/region/'

    consumoApi(url_regions).then(dataregion => {
        let data_results = dataregion.results
        data_results.forEach((region, indice) => {
            ul_region.innerHTML += `
                <li><a class="nav-link" href="#" data-region="${parseInt(indice) + 1}">${region.name}</a></li>
            `
        });
    })

    setTimeout(() => {
        let aFiltroRegion = document.querySelectorAll('[data-region]')
        aFiltroRegion.forEach(aRegion => {
            let idRegion = aRegion.dataset.region
            aRegion.addEventListener('click', () => {
                filtro(idRegion)
            })
        });
    }, 1000);
}

dashboard()

function filtro(idRegion) {
    document.querySelector(".loader").setAttribute("style", "display: block;")
    let div_contenido = document.querySelector('#contenido')
    let generacion_url = `https://pokeapi.co/api/v2/generation/${idRegion}`

    consumoApi(generacion_url).then(datageneracion => {
        let data_pokemon = datageneracion.pokemon_species
        div_contenido.innerHTML = ''
        data_pokemon.forEach(pokemon => {
            let pokemon_url_generacion = `${pokemon.url}`
            let id_pokemon = pokemon_url_generacion.slice(42)
            let pokemon_url = `https://pokeapi.co/api/v2/pokemon/${id_pokemon}`
            consumoApi(pokemon_url).then(datapokemon => {
                let vista = localStorage.getItem("vista")
                let img_pokemon = ''
                switch (vista) {
                    case 'dream_world':
                        if (datapokemon.sprites.other.dream_world.front_default != null) {
                            img_pokemon = datapokemon.sprites.other.dream_world.front_default
                        } else {
                            img_pokemon = datapokemon.sprites.other['official-artwork'].front_default
                        }
                        break;
                    case 'home':
                        img_pokemon = datapokemon.sprites.other.home.front_default
                        break;
                    default:
                        img_pokemon = datapokemon.sprites.front_default
                        break;
                }
                div_contenido.innerHTML += card_pokemon(img_pokemon, datapokemon.name, datapokemon.id)
            })
        });
    })

    setTimeout(() => {
        eventoClickModal()
        document.querySelector(".loader").setAttribute("style", "display: none;")
    }, 1500);

}

function buscador() {
    document.querySelector(".loader").setAttribute("style", "display: block;")
    let div_contenido = document.querySelector('#contenido')
    let buscador = document.querySelector('#buscador_pokemon').value
    if (buscador == '') {
        carga_api()
        return
    } else {
        let url_api = "https://pokeapi.co/api/v2/pokemon/" + buscador;
        div_contenido.innerHTML = ''
        consumoApi(url_api).then(info => {
            let info_pokemon = info
            div_contenido.innerHTML += card_pokemon(info_pokemon.sprites.other.home.front_default, info_pokemon.name, info_pokemon.id)
        })
        setTimeout(() => {
            eventoClickModal()
            document.querySelector(".loader").setAttribute("style", "display: none;")
        }, 1500);
    }
}


function card_pokemon(image, name, idPokemon) {
    let htmlCard = `
    <div class="col-3 d-flex justify-content-center align-items-centers">
        <div class="card pokecard">
            <div class="d-flex justify-content-center align-items-centers">
                <img src="${image}" class="card-img-top " alt="...">
            </div>
            <div class="card-body">
            <h5 class="card-title text-uppercase fontpoke text-center">${name}</h5>
            <p>  </p>
            </div>
             
            <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#datailPokemon" data-id-pokemon="${idPokemon}"> 
                Detalles
            </button>
        </div>
    </div>
    `
    return htmlCard
}

function eventoClickModal() {
    let btn_modal = document.querySelectorAll('[data-id-pokemon]')
        // console.log(btn_modal)
    btn_modal.forEach(boton => {
        let idPokemon = boton.dataset.idPokemon
        boton.addEventListener("click", function() {
            modal_pokemon(idPokemon)
        })
    })
}

function modal_pokemon(idPokemon) {
    console.log(idPokemon)
    let url_api = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    consumoApi(url_api).then(pokemon => {
        // console.log(pokemon)
        let modalContent = document.querySelector("#contenidoModal")
        let barrasHtml = ''
        let tipo = ''
        let colorBarras = [
            "success",
            "danger",
            "primary",
            "dark",
            "info",
            "warning"
        ]
        pokemon.stats.forEach((estadistica, indice) => {
            estadistica.stat.name = traduccion_estadistica(estadistica.stat.name)
            barrasHtml += `
                ${estadistica.stat.name}
                <div class="progress mb-3">
                    <div class="progress-bar bg-${colorBarras[indice]}" role="progressbar" style="width:${estadistica.base_stat}%">${estadistica.base_stat}</div>
                </div>`
        });

        pokemon.types.forEach(tipos => {
            tipo += `
                <button type="button" class="btn btn-primary">${tipos.type.name}</button>
            `
        });
        let imagen_pokemon_modal = ''
        if (pokemon.sprites.other.dream_world.front_default == null) {
            imagen_pokemon_modal = pokemon.sprites.other['official-artwork'].front_default
        } else {
            imagen_pokemon_modal = pokemon.sprites.other.dream_world.front_default
        }

        modalContent.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title" id="datailPokemonTitle">${pokemon.name}</h1>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row modalstats">
                    <div class="col-6 d-flex justify-content-center align-items-center flex-column">
                        <img src="${imagen_pokemon_modal}">
                        <div>
                            ${tipo}
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card-body">
                            <h4>Estadisticas</h4>
                            ${barrasHtml}
                            <button class="btn btn-dark" onclick="descarga(${pokemon.id})"> Descargar Ficha </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `
    })
}

// consumoApi().then(pokemon => {
//     console.log(pokemon.results)
// })

function traduccion_estadistica(estadistica) {
    switch (estadistica) {
        case 'hp':
            estadistica = "Puntos de salud"
            break;
        case 'attack':
            estadistica = "Ataque"
            break;
        case 'defense':
            estadistica = "Defensa"
            break;
        case 'special-attack':
            estadistica = "Ataque especial"
            break;
        case 'special-defense':
            estadistica = "Defensa especial"
            break;
        case 'speed':
            estadistica = "Velocidad"
            break;
    }
    return estadistica
}

function descarga(idPokemon) {
    let url_api = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    consumoApi(url_api).then(pokemon => {
        let dataPokemonExcel1 = [
            ["Numero Pokedex", "Nombre", "Peso", "Altura"],
            [pokemon.id, pokemon.name, pokemon.weight, pokemon.height]
        ]

        let dataPokemonExcel2 = []
        pokemon.stats.forEach(data => {
            data.stat.name = traduccion_estadistica(data.stat.name)
            let estadisticaData = [data.stat.name, data.base_stat]
            dataPokemonExcel2.push(estadisticaData)
        });
        console.log(dataPokemonExcel2)

        var sheetLoad = XLSX.utils.book_new();
        sheetLoad.Props = {
            Title: "Data pokemon filter",
            Subject: "Pokeapi",
            Author: "Alejandro Diaz",
            CreatedDate: new Date(2017, 12, 19)
        };
        sheetLoad.SheetNames.push("Datos basicos")
        var ws = XLSX.utils.aoa_to_sheet(dataPokemonExcel1)
        sheetLoad.Sheets["Datos basicos"] = ws
        sheetLoad.SheetNames.push("Estadisticas")
        var ws = XLSX.utils.aoa_to_sheet(dataPokemonExcel2)
        sheetLoad.Sheets["Estadisticas"] = ws

        var excelBook = XLSX.write(sheetLoad, { bookType: 'xlsx', type: 'binary' })
        saveAs(new Blob([s2ab(excelBook)], { type: "application/octet-stream" }), `${pokemon.name}.xlsx`)
    })
}

//funcion que convierte a octetos los datos binarios para que excel pueda interpretarlos
function s2ab(s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
    return buf
}