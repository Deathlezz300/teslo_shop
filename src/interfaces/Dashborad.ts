export interface DashboardSummary {
    numberOfOrders:          number;
    numberOfClients:         number;
    numberOfProducts:        number;
    producstWithNoInventory: number;
    lowInventory:            number;
    notPaidOrders:           number;
    paidOrders:              number;
}