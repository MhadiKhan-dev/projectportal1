$("#m_datatable_agency_balance").mDatatable({
    data: {
        type: "remote",
        source: {
            read: {
                url: $('#m_datatable_agency_balance').data('link'),
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
        field: "balance",
        title: "Balance",
        sortable: !1,
        width: 150
    }, {
        field: "type",
        title: "Balance Type",
        sortable: !1,
        filterable: !1,
        width: 150
    }, {
        field: "created_at",
        title: "Created At"
    }]  
 });