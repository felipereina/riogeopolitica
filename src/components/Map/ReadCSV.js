import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

export const useCSV = () => {
    const data = useStaticQuery(
        graphql`
                query{
                    allFavelasCsv{
                    edges{
                        node{
                        C_digo
                        Name
                        Faccao
                        Complexo
                        Pouco_Expressivo
                        }
                    }
                    }
                }
                `)
    return data.allFavelasCsv.edges

}