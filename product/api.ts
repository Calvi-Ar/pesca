
import axios from "axios";
import Papa from "papaparse";
import { Product } from "./types";

export default {
    list: async (): Promise<Product[]> => {
        return axios
        .get(
            `https://docs.google.com/spreadsheets/d/e/2PACX-1vShqeD_Dcf4KfgirDe_0tRvTVFo4SAT0BdYAFC6wlCWGhtG0LBzWOjLg1pd2NTzUA_p1unNvJy1YI9y/pub?output=csv`,
        {
            responseType: 'blob',
        },
        )
        .then( 
            (response) => 
            new Promise<Product[]>((resolve, reject) => {
                
                Papa.parse(response.data, {
                    header: true,
                    complete: (results) => resolve(results.data as Product[]),
                    
                    error: (error) => reject (error.message),   
                });
            }),
        );
    },
};