export type SortOrder = 'ASC' | 'DESC'
export type ModelSortField = 'name' | 'type' | 'price'


export interface SortBy {
field: ModelSortField
order: SortOrder
}


export interface Brand {
id: string
name?: string | null
origin?: string | null
image?: string | null
categories?: string[] | null
models?: Model[] | null
}


export interface Model {
id: string
name?: string | null
type?: string | null
image?: string | null
description?: string | null
price?: number | null
specs: Specs 
musicians?: Musician[] | null
}


export interface Specs {
bodyWood?: string | null
neckWood?: string | null
fingerboardWood?: string | null
pickups?: string | null
tuners?: string | null
scaleLength?: string | null
bridge?: string | null
}


export interface Musician {
name?: string | null
musicianImage?: string | null
bands?: string[] | null
}