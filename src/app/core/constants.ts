 

export const api = {  
    getTrucks: '/workshopservice/api/rest/trucks?lang=en',
    getWorkordernumber: '/workshopservice/api/rest/generateworkshopordernumber?lang=en',
    createorder: '/workshopservice/api/rest/createworkshoporder?lang=en',
    updateorder: '/workshopservice/api/rest/updateworkshoporder?lang=en',
    getworkshoporderlists: '/workshopservice/api/rest/getworkshoporderlist?lang=en',
    getworkshoporderdetails: '/workshopservice/api/rest/getworkshoporderdetails/',
    deleteworkshoporder: '/workshopservice/api/rest/deleteworkshoporder/',
    roles:'/workshopservice/api/rest/roles/',
    userservice:'/workshopservice/api/rest/user/',
    getReportlist: '/workshopservice/api/rest/servicereports',
    userdetails: 'https://dev.still-nexxt.com/usst/api/rest/users/_me',
	getReportlistDetail: '/workshopservice/api/rest/getservicereportsdetails',
    createDamageCategory: '/workshopservice/api/rest/createdamagecategory?lang=en', 
    getTechnician: '/workshopservice/api/rest/gettechnicians/',
    addTechnician: '/workshopservice/api/rest/addtechnician',
    deleteTechnician: '/workshopservice/api/rest/deletetechnician/', 
    getDamageCategory: '/workshopservice/api/rest/getdamagecategory',
    getUsstTechnician: '/workshopservice/api/rest/getussttechnicians',
    updateDamageCategory: '/workshopservice/api/rest/updatedamagecategory',
    adapteWorkshopOrders: '/workshopservice/api/rest/getadaptedworkshoporders/',
    deleteDamageCategory:'/workshopservice/api/rest/deletedamagecategory/',
    getslots: '/workshopservice/api/rest/getslots/',
    createslot: '/workshopservice/api/rest/createslot/',
    updateslot: '/workshopservice/api/rest/updateslot/',
    deleteslot: '/workshopservice/api/rest/deleteslot/',

};
 
export const path = {
    truckpath: '/assets/img/',
}