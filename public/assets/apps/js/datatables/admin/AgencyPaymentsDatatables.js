$("#m_datatable_agency_payments").mDatatable({
    data: {
        type: "remote",
        source: {
            read: {
                url: $('#m_datatable_agency_payments').data('link'),
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
        field: "type",
        title: "Payment Type",
        sortable: !1,
        textAlign: "center"
    }, {
        field: "payment_method",
        title: "Payment Method",
        sortable: !1,
        filterable: !1,
        textAlign: "center"
    }, {
        field: "amount",
        title: "Amount",
        sortable: !1,
        filterable: !1,
        textAlign: "center"
    }, {
        field: "created_at",
        title: "Date Added",
        textAlign: "center"
    }]  
 });