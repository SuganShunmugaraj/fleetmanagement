export interface Iworkorder {
    truckName: String,
    author: String,
    reporter: String,
    creationDate: String,
    workshopOrderNumber: Number,
    workshopOrderDescription: String,
    outOfOrder: Boolean
}

export interface IworkorderList { 
        openWorkshopOrder: Boolean,
        serialNumber: String,
        shipToPartyNo: String,
        truckName: String 
};

