(function (document, root, $, undefined) {
    'use strict';
    var minimongo = require("minimongo");

    var LocalDb = minimongo.MemoryDb;

    // Create local db (in memory database with no backing)
    var db = new LocalDb(),
    atts = ['Spec_facet_Size_Scale', 'Spec_Drivetrain', 'facet_Vehicle Type', 'Spec_Completion_Level', 'Spec_Fuel_Type'],
    me = '';

    // Add a collection to the database
    db.addCollection("products");
    var q = JSON.stringify({
        Categories: {
            $elemMatch: {
                ID: {
                    $regex: encodeURIComponent('^SURF_(ELECTRIC|GAS|NITRO)')
                }
            }
        },
        Displayable: 1,
        Buyable: 1,
        BrandID: 'LOS'
    }),
    s = JSON.stringify({
        ProdID: 1
    }),
    f = JSON.stringify({
        _id: 0,
        ProdID: 1,
        BrandID: 1,
        BrandName: 1,
        Name: 1,
        Desc: 1,
        Price: 1,
        Categories: 1,
        Attributes: 1
    });
    $.ajax({
        url: 'http://159.203.116.76/search/' + q + '/0/' + s + '/' + f + '?callback=?',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // we need to copy our category to an attribute
            $.each(data, function (i) {
                $.each(data[i].Categories, function (k, v) {
                    if (v.ID.match('SURF_')) {
                        data[i].Attributes.push({
                            ID: 'Spec_Fuel_Type',
                            Name: v.Name
                        });
                    }
                });
            });
            // insert data into db as one big dump - Always use upsert for both inserts and modifies
            db.products.upsert(data, function () {
                // success
                // build selector grid
                var row = $('.filters'),
          col = $('<div />', {
              class: 'text-center'
          }),
          ul = $('<ul />', {
              class: 'flex-filters-container'
          })
                row.html($('<h3 />', {
                    text: 'Search Available Vehicles'
                }));
                $.each(atts, function (i) {
                    var li = $('<li />', {
                        class: 'flex-filters-container-item'
                    }),
            sel = $('<select />', {
                class: atts[i]
            }).on('change', function (e) {
                e.preventDefault();
                me = '.' + atts[i];
                _buildQuery();
            });

                    sel.append($('<option />', {
                        text: 'All',
                        value: 'All',
                        selected: true
                    }));

                    li.append(
              $('<h6 />', {
                  html: atts[i].replace('Spec_', '').replace('facet_', '').replace('_', '&nbsp;')
              })
            )
            .append(sel)
            .appendTo(ul)

                });
                ul.appendTo(col);
                col.appendTo(row);
                // end selector grid
                _executeQuery([{}]);
            });
        }
    });

    $(document).on('click', '.filter-reset', function (e) {
        e.preventDefault();
        me = '';
        $('.filters select').each(function () {
            $(this).val('All').find('option').first().attr('selected', true);
        });
        _executeQuery([{}]);
    });

    var _buildGrid = function (items) {
        $('#grid').empty();
        $.each(items, function (k, v) {
            $('#grid').append(
          $('<li />', {
              class: 'flex-item'
          })
          .append($('<a />', {
              href: '/Products/Default.aspx?ProdID=' + v.ProdID
          })
            .append($('<img />', {
                src: 'http://s7d5.scene7.com/is/image/horizonhobby/' + v.ProdID + '_a0?hei=100'
            })
              .on('error', function () {
                  this.error = null;
                  $(this).attr('src', 'http://s7d5.scene7.com/is/image/horizonhobby/no_image?hei=100');
              })
            )
            .append($('<p />', {
                html: v.Name + '<br />$' + v.Price
            }))
          )
        );
        });
    },

    _updateFilters = function (data) {
        var o = _scrubData(data);
        $('.filters select').not(me).each(function () {
            var el = $(this),
          className = el.attr('class'),
          val = el.val();
            el.html($('<option />', {
                text: 'All',
                value: 'All',
                selected: (val === 'All')
            }));
            $.each(o[className], function () {
                var option = $('<option />', {
                    text: this,
                    value: this,
                    selected: (val === this)
                })
                el.append(option);
            });
        });
    },

    _scrubData = function (data) {
        var o = {};
        $.each(atts, function (i) {
            o[atts[i]] = [];
        });
        // get our data organized
        $.each(data, function (i) {
            $.each(data[i].Attributes, function () {
                if (atts.indexOf(this.ID) > -1) {
                    if (typeof this.Name === 'object') {
                        var self = this;
                        $.each(self.Name, function () {
                            if (o[self.ID].indexOf(this) < 0) {
                                o[self.ID].push(this);
                            }
                        })
                    } else {
                        if (o[this.ID].indexOf(this.Name) < 0) {
                            o[this.ID].push(this.Name);
                        }
                    }
                }
            })
        });
        // unique and sorted
        $.each(atts, function (i) {
            if (o[atts[i]][0] && o[atts[i]][0].indexOf('/') > 0) {
                o[atts[i]] = _.uniq(o[atts[i]].sort(function (a, b) {
                    return parseInt(a.split('/')[1]) > parseInt(b.split('/')[1]);
                }));
            } else {
                o[atts[i]] = _.uniq(o[atts[i]].sort());
            }
        });
        return o;
    },

    _buildQuery = function () {
        var q = [];
        $('.filters select').each(function () {
            var el = $(this);
            if (el.val() !== 'All') {
                q.push({
                    Attributes: {
                        $elemMatch: {
                            ID: el.attr('class'),
                            Name: el.val()
                        }
                    }
                });
            }
        });
        if (q.length === 0) {
            q.push({});
        }
        _executeQuery(q);
    },

    _executeQuery = function (q) {
        db.products.find({
            $and: q
        }, {
            limit: 0,
            sort: {
                ProdID: 1
            },
            fields: {
                ProdID: 1,
                BrandName: 1,
                Name: 1,
                Price: 1,
                Attributes: 1,
                Categories: 1,
                _id: -1
            }
        }).fetch(function (data) {

            _buildGrid(data);
            if (data.length > 0) {
                _updateFilters(data);
            }
        });
    }
} (document, window, window.jQuery))