export type Section = {
    category: string,
    catalog: Product[]
}

export type Sections = Section[];

export type Product = {
    urls: string[]
}

export const getProducts = async (): Promise<Sections> => {
    return await fetch('http://localhost:3001/sections')
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}