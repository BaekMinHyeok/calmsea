interface DateSortTable {
    date: string
}

export const sortFunction: {
    [key: string]: (a: DateSortTable, b: DateSortTable) => number
} = {
    latest: (a: DateSortTable, b: DateSortTable) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),

    oldest: (a: DateSortTable, b: DateSortTable) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
}
