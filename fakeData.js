const SalesApplicationRow = [
    {
        id: 0,
        Date: '20/08/21',
        Name: 'Tom Williams',
        Emailaddress: 'xx@gmail.com',
        Qualifications: 'file/example/path.svg',
        SpecialtyArea: 'digital sale',
        Certificate: 'file/example/path.svg',
        Status: 'NEW'
    },
    {
        id: 1,
        Date: '20/08/21',
        Name: 'Jerry Williams',
        Emailaddress: 'xx@gmail.com',
        Qualifications: 'file/example/path.svg',
        SpecialtyArea: 'digital sale',
        Certificate: 'file/example/path.svg',
        Status: 'Declined'
    },
    {
        id: 2,
        Date: '20/08/21',
        Name: 'Tom_remove',
        Emailaddress: 'xx@gmail.com',
        Qualifications: 'file/example/path.svg',
        SpecialtyArea: 'digital sale',
        Certificate: 'file/example/path.svg',
        Status: 'Pending'
    },
    {
        id: 3,
        Date: '20/08/21',
        Name: 'Tom_remove',
        Emailaddress: 'xx@gmail.com',
        Qualifications: 'file/example/path.svg',
        SpecialtyArea: 'digital sale',
        Certificate: 'file/example/path.svg',
        Status: 'PASS'
    },
    {
        id: 4,
        Date: '20/08/21',
        Name: 'Tom_remove',
        Emailaddress: 'xx@gmail.com',
        Qualifications: 'file/example/path.svg',
        SpecialtyArea: 'digital sale',
        Certificate: 'file/example/path.svg',
        Status: 'PASS'
    }
];

const Products = [
    {   id:0,
        products: '/img/Dashboard/product_test.svg',
        sku: 'sku',
        FeatureProducts: 'Feature Products',
        ProductName: 'cat',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Category: 'Onboard',
        Price: 470,
        Color: ['/img/Dashboard/blue.svg', '/img/Dashboard/black.svg', '/img/Dashboard/orange.svg'],
        Sold: 120
    },
    {   id:1,
        products: '/img/Dashboard/product_test.svg',
        sku: 'sku',
        FeatureProducts: 'Feature Products',
        ProductName: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Category: 'Onboard',
        Price: 470,
        Color: ['/img/Dashboard/blue.svg', '/img/Dashboard/black.svg', '/img/Dashboard/orange.svg'],
        Sold: 120
    },
    {   id:2,
        products: '/img/Dashboard/product_test.svg',
        sku: 'sku',
        FeatureProducts: 'Feature Products',
        ProductName: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Category: 'Onboard',
        Price: 470,
        Color: ['/img/Dashboard/blue.svg', '/img/Dashboard/black.svg', '/img/Dashboard/orange.svg'],
        Sold: 120
    },
    {   id:3,
        products: '/img/Dashboard/product_test.svg',
        sku: 'sku',
        FeatureProducts: 'Feature Products',
        ProductName: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Category: 'Onboard',
        Price: 470,
        Color: ['/img/Dashboard/blue.svg', '/img/Dashboard/black.svg', '/img/Dashboard/orange.svg'],
        Sold: 120
    },
    {   id:4,
        products: '/img/Dashboard/product_test.svg',
        sku: 'sku',
        FeatureProducts: 'Feature Products',
        ProductName: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Category: 'Onboard',
        Price: 470,
        Color: ['/img/Dashboard/blue.svg', '/img/Dashboard/black.svg', '/img/Dashboard/orange.svg'],
        Sold: 120
    },
    {   id:5,
        products: '/img/Dashboard/product_test.svg',
        sku: 'sku',
        FeatureProducts: 'Feature Products',
        ProductName: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Category: 'Onboard',
        Price: 470,
        Color: ['/img/Dashboard/blue.svg', '/img/Dashboard/black.svg', '/img/Dashboard/orange.svg'],
        Sold: 120
    }
];

const SalesData_2 = [
    {
        StaffProfile: { item: '/img/Dashboard/staff_test.svg', type: 'img' },
        Staff_NEW: { item: 'Staff_NEW', type: 'string' },
        MostsaleProduct: {
            item: '5500 Onboard Diagnostic',
            des: 'Onboard Diagnostic Voltmeter Onboard',
            type: 'group_string'
        },
        Ranking: { item: 1, type: 'ranking' },
        YearlyCommisiion: { item: 125750, type: 'price' },
        MonthlyCommisiion: { item: 25750, type: 'price' },
        Customer: { item: 'Tom, Jim ,jenny', type: 'string' },
        Products_sale: { item: 120, type: 'item' },
        TotalsolditemMonthly: { item: 20, type: 'item' },
        Products_New: { item: 12, type: 'item' },
        Category: { item: 'business', type: 'string' }
    },

    {
        StaffProfile: { item: '/img/Dashboard/staff_test.svg', type: 'img' },
        Staff_NEW: { item: 'Staff_NEW', type: 'string' },
        MostsaleProduct: {
            item: '5500 Onboard Diagnostic',
            des: 'Onboard Diagnostic Voltmeter Onboard',
            type: 'group_string'
        },
        Ranking: { item: 2, type: 'ranking' },
        YearlyCommisiion: { item: 125750, type: 'price' },
        MonthlyCommisiion: { item: 25750, type: 'price' },
        Customer: { item: 'Tom, Jim ,jenny', type: 'string' },
        Products_sale: { item: 120, type: 'item' },
        TotalsolditemMonthly: { item: 20, type: 'item' },
        Products_New: { item: 12, type: 'item' },
        Category: { item: 'important', type: 'string' }
    },

    {
        StaffProfile: { item: '/img/Dashboard/staff_test.svg', type: 'img' },
        Staff_NEW: { item: 'Staff_NEW', type: 'string' },
        MostsaleProduct: {
            item: '5500 Onboard Diagnostic',
            des: 'Onboard Diagnostic Voltmeter Onboard',
            type: 'group_string'
        },
        Ranking: { item: 3, type: 'ranking' },
        YearlyCommisiion: { item: 125750, type: 'price' },
        MonthlyCommisiion: { item: 25750, type: 'price' },
        Customer: { item: 'Tom, Jim ,jenny', type: 'string' },
        Products_sale: { item: 120, type: 'item' },
        TotalsolditemMonthly: { item: 20, type: 'item' },
        Products_New: { item: 12, type: 'item' },
        Category: { item: 'consumer', type: 'string' }
    }
];

const SalesData = [
    {
        StaffProfile: '/img/Dashboard/staff_test.svg',
        Staff_NEW: 'Staff_NEW',
        MostsaleProduct: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Ranking: 1,
        YearlyCommisiion: 125750,
        MonthlyCommisiion: 25750,
        Customer: 'Tom, Jim ,jenny',
        Products_sale: 120,
        TotalsolditemMonthly: 20,
        Products_New: 12,
        Category: 'business'
    },
    {
        StaffProfile: '/img/Dashboard/staff_test.svg',
        Staff_NEW: 'Staff_NEW',
        MostsaleProduct: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Ranking: 2,
        YearlyCommisiion: 125750,
        MonthlyCommisiion: 25750,
        Customer: 'Tom, Jim ,jenny',
        Products_sale: 120,
        TotalsolditemMonthly: 20,
        Products_New: 12,
        Category: 'business'
    },
    {
        StaffProfile: '/img/Dashboard/staff_test.svg',
        Staff_NEW: 'Staff_NEW',
        MostsaleProduct: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Ranking: 3,
        YearlyCommisiion: 125750,
        MonthlyCommisiion: 25750,
        Customer: 'Tom, Jim ,jenny',
        Products_sale: 120,
        TotalsolditemMonthly: 20,
        Products_New: 12,
        Category: 'consumer'
    },
    {
        StaffProfile: '/img/Dashboard/staff_test.svg',
        Staff_NEW: 'Staff_NEW',
        MostsaleProduct: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Ranking: 4,
        YearlyCommisiion: 125750,
        MonthlyCommisiion: 25750,
        Customer: 'Tom, Jim ,jenny',
        Products_sale: 120,
        TotalsolditemMonthly: 20,
        Products_New: 12,
        Category: 'consumer'
    },
    {
        StaffProfile: '/img/Dashboard/staff_test.svg',
        Staff_NEW: 'Staff_NEW',
        MostsaleProduct: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Ranking: 5,
        YearlyCommisiion: 125750,
        MonthlyCommisiion: 25750,
        Customer: 'Tom, Jim ,jenny',
        Products_sale: 120,
        TotalsolditemMonthly: 20,
        Products_New: 12,
        Category: 'important'
    },
    {
        StaffProfile: '/img/Dashboard/staff_test.svg',
        Staff_NEW: 'Staff_NEW',
        MostsaleProduct: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Ranking: 6,
        YearlyCommisiion: 125750,
        MonthlyCommisiion: 25750,
        Customer: 'Tom, Jim ,jenny',
        Products_sale: 120,
        TotalsolditemMonthly: 20,
        Products_New: 12,
        Category: 'important'
    },

    {
        StaffProfile: '/img/Dashboard/staff_test.svg',
        Staff_NEW: 'Staff_NEW',
        MostsaleProduct: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Ranking: 7,
        YearlyCommisiion: 125750,
        MonthlyCommisiion: 25750,
        Customer: 'Tom, Jim ,jenny',
        Products_sale: 120,
        TotalsolditemMonthly: 20,
        Products_New: 12,
        Category: 'important'
    },
    {
        StaffProfile: '/img/Dashboard/staff_test.svg',
        Staff_NEW: 'Staff_NEW',
        MostsaleProduct: '5500 Onboard Diagnostic',
        des: 'Onboard Diagnostic Voltmeter Onboard',
        Ranking: 8,
        YearlyCommisiion: 125750,
        MonthlyCommisiion: 25750,
        Customer: 'Tom, Jim ,jenny',
        Products_sale: 120,
        TotalsolditemMonthly: 20,
        Products_New: 12
    }
];

const staffData = [
    {
        ava: '/img/Dashboard/staff_test.svg',
        Name: 'Tom Williams',
        Position: 'Client Manager'
    },
    {
        ava: '/img/Dashboard/staff_test.svg',
        Name: 'Tom Williams',
        Position: 'Client Manager'
    },
    {
        ava: '/img/Dashboard/staff_test.svg',
        Name: 'Tom Williams',
        Position: 'Client Manager'
    },
    {
        ava: '/img/Dashboard/staff_test.svg',
        Name: 'Tom Williams',
        Position: 'Client Manager'
    },
    {
        ava: '/img/Dashboard/staff_test.svg',
        Name: 'Tom Williams',
        Position: 'Client Manager'
    },
    {
        ava: '/img/Dashboard/staff_test.svg',
        Name: 'Tom Williams',
        Position: 'Client Manager'
    },
    {
        ava: '/img/Dashboard/staff_test.svg',
        Name: 'Tom Williams',
        Position: 'Client Manager'
    }
];

const staffDetail = [
    {
        id: 0,
        ava: '/img/Dashboard/staff_test.svg',
        Name: 'Tom Williams',
        Position: 'Client Manager',
        email: 'xxxxxx@gmail.com',
        phone: '0480 393 283',
        address: '6 Avence st, Chatswood, Nsw',
        data: [
            { id: 'Sales_today', name: 'Sales today ', value: '$9075.00' },
            { id: 'Monthly_Sales', name: 'Monthly Sales', value: '$29085.00' },
            { id: 'Yearly_Sales', name: 'Yearly Sales', value: '$114305.00' }
        ]
    },
    {
        id: 1,
        ava: '/img/Dashboard/staff_test.svg',
        Name: 'Jerry Williams',
        Position: 'Client Manager',
        email: 'Jerry@gmail.com',
        phone: '0480 393 283',
        address: '7 Avence st, Chatswood, Nsw',
        data: [
            { id: 'Sales_today', name: 'Sales today ', value: '$9075.00' },
            { id: 'Monthly_Sales', name: 'Monthly Sales', value: '$29085.00' },
            { id: 'Yearly_Sales', name: 'Yearly Sales', value: '$114305.00' }
        ]
    }
];

const salesApplicationDetail = [
    {
        id: 0,
        ava: '/img/Dashboard/staff_test.svg',
        name: 'Tom Williams',
        position: 'Client Manager',
        email: 'xxxxxx@gmail.com',
        phone: '0480 393 283',
        address: '6 Avence st, Chatswood, Nsw'
    },
    {
        id: 1,
        ava: '/img/Dashboard/staff_test.svg',
        name: 'Jerry Williams',
        position: 'Client Manager',
        email: 'Jerry@gmail.com',
        phone: '0480 393 283',
        address: '7 Avence st, Chatswood, Nsw'
    }
];

const salesApplicationDataList = [
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 1,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Jerry Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/21', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    },
    {
        id: 0,
        Date: { item: '20/08/27', type: 'string' },
        Name: { item: 'Tom Williams', type: 'string' },
        Emailaddress: { item: 'xx@gmail.com', type: 'string' },
        Qualifications: { item: 'file/example/path.svg', type: 'string' },
        SpecialtyArea: { item: 'digital sale', type: 'string' },
        Certificate: { item: 'file/example/path.svg', type: 'string' },
        Status: { item: 'NEW', type: 'string' }
    }
];

const deliveryProductOrientatedData = [
    {
        index: '1',
        scope: 'p1,p2,c1,c2',
        vw: {
            volume: '1.90',
            weight: '45'
        },
        rate: '3.50'
    },
    {
        index: '2',
        scope: 'p11,p21,c11,c21',
        vw: {
            volume: '1.90',
            weight: '45'
        },
        rate: '4.50'
    },
    {
        index: '3',
        scope: 'p111,p211,c111,c211',
        vw: {
            volume: '2.20',
            weight: '50'
        },
        rate: '9.50'
    }
];

const treeData = [
    { name: 'c1', children: [{ name: 'p1' }, { name: 'p2' }] },
    { name: 'c2', children: [{ name: 'p1' }, { name: 'p2' }] },
    { name: 'c11', children: [{ name: 'p11' }, { name: 'p2' }] },
    { name: 'c21', children: [{ name: 'p21' }, { name: 'p2' }] },
    { name: 'c111', children: [{ name: 'p211' }, { name: 'p2' }] }
];
const coupon = [
    {
        editable: false,
        index: { item: '1', type: 'string' },
        code: { item: 'SALEOF100OFF', type: 'rate' },
        scope: { item: 'p1,p2,c1,c2', type: 'rate' },
        custom: { item: '111, 222, 221, 2222', type: 'rate' },
        period: { item: '2021-05-21,2021-09-30', type: 'Daterange' },
        percentage: { item: '0.00', type: 'rate' }
    },
    {
        editable: false,
        index: { item: '2', type: 'string' },
        code: { item: 'SALEOF100OFF', type: 'rate' },
        scope: { item: 'p1,p2,c1,c2', type: 'rate' },
        custom: { item: '111, 222, 221, 2222', type: 'rate' },
        period: { item: '2021-05-21,2021-09-30', type: 'Daterange' },
        percentage: { item: '0.00', type: 'rate' }
    }
];
const customer = [
    {
        index: '1',
        scope: '111,211,121,241',
        rate: '0.00'
    },
    {
        index: '2',
        scope: '20,200,221,321',
        rate: '1.50'
    }
];
const distance = [
    {
        index: { item: '1', type: 'string' },
        distance: { item: '15', type: 'slider_single' },
        rate: { item: '3.00', type: 'rate' },
        editable: false
    },
    {
        index: { item: '2', type: 'string' },
        distance: { item: '15', type: 'slider_single' },
        rate: { item: '3.00', type: 'rate' },
        editable: false
    },
    {
        index: { item: '3', type: 'string' },
        distance: { item: '15', type: 'slider_single' },
        rate: { item: '5.00', type: 'rate' },
        editable: false
    }
];

const customerList = [
    { id: 1, name: 111, email:"test", Category: 'business' },
    { id: 2, name: 211, email:"test",Category: 'business' },
    { id: 3, name: 121,email:"test", Category: 'business' },
    { id: 4, name: 241,email:"test", Category: 'business' },
    { id: 5, name: 20, email:"test",Category: 'consumer' },
    { id: 6, name: 200,email:"test", Category: 'consumer' },
    { id: 7, name: 221,email:"test", Category: 'consumer' },
    { id: 8, name: 321,email:"test", Category: 'consumer' }
];
const sellerList = [
    { id: 1, name: 111, email:"test" ,Category: 'business' },
    { id: 2, name: 211, email:"test" ,Category: 'business' },
    { id: 3, name: 121, email:"test" ,Category: 'business' },
    { id: 4, name: 241, email:"test" ,Category: 'business' },
    { id: 5, name: 20, email:"test"  ,Category: 'consumer' },
    { id: 6, name: 200, email:"test" ,Category: 'consumer' },
    { id: 7, name: 221, email:"test" ,Category: 'consumer' },
    { id: 8, name: 321, email:"test" ,Category: 'consumer' }
];

const order = [
    {
        index: '1',
        amount: '50',
        rate: '$5.00'
    },
    {
        index: '2',
        amount: '100',
        rate: '$1.00'
    },
    {
        index: '3',
        amount: '200',
        rate: '$0.00'
    }
];

const postcode = [
    {
        index: '1',
        from: '1 mcintyre st burwood vic 3125',
        to: '3125,3126,3127,3171',
        rate: '3.00'
    },
    {
        index: '2',
        from: '1 mcintyre st burwood vic 3125',
        to: '3225,3226,3227,3271',
        rate: '5.00'
    }
];

export {
    SalesApplicationRow,
    Products,
    SalesData,
    staffData,
    staffDetail,
    salesApplicationDetail,
    salesApplicationDataList,
    deliveryProductOrientatedData,
    treeData,
    coupon,
    distance,
    customerList,
    order,
    SalesData_2,
    customer,
    postcode,
    sellerList
};
