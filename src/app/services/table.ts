export interface TableData {
    header: string[],
    body: Row[]
}

export interface Row {
    data: any,
    cells: any[]
}