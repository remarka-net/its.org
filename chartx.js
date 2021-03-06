/* global AbstractPrimaryView, _ */

var XChartView = AbstractPrimaryView.extend({
    id: 'linechart2',
    tagName: 'canvas',
    className: 'viewport linechart',
    render: function () {
        var datasets = {};

        _.each(this.model.getCurrentNodes(), function (node, idx) {
            _.each(node.data, function(datum){
                if(!_.has(datasets, datum.tclass)) {
                    datasets[datum.tclass] = {
                        label: datum.tclass,
                        data: [],
                        borderColor: 'blue', //random
                        borderWidth: 6,
                        fill: true
                    };
                }
                
                if(!datum.isNumeric()) {
                    datasets[datum.tclass].data.push(null);
                } else {
                    datasets[datum.tclass].data.push(datum.getValue());
                }
            });
        });


        var myChart = new Chart(this.el, {
            type: 'bar',
            data: {
                labels: _.pluck(this.model.getCurrentNodes(), 'name'),
                datasets: _.toArray(datasets)
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display:false ,
                    position: 'right',
                    fullWidth: false,
                    fontColor:"blue", 
                    labels: {
                        fontSize:5,
                        boxWidth:10 
                    },
                },
                title:{
                    display: true,
                    text: 'Водосховища-2',
                    fontSize: 40
                },
                layout: {
                    margin: {
                    right:10
                    },
            padding: {
                left: 10,
                right: 200,
                top: 10,
                bottom: 20
                }
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }]
                }
            }
        });

        this.resizeContent();
        myChart.update();

        this.hideLoader();
        function f(x) {
            return Math.pow(x, 2);
        }
    }
}); 

$(".linechart").css("overflow","scroll");
