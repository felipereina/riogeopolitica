import React, { Component } from "react"
import Layout from "../components/myLayout"
import SEO from "../components/SEO"

export default class sobre extends Component {
    render() {
        return (
            <Layout>
                <SEO title="About" />
                <div
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "3rem",
                    }}
                >
                    <h1 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}>Sobre o Site</h1>
                    <p style={{ marginBottom: "15px", marginRight: "200px", marginLeft: "200px" }}>Rio Geopolitica pretende ser uma fonte de informação para analistas de segurança pública, geopolitólogos e para a população em geral,
                        um espaço aberto onde os cidadãos do Rio de Janeiro possam colaborar com o compartilhamento de informações atualizadas e cobrar
              as instâncias públicas até que todo morador do Rio de Janeiro tenha o direito de viver em um espaço livre da violência.</p>

                    <p style={{ marginBottom: "15px", marginRight: "200px", marginLeft: "200px" }}>A Geopolítica é uma disciplina de estudo normalmente preocupada com as relações internacionais, embora muitas de suas ferramentas
            de análise possam ser aplicadas à análise intra-Estadual, o que convencionou-se chamar micro-geopolítica.</p>

                    <p style={{ marginBottom: "15px", marginRight: "200px", marginLeft: "200px" }}> A Geopolítica é o estudo diacrónico da política a partir de um ponto de vista geográfico nas suas relações com os ambientes físico e social,
                        estudo esse orientado para as relações internacionais embora não omitindo questões relevantes da política interna, (as que sofrem variações importantes
                        devido à distribuição territorial) dedicando especial atenção ao que se relaciona com a geração, a aquisição e o emprego do Poder, tentando definir constantes,
            tendências, limites e condicionamentos (Raúl François Martins, Geopolítica e Geoestratégia: Para que São e Para que Servem. Nação e Defesa, 78, p.36.)</p>

                    <p style={{ marginBottom: "15px", marginRight: "200px", marginLeft: "200px" }}>A aplicação utiliza dados oficiais da Prefeitura do Rio de Janeiro para a divisão territorial da cidade do Rio de Janeiro pelas áreas consideradas sub-urbanizadas,
            vulgo favelas. Foram retirados do site público Data Rio (https://http://www.data.rio).</p>
                </div>
            </Layout>
        )
    }
}