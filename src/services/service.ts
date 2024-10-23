export type Section = {
    category: string
}

export type Sections = Section[];

export const getProducts = async (): Promise<Sections> => {
    return await fetch('http://localhost:3001/sections')
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
}