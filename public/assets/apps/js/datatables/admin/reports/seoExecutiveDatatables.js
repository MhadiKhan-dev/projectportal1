var DatatablesSearchOptionsAdvancedSearch = function() {
    $.fn.dataTable.Api.register("column().title()", function() {
        return $(this.header()).text().trim()
    });
    return {
        init: function() {
            var a;
            var lnk = $("#seo-executive-table").data('link');
            //console.log($("#dt-table thead tr th"));
            //$('#seo-executive-table').DataTable().clear().destroy();
            $("#m_generate").on("click", function(e) {
               e.preventDefault();
               var statuses = $('select[name=status]').val();
               var only_delivered = 0;
               var col = [];
               col.push(
                    {data: 'user', title:'SEO Executive', orderable: false, name: 'user'}
                );
               //console.log($("input[name=only_delivered]:checked").val());
               if($("input[name=only_delivered]:checked").val() == 1){
                    only_delivered = 1;
                    col.push({data: 'delivered_count', title: 'Published', orderable: false, name: 'delivered_count', 'className': 'text-center'})
               }else{
                    $.each(statuses, function(t, e) {
                        //console.log(e);
                        //clean_e = e.replace(/ /g,"_");
                        col.push({ 
                            "data"          : e.replace(/ /g,"_")+'_count',
                            "title"         : e,
                            "name"          : e.replace(/ /g,"_")+'_count',
                            "orderable"     : false,
                            "className"     : 'text-center'
                        });
                    });
               }
               
               col.push({data: 'total_links', title:'Total', orderable: false, name: 'total_links', className: 'text-center'});

                if ( $.fn.DataTable.isDataTable('#seo-executive-table') ) {
                  $('#seo-executive-table').DataTable().clear().destroy();
                }

                $('#seo-executive-table thead').empty();
                $('#seo-executive-table tbody').empty();
                console.log($('input[name=date_range]').val());
               a = $("#seo-executive-table").DataTable({
                    responsive: !0,
                    dom: "<'row'<'col-sm-12 text-right'B>>\n\t\t\t<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
                    lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                    pageLength: 50,
                    language: {
                        lengthMenu: "Display _MENU_"
                    },
                    buttons: ["print", "copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
                    saveState: {
                        cookie: !1,
                        webstorage: !0
                    },
                    searchDelay: 500,
                    processing: !0,
                    serverSide: !0,
                    ajax: {
                        url: lnk,
                        type: "GET",
                        data: function(d) {
                                d.date = $('input[name=date_range]').val();
                                d.statuses = $('select[name=status]').val();
                                d.users = $('select[name=user]').val();
                                d.only_delivered = only_delivered;
                            }
                    },
                    // drawCallback: function(a) {
                    //     var e = this.api(),
                    //         t = e.rows({
                    //             page: "current"
                    //         }).nodes(),
                    //         n = null;
                    //     e.column(3, {
                    //         page: "current"
                    //     }).data().each(function(a, e) {
                    //         n !== a && ($(t).eq(e).before('<tr class="group"><td colspan="12"> ORDER ID : ' + a + "</td></tr>"), n = a)
                    //     })
                    // },
                    // fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    //     return nRow;
                    // },
                    columns: col,
                }), $("#m_search").on("click", function(t) {
                    t.preventDefault();
                    // var e = {};
                    // $(".m-input").each(function() {
                    //     var a = $(this).data("col-index");
                    //     e[a] ? e[a] += "|" + $(this).val() : e[a] = $(this).val()
                    // }), $.each(e, function(t, e) {
                    //     //console.log(e);
                    //     a.column(t).search(e || "", !1, !1)
                    // }), 
                    a.table().draw()
                }), $("#m_reset").on("click", function(t) {
                    t.preventDefault(), $(".m-input").each(function() {
                        $(this).val(""), a.column($(this).data("col-index")).search("", !1, !1)
                    }), a.table().draw()
                })
            });  
            
        }
    }
}();
jQuery(document).ready(function() {
    DatatablesSearchOptionsAdvancedSearch.init()
});