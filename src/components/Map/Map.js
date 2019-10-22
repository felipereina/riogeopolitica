import React from 'react';
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components'
import RioData from "./RioData";
import Title from '../Title'
import { DiscussionEmbed } from "disqus-react"

const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: "map", title: "map" },
  }

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`

class Map extends React.Component {

    constructor() {
        super()
        this.rioData = new RioData()
        this.state = {
            favelas: [],
            filter: "All"
        }

    }

    componentDidMount() {

        this.layer = Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {

        })

        this.map = Leaflet.map('map', {
            center: [-22.9035, -43.2096],
            zoom: 11,
            zoomControl: true,
        }).addLayer(this.layer)

        this.onEachFeature = (feature, layer) => {
            layer.bindPopup(feature.properties.Nome);
        }

        this.favelas = []

        this.rioData.get().then(result => {
            this.geojsonFeature = result

            const data = this.props.data
            result.forEach(element => {

                for (let i = 0; i < data.length; i++) {

                    if (element.properties.Código == data[i].node.C_digo) {
                        element.properties.faccao = data[i].node.Faccao
                        element.properties.complexo = data[i].node.Complexo
                        element.properties.expressivit = data[i].node.Pouco_Expressivo
                        this.favelas.push(element)
                    }
                }

            });

            this.setState({ favelas: this.favelas })
            this.renderMap()

        })

    }

    renderMap = () => {
        let filtered = this.state.favelas
        console.log(filtered)

        const popup = (feature) => {
            return "<b>" + feature.properties.Nome + "</b><br/>" + "Complexo: "
                + feature.properties.complexo + "<br/>"
                + "Domínio: " + feature.properties.faccao
        }

        this.allShapes = Leaflet.geoJSON(filtered, {
            onEachFeature: (feature, layer) => {
                layer.on('mouseover', function () {
                    this.bindPopup(popup(feature)).openPopup();
                });
                layer.on('mouseout', function () {
                    this.closePopup();
                });
            },
            style: (feature) => {
                switch (feature.properties.faccao) {
                    case 'CV': return { color: "#d11c08", "weight": 3, "opacity": 0.7 };
                        break
                    case 'TCP': return { color: "#a6f514", "weight": 3, "opacity": 0.7 };
                        break
                    case 'ADA': return { color: "#f0cc16", "weight": 3, "opacity": 0.7 };
                        break
                    case 'Milicia': return { color: "#1665f0", "weight": 3, "opacity": 0.7 };
                        break
                    default:
                        return { color: "#bdc2b2", "weight": 3, "opacity": 0.7 };

                }
            }
        })

        this.comandoVermelho = Leaflet.geoJson(filtered, {
            onEachFeature: (feature, layer) => {
                layer.on('mouseover', function () {
                    this.bindPopup(popup(feature)).openPopup();
                });
                layer.on('mouseout', function () {
                    this.closePopup();
                });
            },
            filter: function (feature, layer) {
                return feature.properties.faccao === "CV";
            },
            style: { color: "#d11c08", "weight": 3, "opacity": 0.7 }
        });

        this.terceiroComando = Leaflet.geoJson(filtered, {
            onEachFeature: (feature, layer) => {
                layer.on('mouseover', function () {
                    this.bindPopup(popup(feature)).openPopup();
                });
                layer.on('mouseout', function () {
                    this.closePopup();
                });
            },
            filter: function (feature, layer) {
                return feature.properties.faccao === "TCP";
            },
            style: { color: "#a6f514", "weight": 3, "opacity": 0.7 }

        });

        this.ADA = Leaflet.geoJson(filtered, {
            onEachFeature: (feature, layer) => {
                layer.on('mouseover', function () {
                    this.bindPopup(popup(feature)).openPopup();
                });
                layer.on('mouseout', function () {
                    this.closePopup();
                });
            },
            filter: function (feature, layer) {
                return feature.properties.faccao === "ADA";
            },
            style: { color: "#f0cc16", "weight": 3, "opacity": 0.7 }
        });

        this.milicias = Leaflet.geoJson(filtered, {
            onEachFeature: (feature, layer) => {
                layer.on('mouseover', function () {
                    this.bindPopup(popup(feature)).openPopup();
                });
                layer.on('mouseout', function () {
                    this.closePopup();
                });
            },
            filter: function (feature, layer) {
                return feature.properties.faccao === "Milicia";
            },
            style: { color: "#1665f0", "weight": 3, "opacity": 0.7 }
        });

        this.map.addLayer(this.allShapes)

    }

    removeAllLayer = () => {
        this.map.removeLayer(this.allShapes)
        this.map.removeLayer(this.comandoVermelho)
        this.map.removeLayer(this.terceiroComando)
        this.map.removeLayer(this.ADA)
        this.map.removeLayer(this.milicias)
    }

    click = (filter) => {

        switch (filter) {
            case "All":
                this.removeAllLayer()
                this.map.addLayer(this.allShapes)
                break;
            case "Comando Vermelho":
                this.removeAllLayer()
                this.map.addLayer(this.comandoVermelho)
                break;
            case "Terceiro Comando":
                this.removeAllLayer()
                this.map.addLayer(this.terceiroComando)
                break;
            case "Amigos dos Amigos":
                this.removeAllLayer()
                this.map.addLayer(this.ADA)
                break;
            case "Milícias":
                this.removeAllLayer()
                this.map.addLayer(this.milicias)
                break;
        }
    }



    render() {

        if (typeof window !== 'undefined') {
            return (
                <>
                    <Title title="Favelas do Rio" subtitle="por Facção Criminosa" />
                    <h4 style={{margin: "10px", fontFamily: "Catamaran", textAlign: "center"}}>Este site parte do desejo de ver o Estado do Rio de Janeiro retomando o controle territorial de sua geografia e libertando brasileiros do julgo das facções criminosas, das milícias e da violência</h4>
                    <h5 style={{marginBottom: "10px", marginTop:"20px", color:"gray", fontFamily: "Catamaran"}}>*Contribua com informações nos comentários logo abaixo. Há muitos dados desatualizados e faltando. Compartilhe o que sabe sobre sua região</h5>
                    <div style={{ display: "flex", paddingBottom: "10px" }}>
                        <button style={{ padding: "10px", color: "white", backgroundColor: "black", fontWeight: "bold" }} onClick={() => this.click("All")}>Todas</button>
                        <button style={{ backgroundColor: "#d11c08", fontWeight: "bold" }} onClick={() => this.click("Comando Vermelho")}>Comando Vermelho</button>
                        <button style={{ backgroundColor: "#a6f514", fontWeight: "bold" }} onClick={() => this.click("Terceiro Comando")}>Terceiro Comando</button>
                        <button style={{ backgroundColor: "#f0cc16", fontWeight: "bold" }} onClick={() => this.click("Amigos dos Amigos")}>Amigos dos Amigos</button>
                        <button style={{ backgroundColor: "#1665f0", fontWeight: "bold" }} onClick={() => this.click("Milícias")}>Milícias</button>
                    </div>
                    <div style={{
                        display: "flex", justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Wrapper width="1280px" height="720px" id="map" />
                    </div>
                    <div style={{paddingTop: "20px"}}>
                        <DiscussionEmbed {...disqusConfig} />
                    </div>
                </>
                    )
                }
                return null
            }
        }
        
export default Map