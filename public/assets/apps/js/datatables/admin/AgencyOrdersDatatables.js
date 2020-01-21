$("#m_datatable_agency_orders").mDatatable({
    data: {
        type: "remote",
        source: {
            read: {
                url: $('#m_datatable_agency_orders').data('link'),
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            }
        },
        pageSize: 10,
        saveState: {
            cookie: !1,
            webstorage: !0
        },
        serverPaging: !0,
        serverFiltering: !0,
        serverSorting: !0
    },
    layout: {
        theme: "default",
        class: "",
        scroll: !0,
        height: 380,
        footer: !1
    },
    sortable: !0,
    filterable: !1,
    pagination: !0,
    columns: [{
        field: "id",
        title: "Order ID",
        sortable: !1,
        width: 40,
        textAlign: "center"
    }, {
        field: "name",
        title: "Order BY",
        sortable: !1,
        filterable: !1,
        width: 150,
        textAlign: "center"
    }, {
        field: "total",
        title: "Order Total",
        sortable: !1,
        filterable: !1,
        width: 40,
        textAlign: "center"
    }, {
        field: "total_links",
        title: "Total Links",
        sortable: !1,
        filterable: !1,
        width: 40,
        textAlign: "center"
    }, {
        field: "created_at",
        title: "Date Added",
        textAlign: "center"
    },
    {
        field: "action",
        title: "Action",
        textAlign: "center"
    }]  
 });